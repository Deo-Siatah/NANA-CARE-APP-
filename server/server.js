require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;

//starting app
const app = express();

//middleware
app.use(cors());
app.use(express.json());


//mongoose connection 
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅MongoDB connected successfully🎉🎉");
    } catch  (err) {
        console.log("❌Error connecting MongoDB",err);

    } 
} 
connectDB();



//starting the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
})
