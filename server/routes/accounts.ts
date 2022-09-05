import { Router } from 'express';
import { db } from '../index';

const router = Router();

// Login route.
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM accounts WHERE email = $1 AND password = $2";
    const response = await db.query(query, [email, password]);
    res.json({ authenticated: response.rowCount > 0 });
  }
  catch (err) {
    console.error(err);
    res.json({ authenticated: false });
  }
});

// Register route.
router.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email.length == 0 || password.length == 0) throw new Error();

    const query = "INSERT INTO accounts (email, password) VALUES ($1, $2)";
    await db.query(query, [email, password]);
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// Update account data.
router.put('/api/modify-account', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (password.length == 0) throw new Error();

    const query = "UPDATE accounts SET password = $1 WHERE email = $2";
    await db.query(query, [password, email]);
    res.json({ success: true });
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

export default router;
