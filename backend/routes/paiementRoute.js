import express from 'express'

const router = express.Router();

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
router.post("/pay", async (req, res) => {

    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const stripe = require("stripe")("pk_test_51IIXlWLt56Zxnj4x0gcDCnYTt9sHp9tuknedxFbfvoFJMEShJwAlOq7qqvgaaADwASuIwr1d6NQkSCzVatpoLpfb005n72l4vA");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });

  export default router;