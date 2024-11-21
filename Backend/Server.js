const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables
const cors = require('cors');
const bcrypt=require("bcrypt");
const bodyParser = require('body-parser');

// Import models
const User = require('./models/User');
const Customer = require('./models/Customer');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Process ENV file
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// POST route to handle customer details
app.post('/api/customers', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ message: 'Customer details saved successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to save customer details', error });
    }
});

// POST route for sign-up
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create and save new user
        user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route for login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist!", success: false });
        }

        // Compare password with hashed password in DB
        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return res.status(400).json({ message: "Password is incorrect!", success: false });
        }

        // Check account type (role) and provide appropriate dashboard
        if (user.role === 'admin') {
            return res.status(200).json({ message: "Login Success! Welcome Admin", success: true, user, dashboard: 'admin' });
        } else if (user.role === 'user') {
            return res.status(200).json({ message: "Login Success! Welcome User", success: true, user, dashboard: 'user' });
        }

        return res.status(400).json({ message: "Invalid role", success: false });

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message, success: false });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
