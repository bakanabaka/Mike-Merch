const express = require('express');
const app = express();

const port = 3000;
const Razorpay = require('razorpay');
const cors = require('cors');
// module.exports = app;


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello world");
});
app.post("/payment", async (req, res) => {
    let { amount } = req.body;
    var instance = new Razorpay({ key_id: "rzp_test_vX3Y8QX16DXiF7", key_secret: "hK0d9r4Rp0hS50246uxQfqMM" });
    let order = await instance.orders.create({
        amount: amount * 100,
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
