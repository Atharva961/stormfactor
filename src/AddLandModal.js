import React, { useState } from 'react'

function AddLandModal() {
    const [land, setLand] = useState({ city: "", nitrogen: -1, phosphorous: -1, potassium: -1, avg_temperature: -1, avg_humidity: -1, ph: -1, rainfall: -1 });

    const onChange = (e) => {
        setLand({ ...land, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/land/addland`, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(land)
        })

        const json = await response.json()
        console.log(json);
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nitrogen</label>
                    <input type="number" className="form-control" id="nitrogen" name="nitrogen" aria-describedby="emailHelp" onChange={onChange} step="0.0001"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">phosphorous</label>
                    <input type="number" className="form-control" id="phosphorous" name="phosphorous" aria-describedby="emailHelp" onChange={onChange} step="0.0001"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">potassium</label>
                    <input type="number" className="form-control" id="potassium" name="potassium" aria-describedby="emailHelp" onChange={onChange} step="0.0001"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">avg_temperature</label>
                    <input type="number" className="form-control" id="avg_temperature" name="avg_temperature" aria-describedby="emailHelp" onChange={onChange} step="0.0001"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">avg_humidity</label>
                    <input type="number" className="form-control" id="avg_humidity" name="avg_humidity" aria-describedby="emailHelp" onChange={onChange} step="0.0001"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">ph</label>
                    <input type="number" className="form-control" id="ph" name="ph" aria-describedby="emailHelp" onChange={onChange} step="0.0001"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">rainfall</label>
                    <input type="number" className="form-control" id="rainfall" name="rainfall" aria-describedby="emailHelp" onChange={onChange} step="0.0001"/>
                </div>
                <button disabled={land.city.length === 0} type="submit" className="btn btn-success" onClick={handleClick}>Add Land</button>
            </form>
        </div>
    )
}

export default AddLandModal
