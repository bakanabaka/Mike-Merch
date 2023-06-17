
const express = require('express');
const client = require('twilio')('AC6b67b65150a1c8eaaa7f2dfdb7b416bf', '300d22d1be8485581bd68a5fc6c2d91d');
const app = express();

const port = 3000;
const Razorpay = require('razorpay');
const cors = require('cors');
// module.exports = app;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(`
    <div>
    <h2>My App</h2>
    </div>
    `);
});
app.post("/payment", async (req, res) => {
    let { amount } = req.body;
    var instance = new Razorpay({ key_id: "rzp_test_vX3Y8QX16DXiF7", key_secret: "hK0d9r4Rp0hS50246uxQfqMM" });
    let order = await instance.orders.create({
        amount: amount,
        currency: "INR",
        receipt: "receipt#1",
    });
    res.status(201).json({
        success: true,
        order,
        amount,
    });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

function sendTextMessage() {
    client.messages
        .create({
            body: 'Hello from twilio-node',
            to: '+12345678901', // Text your number
            from: '+12345678901', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}