const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace the URI below with your MongoDB connection string
        const mongoURI = 'mongodb+srv://anshrehan7:anshrehan123%40@cluster0.nbqrvn4.mongodb.net/BillEase'; // Local MongoDB instance
        // const mongoURI = 'mongodb+srv://username:password@cluster0.mongodb.net/your-database-name'; // For MongoDB Atlas

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
