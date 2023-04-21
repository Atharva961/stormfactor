import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Signup(props) {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "", cpassword: "", name: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // props.showAlert("Sign Up Succesful", "success");
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else {
            // props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" aria-describedby="nameHelp" value={credentials.name} onChange={onChange} />
                        <div id="nameHelp" className="form-text">Please enter your full name.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>Submit</button>
                    <p style={{ marginTop: '10px' }}>Already have an account? <Link to="/login" role="button">Login</Link></p>
                </form>
            </div>
        </div>

    )
}

export default Signup