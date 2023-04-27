import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);

    const getUserDetails = async () => {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-token": localStorage.getItem('token')
            }
        })

        const json = await response.json();
        setDetails(json);
    }

    useEffect(() => {
        console.log(location.pathname);
        getUserDetails();
    }, [location]);

    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            {localStorage.getItem('token') &&

                <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                    <div className="container-fluid">
                        <Link className="navbar-brand font-weight-bold" to="/">
                            <i className="fa-solid fa-cloud"></i>Stormfactor
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                                        <i className="fa-solid fa-house"></i>Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                                        <i className="fa-solid fa-comment"></i>Chatbot
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                                        <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>Government Schemes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                                        <i className="fa-solid fa-plant-wilt"></i>Popular Crops
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center">
                                <div className="dropdown">
                                    <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {details && details.name}<i className="fa-solid fa-circle-user mx-2"></i>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            }
        </div>
    )
}

export default Navbar