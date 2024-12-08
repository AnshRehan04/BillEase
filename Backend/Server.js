const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Import models
const User = require('./models/User');
const Customer = require('./models/Customer');
const Order = require('./models/Order'); // Import Order model

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
// Add a GET route to fetch customer details
app.get('/api/customers', async (req, res) => {
    try {
      const customers = await Customer.find(); // Fetch all customers from the database
      res.status(200).json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ message: 'Failed to fetch customers', error });
    }
  });
  
// GET route to fetch count of users with role 'user'
app.get('/api/users/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments({ role: 'user' }); // Count users with role 'user'
        res.status(200).json({ count: userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch user count', error });
    }
});


// POST route for placing orders
app.post('/api/add-order', async (req, res) => {
  try {
    const { customerName, customerPhone, orderId, date, items, paymentId } = req.body;

    // Calculate total amount for the entire order
    const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const newOrder = new Order({
      customerName,
      customerPhone,
      orderId,
      date,
      items,
      totalAmount,
      paymentId,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error });
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
app.post('/login', async (req, res) => {
    const { email, password, accountType } = req.body;

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

        // Check account type matches
        if (user.role !== accountType) {
            return res.status(400).json({ message: "Invalid account type!", success: false });
        }

        // Return success response
        return res.status(200).json({
            message: `Login Success! Welcome ${user.role === 'admin' ? 'Admin' : 'User'}`,
            success: true,
            user,
            dashboard: user.role,
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message, success: false });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));