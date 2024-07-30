import express from 'express';
import { getAuthUrl, getAccessToken } from '../services/googleAuth';

const router = express.Router();

router.get('/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

router.get('/google/redirect', async (req, res) => {
  const code = req.query.code as string;
  try {
    const tokens = await getAccessToken(code);
    console.log(tokens);
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).send('Authentication failed');
  }
});

export default router;

