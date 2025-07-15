require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://nana-care-app-deo-siatah.vercel.app/"
];

//starting app
const app = express();



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

//middleware

app.use(cors({
    origin: function (origin,callback) {
        if (!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        } else {
            callback (new Error("Not allowed by for this origin" + origin))
        }
    },
    credentials: true
}))
app.use(express.json());

app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/users", require("./routes/usersroutes"));
app.use("/api/workers", require("./routes/workersroutes"));
app.use("/api/reviews", require("./routes/reviewsroutes"));
app.use("/api/admin", require("./routes/adminroutes"));
app.use("/api/trainings", require("./routes/trainingsroutes")); 

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});



//starting the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
})
