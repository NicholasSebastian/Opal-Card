import { Router } from 'express';
import { db } from '../index';

const router = Router();

// Get all cards.
router.get('/api/cards', async (req, res) => {
  const { user } = req.query;
  try {
    const query = "SELECT * FROM cards WHERE email = $1";
    const response = await db.query(query, [user]);
    res.json(response.rows);
  }
  catch (err) {
    console.error(err);
    res.json([]);
  }
});

// Add card.
router.post('/api/link-card', async (req, res) => {
  const { cardnumber, cardname, email } = req.body;
  try {
    if (cardname.length == 0) throw new Error();

    const query = "INSERT INTO cards (cardnumber, cardname, balance, email) VALUES ($1, $2, $3, $4)";
    await db.query(query, [cardnumber, cardname, 0, email]);
    res.status(200).end();
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

export default router;
