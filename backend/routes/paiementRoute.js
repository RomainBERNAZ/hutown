import express from 'express'
import Stripe from 'stripe'

const router = express.Router();

const stripe = new Stripe(process.env.REACT_APP_SECRET_KEY);

router.post("/pay", async (req, res) => {

  try {
    const { amount, receipt_email} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      receipt_email,
      currency: "eur" 
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
  });

  export default router;