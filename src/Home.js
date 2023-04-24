import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lands from './Lands';
import './Home.css'

function Home() {
    let navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const host = "http://localhost:5000";

    const getUserDetails = async () => {
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
        if (localStorage.getItem('token')) {
            getUserDetails();
        }
        else {
            navigate('/login');
        }
    });
    return (
        <div className="container">
            <h2 className='my-4'>{details.name}</h2>

            <Lands />
        </div>

    )
}

export default Home
