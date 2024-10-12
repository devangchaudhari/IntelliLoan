const express = require("express");
const axios = require("axios"); // For making HTTP requests
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");  // Nodemailer for email functionality
const authRoutes = require("./routes/auth");
const User = require("./models/User");

require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// MongoDB connection string (use your MongoDB Atlas URI)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// JWT secret key (replace with a secure key in production)
const JWT_SECRET = process.env.JWT_SECRET;  // Placeholder for JWT secret

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); // Extract Bearer token, use JWT_SECRET
    req.user = decoded.user;  // Attach user info from token to the request object
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Files will be saved in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique timestamp name
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
    }
    cb(null, true);
  }
});

// Route to get user profile
app.get("/routes/auth/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username profileImage phone dob");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);  // Send back user data (username, profileImage, phone, and dob)
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Route to update user profile (with image upload)
app.put("/routes/auth/profile", verifyToken, upload.single('profileImage'), async (req, res) => {
  try {
    const { name, phone, dob } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    const updatedData = {
      username: name,
      phone,
      dob: dob ? new Date(dob) : undefined,
      profileImage: profileImage ? `uploads/${profileImage}` : undefined,
    };

    // Remove undefined values (if no image is uploaded, don't update it)
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Use the auth routes (Registration, Login, etc.)
app.use("/routes/auth", authRoutes);

// NewsAPI key (Replace with your actual API key from NewsAPI)
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// News route to get loan-related news
app.get("/routes/news/loan", async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: 'loan OR EMI OR bank OR "personal loan" OR "home loan" OR "loan in India"',  // Search query for loan-related news
        sortBy: 'publishedAt',  // Sort by the latest published articles
        language: 'en',
        apiKey: NEWS_API_KEY,  // Your API key
      },
    });

    const articles = response.data.articles;

    if (!articles || articles.length === 0) {
      return res.status(404).json({ msg: "No loan-related news found." });
    }

    res.json(articles);  // Send the articles as JSON
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ msg: "Server error while fetching news." });
  }
});

// ** Feedback Email Route **
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Replace with your email
    pass: process.env.EMAIL_PASS     // Replace with your email password
  }
});

app.post('/send-feedback', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'mrdhiraj9515@gmail.com',
    to: 'devangchaudhari2003@gmail.com',  // Receiver email
    subject: 'Feedback from Intelliloan Website',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Feedback sent successfully');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
