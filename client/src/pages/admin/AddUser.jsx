import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';
import Profile from '../../component/Profile';

const AddUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const secureData = {
            ...formData,
            role: 'instructor'
        };

        try {
            const response = await axios.post('http://localhost:3000/api/add-user', secureData);
            alert("User added successfully!");
            setFormData({ username: '', email: '', password: '' });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert("Failed to add course: " + error.response.data.message);
            }
            else {
                console.error("Error adding user:", error);
                alert("Failed to add user.");
            }
        }
    };

    return (
        <div className="main-content">
            <div className="mega-container">
                <Profile />
                <form className="add-user-box" onSubmit={handleSubmit}>
                    <div className='input-label'>Username:</div>
                    <input type="text" className='input-field' name="username" value={formData.username} onChange={handleChange} required />

                    <div className='input-label'>Email:</div>
                    <input type="email" className='input-field' name="email" value={formData.email} onChange={handleChange} required />

                    <div className='input-label'>Password:</div>
                    <input type="password" className='input-field' name="password" value={formData.password} onChange={handleChange} required />

                    <div className='input-label'>Role:</div>
                    <input type="text" className='input-field' value="Instructor" disabled readOnly />

                    <button type="submit" className="submit-button">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;