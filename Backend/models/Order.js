const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    items: [
        {
            itemName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
