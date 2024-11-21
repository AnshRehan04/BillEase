const mongoose = require('mongoose');

// Create a Mongoose schema and model for the customer
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    tableNum: { type: String, required: true }, // Store the table number
});

// Create the Customer model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
