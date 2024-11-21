const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt=require("bcrypt")

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

// Create a Mongoose schema and model for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email
    },
    password: {
        type: String,
        required: true,
    },
});

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    tableNum: { type: String, required: true }  // Add this field to store the table number
});

const User = mongoose.model('User', userSchema);
const Customer = mongoose.model('Customer', customerSchema);

app.post('/api/customers', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ message: 'Customer details saved successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to save customer details', error });
    }
});
// POST route to handle sign-up
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user with the hashed password
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post("/login",async (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    try{
    if(user){
        const isPassMatch = await bcrypt.compare(password,user.password);
        if(!isPassMatch){ return res.json({message:"Password is incorrect!",success:false}).status(404)}
            else{
            return res.json({message:"Login Success!",success:true,user}).status(200)}
    }
    else{
        return res.json({message:"User Don't Exists!",success:false}).status(404)}

    }catch(e){
    res.json({message:e.message,success:false}).status(400)
}
})
// Start the server

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));