import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewLecture.css';
import Profile from './Profile.jsx';

const ViewLecture = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/lectures")
      .then(res => setLectures(res.data))
      .catch(err => console.error("Failed to fetch lectures:", err));
  }, []);

  return (
    <div className="main-content">
      <div className="mega-container">
        <Profile />
        <div className="view-lectures-box">
          <h2>All Scheduled Lectures</h2>
          <table>
            <thead>
              <tr>
                <th>Instructor</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture, index) => (
                <tr key={index}>
                  <td>{lecture.instructor}</td>
                  <td>{lecture.course}</td>
                  <td>{lecture.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {lectures.length === 0 && <p>No lectures scheduled.</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewLecture;
