require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require ("./models/User");
const WorkerProfile = require("./models/WorkerProfile");
const Review = require("./models/Review");
const Training = require("./models/Training");

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("🟢Connected to DB");

        //clear old data
        await User.deleteMany();
        await WorkerProfile.deleteMany();
        await Review.deleteMany();
        await Training.deleteMany();

        //passwords (hashed)
        const hashedPassword = await bcrypt.hash("password123",10);
        //create users
        const admin = await User.create({
            name: "Admin One",
            email: "deosiatah0@gmail.com",
            password: hashedPassword,
            role: "admin",
            isVerified: true
        });

        const employer1 = await User.create({
            name: "Mr. Otieno",
            email:"otieno01@gmail.com",
            password: hashedPassword,
            role: "employer",
            isVerified:true
        });

        const employer2 = await User.create({
            name: "Mrs. Nanyama",
            email:"wangari01@gmail.com",
            password: hashedPassword,
            role: "employer",
            isVerified:true
        });

        const worker1 = await User.create({
            name: "Grace Auma",
            email: "grace01@gmail.com",
            password: hashedPassword,
            role: "worker",
            isVerified: true
        });
        const worker2 = await User.create({
            name: "Linda Njeri",
            email: "linda01@gmail.com",
            password:hashedPassword,
            role:"worker",
            isVerified: true
        });
        const worker3 = await User.create({
            name: "aisha Mohamed",
            email: "aisha01@gmail.com",
            password:hashedPassword,
            role:"worker",
            isVerified: true
        });

        //create Worker Profiles 
        await WorkerProfile.create([
            {
                user: worker1._id,
                location: "Nairobi",
                skills: ["Cleaning","Laundry"],
                bio : "Passionate about helping homes stay clean and organized.",
                photoUrl:"",//add later
                rating:4.5,
                reviewsCount:2,
                likes:30
            },

            {
                user: worker2._id,
                location: "Kisumu",
                skills: ["Childcare","Cooking"],
                bio : "Experienced nanny who loves kids and cooking healthy meals.",
                photoUrl:"",//add later
                rating:4.8,
                reviewsCount:3,
                likes:40

            },

            {
                user: worker3._id,
                location: "Mombasa",
                skills: ["HouseKeeping","Pet care"],
                bio : "Detailed-oriented house manager with pet care skills.",
                photoUrl:"",//add later
                rating:3.9,
                reviewsCount:2,
                likes:10
            }

        ]);

        //Reviews 
        await Review.create([
            {
                reviewer: employer1._id,
                target:worker1._id,
                stars:5,
                comment: "Grace is very proffesional and always on time!",
                isAnonymous:false
            },

            {
                reviewer: employer2._id,
                target:worker2._id,
                stars:4,
                comment: "Linda is great with kids and very polite!",
                isAnonymous:false
            },

            {
                reviewer: employer1._id,
                target:worker3._id,
                stars:3,
                comment: "Aisha did a good job with the laundry and cleaning!",
                isAnonymous:true
            }

        ]);

        //Trainings
        await Training.create([
            {
                name: "Basic Housekeeping Skills",
                date: new Date("2025-08-01"),
                location: "Nairobi",
                description: "Training for new domestic workers on home hygiene and time management",
                createdBy: admin._id,
                imageUrl: " "//add later
            },
            {
                name: "Childcare & First Aid",
                date: new Date("2025-08-15"),
                location: "Kisumu",
                description: "Essential skills for nannies and caregivers.",
                createdBy: admin._id,
                imageUrl: " "
            }

        ]);
        console.log("✅ Seed data create successfully!");
        process.exit();
    } catch (error){
        console.error("❌Error seeding data",error.message);
        process.exit(1);
    }
};

seed();
