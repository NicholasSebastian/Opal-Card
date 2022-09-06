import { Router } from 'express';
import { db } from '../index';

const router = Router();

// Login route.
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM accounts WHERE email = $1 AND password = $2";
    const response = await db.query(query, [email, password]);
    if (response.rowCount > 0) {
      res.status(200).end();
    }
    else {
      res.status(401).end();
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// Register route.
router.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email.length == 0 || password.length == 0) throw new Error();

    const query = "INSERT INTO accounts (email, password) VALUES ($1, $2)";
    await db.query(query, [email, password]);
    res.status(200).end();
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// Update account data.
router.put('/api/modify-account', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (password.length == 0) throw new Error();

    const query = "UPDATE accounts SET password = $1 WHERE email = $2";
    await db.query(query, [password, email]);
    res.status(200).end();
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

export default router;
