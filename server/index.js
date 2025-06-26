const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const UserModel = require("./Models/User");
const CourseModel = require('./Models/AddCourse');
const LectureModel = require('./Models/AddLecture');

const app = express();

app.use(express.json());

const allowedOrigins = [process.env.CLIENT_ORIGIN];
app.use(cors({
    origin: [ allowedOrigins ],
    credentials: true
}));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// ******************** Auth page api ********************
app.get("/api/show-user", async (req, res) => {
    const username = req.query.username;
    try {
        const userDetail = await UserModel.find({ username: username });
        res.json(userDetail);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user detail" });
    }
});

// ******************** Auth page api ********************
app.post("/api/admin-login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await UserModel.find({}, 'username');
        const usernames = users.map(user => user.username);
        console.log("All Usernames:", usernames);

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        if (user.role !== "admin") {
            return res.status(401).json({ success: false, message: "The user is not an admin" });
        }

        res.json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/api/teacher-login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await UserModel.find({}, 'username');
        const usernames = users.map(user => user.username);
        console.log("All Usernames:", usernames);

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        res.json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ******************** addCourse page api ********************
app.get("/api/instructors", async (req, res) => {
    try {
        const instructors = await UserModel.find({ role: 'instructor' }, 'username');
        res.json(instructors);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch instructors" });
    }
});

app.post("/api/add-course", async (req, res) => {
    try {
        const existingCourse = await CourseModel.findOne({
            name: { $regex: new RegExp('^' + req.body.name + '$', 'i') }
        });

        if (existingCourse) {
            return res.status(400).json({ success: false, message: "Course already exists" });
        }

        const instructorConflict = await LectureModel.findOne({
            instructor: req.body.instructor,
            date: req.body.date
        });

        if (instructorConflict) {
            return res.status(400).json({ success: false, message: "Instructor already has a course on this date" });
        }

        const newCourse = new CourseModel(req.body);
        await newCourse.save();
        res.json({ success: true, message: "Course added successfully!" });
    } catch (err) {
        console.error("Error saving course:", err);
        res.status(500).json({ success: false, message: "Error saving course" });
    }
});

// ******************** addLecture page api ********************
app.post("/api/add-lecture", async (req, res) => {
    try {
        const instructorConflict = await LectureModel.findOne({
            instructor: req.body.instructor,
            date: req.body.date
        });

        if (instructorConflict) {
            return res.status(400).json({ success: false, message: "Instructor already has a course on this date" });
        }

        const newLecture = new LectureModel(req.body);
        await newLecture.save();
        res.json({ success: true, message: "Lecture added successfully!" });
    } catch (err) {
        console.error("Error saving lecture:", err);
        res.status(500).json({ success: false, message: "Error saving lecture" });
    }
});

app.get("/api/courses", async (req, res) => {
    try {
        const courses = await CourseModel.find({}, 'name');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});

// ******************** addUser page api ********************
app.post("/api/add-user", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const instructors = await UserModel.findOne({ username: username });

        if (instructors) {
            return res.status(500).json({ success: false, message: "Username already taken" });
        }
        
        const user = new UserModel({
            username,
            email,
            password,
            role: 'instructor'
        });
        
        await user.save();
        res.json({ success: true, message: "User created successfully!" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ success: false, message: "Error adding user" });
    }
});

// ******************** viewLectures page api ********************
app.get('/api/lectures', async (req, res) => {
    try {
        const lectures = await LectureModel.find({});
        res.json(lectures);
    } catch (err) {
        console.error("Failed to fetch lectures:", err);
        res.status(500).json({ message: "Failed to fetch lectures" });
    }
});

// ******************** viewCourse page api ********************
app.get("/api/viewCourses", async (req, res) => {
    try {
        const courses = await CourseModel.find({});
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});


app.listen(3000, () => {
    console.log("Server is started on port 3000");
});
