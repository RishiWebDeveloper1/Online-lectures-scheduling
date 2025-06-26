import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewCourse.css';
import Profile from './Profile.jsx';

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/viewCourses`)
      .then(res => {setCourses(res.data)
      })
      .catch(err => console.error("Failed to fetch courses:", err));
  }, []);

  return (
    <div className="main-content">
      <div className="mega-container">
        <Profile />
        <div className="view-course-box">
          {courses.map((course, index) => (
            <div className="course-card-box" key={index}>
              <div className="course-image-box">
                <img src={course.image || 'https://via.placeholder.com/150'} alt={course.name} className="course-image" />
              </div>
              <div className="course-detail-box">
                <div className="course-name">{course.name}</div>
                <div className="course-description">{course.description}</div>
                <div className="course-level-box">
                  <div className="course-level">{course.level}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;