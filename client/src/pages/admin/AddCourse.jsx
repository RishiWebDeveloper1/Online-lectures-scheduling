import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCourse.css';
import Profile from '../../component/Profile';

const AddCourse = () => {
    const [formData, setFormData] = useState({
        name: '',
        level: '',
        description: '',
        image: '',
        instructor: '',
        date: '',
        course: ''
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

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setFormData(prev => ({
            ...prev,
            course: formData.name
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/add-course`, formData);
            const response2 = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/add-lecture`, formData);
            alert("Course added successfully!");
            setFormData({
                name: '',
                level: '',
                description: '',
                image: '',
                instructor: '',
                date: '',
                course: ''
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert("Failed to add course: " + error.response.data.message);
            }
            else {
                console.error("Failed to add course:", error);
                alert("Failed to add course.");
            }
        }
    };

    return (
        <div className="main-content">
            <div className="mega-container">
                <Profile />
                <form className="add-course-box" onSubmit={handleSubmit}>
                    <div className='input-label'>Name:</div>
                    <input type="text" className='input-field' name="name" value={formData.name} onChange={handleChange} placeholder='Course name' required />

                    <div className='input-label'>Level:</div>
                    <select className='input-field' name="level" value={formData.level} onChange={handleChange} required>
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    <div className='input-label'>Description:</div>
                    <textarea className='input-field' name="description" value={formData.description} onChange={handleChange} placeholder='Description' required />

                    <div className='input-label'>Image URL:</div>
                    <input type="text" className='input-field' name="image" value={formData.image} onChange={handleChange} placeholder='Image URL' required />

                    <div className='input-label'>Instructor:</div>
                    <select className='input-field' name="instructor" value={formData.instructor} onChange={handleChange} required>
                        <option value="">Select Instructor</option>
                        {instructors.map((inst, index) => (
                            <option key={index} value={inst.username}>{inst.username}</option>
                        ))}
                    </select>

                    <div className='input-label'>Date:</div>
                    <input type="date" className='input-field' name="date" value={formData.date} onChange={handleChange} required />

                    <button type="submit" className="submit-button">Add Course</button>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;