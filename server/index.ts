import express from 'express';
import cors from 'cors';
import { Client } from 'pg';
import accounts from './routes/accounts';
import cards from './routes/cards';
import trips from './routes/trips';

// Create a database client object with the credentials.
const db = new Client({
  user: "uqjuvgsfwzolla",
  password: "d0af2ee08b80c516f1a9499f8b485aacf7d15b31dfbc2fe91bc4b50696f5dcfd",
  host: "ec2-99-81-16-126.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "ddds5c3o6shtq6",
  ssl: { rejectUnauthorized: false }
});

// Connect to the database.
db.connect();

// Create a server.
const app = express();

// Just trust me bro. Use this.
app.use(cors());
app.use(express.json());

// Paths.
app.use(accounts);
app.use(cards);
app.use(trips);

// Start the server.
app.listen(8000);

// So the database client is accessible from other files.
export { db };
