const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    role: {
        type: String,
        enum: ['user', 'admin'], // Ensure role is either 'user' or 'admin'
        required: true,
    },
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(5);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
