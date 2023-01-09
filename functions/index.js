const functions = require("firebase-functions");
const express = require('express');
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51M8ke8SJbbkV9nh96VeGJaZHnYDWURZgtVrRLZE8LukKPUV10ElLmbDEHT5UNsWnnYgTpvuouKJBdGoKkxb5e43i00WEPkWNef')

//API 

//App config
const app = express();


//Middleware
app.use(cors({origin:true}));
app.use(express.json());
//API routes
app.get("/",(request, response) => response.status(200).send('hello world'))

app.post("/payments/create", async (request, response) => {
   const total = request.query.total;

   console.log('Payment Request Recieved BOOM!! for this amount',total)
   
   const paymentIntent = await stripe.paymentIntents.create({
        amount:total, //subunits of the currency
        currency:"inr",
   });

   //OK -Created
   response.status(201).send({
        clientSecret:paymentIntent.client_secret,
   });
});

//Listen command
exports.api = functions.https.onRequest(app)

//Example endpoint
//http://127.0.0.1:5001/clone-c356d/us-central1/api
//http://127.0.0.1:5001/clone-c356d/us-central1/api