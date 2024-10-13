const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const authRoutes = require("./routes/auth");
const User = require("./models/User");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

// Use the auth routes (Registration, Login, etc.)
app.use("/routes/auth", authRoutes(verifyToken));

// NewsAPI key
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// News route to get loan-related news
app.get("/routes/news/loan", async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: 'loan OR EMI OR bank OR "personal loan" OR "home loan" OR "loan in India"',
        sortBy: 'publishedAt',
        language: 'en',
        apiKey: NEWS_API_KEY,
      },
    });

    const articles = response.data.articles;
    if (!articles || articles.length === 0) {
      return res.status(404).json({ msg: "No loan-related news found." });
    }

    res.json(articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ msg: "Server error while fetching news." });
  }
});

// Feedback Email Route
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-feedback", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER, // Use environment variable for the receiver email
    subject: "Feedback from Intelliloan Website",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Feedback sent successfully");
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
