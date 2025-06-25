import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState('viewCourse');
    const [showLogout, setShowLogout] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const getPage = location.pathname.split("/").pop()

    useEffect(() => {
        setCurrentPage(getPage);

        const query = new URLSearchParams(location.search);
        const username = query.get("user");

        navigate(`/user/${getPage}?user=${encodeURIComponent(username)}`, { replace: true });
    }, [getPage])

    const redirect = (page) => {

        setCurrentPage(page);   
        const query = new URLSearchParams(location.search);
        const username = query.get("user");

        navigate(`/user/${page}?user=${encodeURIComponent(username)}`);
    };

    return (
        <>
            <div className="dashboard-container">
                <aside className="sidebar">
                    <div className="logo">🎓</div>
                    <ul className="menu">
                        <li className={currentPage === "viewCourse" ? "active" : ''} onClick={() => { redirect("viewCourse") }}>View Courses</li>
                        <li className={currentPage === "viewLecture" ? "active" : ''} onClick={() => { redirect("viewLecture") }}>View Lectures</li>
                        <li className={currentPage === "logout" ? "active logout" : 'logout'} onClick={() => { setShowLogout(true) }}>Logout</li>
                    </ul>
                </aside>

                {
                    showLogout ? (
                        <div className="logout-box-container">
                            <div className="logout-box">
                                <div className="logout-text">
                                    Are you sure you want to log out?
                                </div>
                                <Link to={'/login'} className="logout-button-box" onClick={() => { setShowLogout(false) }}>
                                    <div className="logout-button-text">
                                        Log out
                                    </div>
                                </Link>
                                <div className="cancel-button-box" onClick={() => { setShowLogout(false) }}>
                                    <div className="cancel-button-text">
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>
        </>
    )
}

export default Dashboard
