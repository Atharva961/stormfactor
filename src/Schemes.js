import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Schemes() {
    const [schemes, setSchemes] = useState(null);
    const getAllSchemes = async () => {
        const response = await fetch(`http://localhost:5000/api/schemes/fetchallschemes`, {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setSchemes(json);
    }
    useEffect(() => {
        getAllSchemes();
    }, [])

    return (
        <div className='container'>
            {
                schemes && schemes.map((scheme) => {
                    return <div className="card m-4" style={{ backgroundColor: "hsl(81, 100%, 95%)" }}>
                        <div className="card-body">
                            <h3>{scheme.name}</h3>
                            <p>{scheme.description}</p>
                            <Link className='btn btn-success' to={scheme.url} target='_blank'>Go to official website</Link>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Schemes
