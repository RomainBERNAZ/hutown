import express from 'express'
import Stripe from 'stripe'

const router = express.Router();

const stripe = new Stripe(process.env.REACT_APP_SECRET_KEY);

router.post("/pay", async (req, res) => {

  try {
    const { amount } = req.body.amount;
    const { receipt_email} = req.body.receipt_email;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      receipt_email ,
      currency: "eur"
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    console.log('test');
    res.status(500).json({ statusCode: 500, message: err.message });
  }
  });

  export default router;