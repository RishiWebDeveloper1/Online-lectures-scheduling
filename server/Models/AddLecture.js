const mongoose = require("mongoose");

const AddLectureSchema = new mongoose.Schema(
    {
        instructor: { type: String, required: true },
        course: { type: String, required: true },
        date: { type: String, required: true }
    }
);

const AddLectureModel = mongoose.model('addLecture', AddLectureSchema);
module.exports = AddLectureModel;