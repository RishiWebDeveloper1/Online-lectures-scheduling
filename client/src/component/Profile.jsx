import React, { useEffect, useState } from 'react'
import './Profile.css'
import DefaultUserIcon from '../assets/default-user-icon.png'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Profile = () => {
    const [userDetail, setUserDetail] = useState(null)

    const query = new URLSearchParams(useLocation().search);
    const username = query.get("user");
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/show-user`, { params: { username: username } })
            .then(res => {
                setUserDetail(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch user detail:", err);
            });
    }, [])

    return (
        <>

            <div style={{ backgroundColor: "white" }} className="student-profile-banner">
                <div className="student-profile-banner-text">
                    Dashboard
                </div>
                <div className="student-profile-box">
                    <div className="student-detail-box">
                        <div className="student-name-box">
                            {
                                userDetail ? (
                                    <div className="student-name">
                                        {userDetail[0].username}
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )
                            }
                        </div>
                        <div className="student-standard-box">
                            {
                                userDetail ? (
                                    <div className="student-standard">
                                        {userDetail[0].role}
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="student-profile-image-box">
                        <img src={DefaultUserIcon} alt="" className="student-profile-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
