import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials.email);
        console.log(credentials.password);
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            // props.showAlert("Log in Succesful", "success");
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else {
            // props.showAlert("Invalid Credentials", "danger");
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='container' style={{ maxWidth: '400px', backgroundColor: '#f3f3f3', padding: '30px', borderRadius: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>Submit</button>
                    <p style={{ marginTop: '10px' }}>Don't have an account? <Link to="/signup" role="button">Sign Up</Link></p>
                </form>
            </div>
        </div>


    )
}

export default Login
