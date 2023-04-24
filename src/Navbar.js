import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(location.pathname);

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
                        <Link className="navbar-brand font-weight-bold" to="/"><i className="fa-solid fa-cloud"></i>Stormfactor</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/"><i className="fa-solid fa-house"></i>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/"><i className="fa-solid fa-comment"></i>Chatbot</Link>
                                </li>
                            </ul>
                            <Link className='btn btn-success mx-2' to="/login" role="button" onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                </nav>}
        </div>
    )
}

export default Navbar