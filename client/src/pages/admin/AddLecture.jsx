import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddLecture.css';
import Profile from '../../component/Profile';

const AddLecture = () => {
    const [formData, setFormData] = useState({
        instructor: '',
        course: '',
        date: ''
    });

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/instructors`)
            .then(res => {
                setInstructors(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch instructors:", err);
            });
    }, []);

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses`)
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch courses:", err);
            });
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/add-lecture`, formData);
            alert("Lecture added successfully!");
            setFormData({ instructor: '', course: '', date: '' });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert("Failed to add lecture: " + error.response.data.message);
            }
            else {
                console.error("Error saving lecture:", error);
                alert("Failed to add lecture.");
            }
        }
    };

    return (
        <div className="main-content">
            <div className="mega-container">
                <Profile />
                <form className="add-lecture-box" onSubmit={handleSubmit}>
                    <div className='input-label'>Instructor Name:</div>
                    <select className='input-field' name="instructor" value={formData.instructor} onChange={handleChange} required>
                        <option value="">Select Instructor</option>
                        {instructors.map((inst, index) => (
                            <option key={index} value={inst.username}>{inst.username}</option>
                        ))}
                    </select>

                    <div className='input-label'>Course Name:</div>
                    <select
                        className='input-field'
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select course</option>
                        {courses.map((course, index) => (
                            <option key={index} value={course.name}>{course.name}</option>
                        ))}
                    </select>

                    <div className='input-label'>Date:</div>
                    <input
                        type="date"
                        className='input-field'
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="submit-button">Add Lecture</button>
                </form>
            </div>
        </div>
    );
};

export default AddLecture;