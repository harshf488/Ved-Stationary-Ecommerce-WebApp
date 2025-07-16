// src/server/razorpay-api.js
import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_7VpdGBzTReIP2W',
  key_secret: 'nHb29kHI5L1IZRiWuVHzhoFC' // From environment variables
});

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    const options = {
      amount: 50000, // Convert to paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
 
    res.json(order);
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Razorpay API server running on port ${PORT}`);
// });
