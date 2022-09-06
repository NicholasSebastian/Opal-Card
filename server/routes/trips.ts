import { Router } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import { createInterface } from "readline";
import { db } from "../index";

const router = Router();
const lookupFile = join(__dirname, '../opal-fares.csv');

// Get all stations.
router.get('/api/stations', async (req, res) => {
  try {
    const query = "SELECT stationname FROM stations";
    const response = await db.query(query);
    res.json(response.rows.map(row => row.stationname));
  }
  catch (err) {
    console.error(err);
    res.json([]);
  }
});

// Get all trips.
router.get('/api/trips', async (req, res) => {
  try {
    const query = "SELECT * FROM trips";
    const response = await db.query(query);
    res.json(response.rows);
  }
  catch (err) {
    console.error(err);
    res.json([]);
  }
});

// Get price between the two stations.
router.get('/api/calculate-price', async (req, res) => {
  const { from, to } = req.query;

  // Add one to ignore the header and first column.
  const fromIndex = parseInt(from as string) + 1;
  const toIndex = parseInt(to as string) + 1;
  const distance = await getDistance(fromIndex, toIndex);

  for (let i = rates.length - 1; i >= 0; i--) {
    if (rates[i].minDistance <= distance) {
      return res.json({ distance, rate: rates[i].rate });
    }
  }
  res.status(500).end();
});

// Charge card balance and add to trip history.
router.post('/api/transact-trip', async (req, res) => {
  const { cardnumber, from, to, price } = req.body;
  try {
    // Insert to the trips table.
    const query1 = "INSERT INTO trips (cardnumber, fromstation, tostation, price, datetime) VALUES ($1, $2, $3, $4, now()::timestamp)";
    await db.query(query1, [cardnumber, from, to, price]);

    // Deduct card balance.
    const query2 = "UPDATE cards SET balance = balance - $1 WHERE cardnumber = $2";
    await db.query(query2, [price, cardnumber]);

    res.status(200).end();
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

export default router;

async function getDistance(from: number, to: number): Promise<number> {
  const row = await findLine(from, lookupFile);
  const cell = findInLine(to, row);
  const distance = parseFloat(cell);
  if (isNaN(distance)) {
    return await getDistance(to, from);
  }
  else {
    return distance;
  }
}

function findLine(n: number, filepath: string) {
  return new Promise<string>((resolve, reject) => {
    const input = createReadStream(filepath);
    const readline = createInterface({ input });
    let cursor = 0;

    readline.on('line', line => {
      if (n === cursor++) {
        readline.close();
        input.close();
        resolve(line);
      }
    });

    readline.on('error', reject);
  });
}

function findInLine(n: number, line: string) {
  const items = line.split(',', n + 1);
  return items[n];
}

// Opal Card Fares July 2022.
const rates = [
  { minDistance: 0, rate: 3.79 },
  { minDistance: 10, rate: 4.71 },
  { minDistance: 20, rate: 5.42 },
  { minDistance: 35, rate: 7.24 },
  { minDistance: 65, rate: 9.31 }
]
