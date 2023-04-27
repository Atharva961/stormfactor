import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lands from './Lands';
import './Home.css'

function Home() {
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // getUserDetails();
        }
        else {
            navigate('/login');
        }
    });
    return (
        <div className="container">
            <Lands />
        </div>

    )
}

export default Home
