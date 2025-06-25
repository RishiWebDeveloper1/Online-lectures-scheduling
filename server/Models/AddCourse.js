const mongoose = require("mongoose");

const AddCourseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        level: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }
    }
);

const AddCourseModel = mongoose.model('addCourse', AddCourseSchema);
module.exports = AddCourseModel;