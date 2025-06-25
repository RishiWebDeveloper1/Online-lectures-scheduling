import React, { useState } from 'react'
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'

const Auth = () => {
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [teacherUsername, setTeacherUsername] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [plateMode, setPlateMode] = useState(true);

    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/api/admin-login", {
                username: adminUsername,
                password: adminPassword,
            });

            if (res.data.success) {
                navigate(`/admin/addCourse?user=${encodeURIComponent(adminUsername)}`);
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            alert("Login failed: " + (err.response?.data?.message || err.message));
        }
    };

    const handleInstructorLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/api/teacher-login", {
                username: teacherUsername,
                password: teacherPassword,
            });

            if (res.data.success) {
                navigate(`/user/viewCourse?user=${encodeURIComponent(teacherUsername)}`);
            } else {
                alert("Login failed: " + res.data.message);
            }
        } catch (err) {
            alert("Login failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <>
            <div className="login-form-container-box">
                <div className="login-form-container">
                    <div className={plateMode ? "login-form-plate" : "signup-form-plate"}>
                        <div className="plate-title">{plateMode ? "Are you Admin?" : "Are you Instructor?"}</div>
                        <div className="plate-text">{plateMode ? "Welcome back, Admin! Manage courses, users, and platform settings with ease." : "Welcome back, Instructor! Log in to access your teaching tools and resources. Inspire and educate with ease!"}</div>
                        <div className="plate-button" onClick={() => { setPlateMode(!plateMode) }}>Login</div>
                    </div>

                    <div className="signUp-form-box">
                        <h2 className="title">Login as Administrator</h2>

                        <form onSubmit={handleAdminLogin}>
                            <div className="inputBox">
                                <FaUser className="icon" />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={adminUsername}
                                    onChange={(e) => setAdminUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="inputBox">
                                <FaLock className="icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    required
                                    autoComplete='current-password'
                                />
                            </div>
                            <div className="show-password-box">
                                <input type="checkbox" name="" id="" className="show-password-check-box" onClick={() => setShowPassword(!showPassword)} />
                                <div className="show-password-text">Show Password</div>
                            </div>

                            <button type="submit" className="signUpBtn">
                                Login
                            </button>

                            <div className="links">
                                <Link to="/login">Forgot Password?</Link>
                            </div>
                        </form>
                    </div>


                    <div className="login-form-box">
                        <h2 className="title" onClick={() => setPlateMode(!plateMode)}>Login as Instructor</h2>

                        <form onSubmit={handleInstructorLogin}>
                            <div className="inputBox">
                                <FaUser className="icon" />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={teacherUsername}
                                    onChange={(e) => setTeacherUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="inputBox">
                                <FaLock className="icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={teacherPassword}
                                    onChange={(e) => setTeacherPassword(e.target.value)}
                                    required
                                    autoComplete='current-password'
                                />
                            </div>
                            <div className="show-password-box">
                                <input type="checkbox" name="" id="" className="show-password-check-box" onClick={() => setShowPassword(!showPassword)} />
                                <div className="show-password-text">Show Password</div>
                            </div>

                            <button type="submit" className="loginBtn">
                                Login
                            </button>

                            <div className="links">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth
