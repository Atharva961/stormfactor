import React, { useState, useEffect } from 'react'

function EditLandModal(props) {
    const [land, setLand] = useState();

    const onChange = (e) => {
        setLand({ ...land, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/land/updateland/${land._id}`, {
            method: "PUT",
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
        setLand(null);
    }
 
    useEffect(() => {
        console.log(props.land);
        setLand(props.land);
    }, [props.land]); 


    return (
        <div>
            {land && (<form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" aria-describedby="emailHelp" onChange={onChange} required placeholder='City in which this land is located' value={land.city} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nitrogen</label>
                    <input type="number" className="form-control" id="nitrogen" name="nitrogen" aria-describedby="emailHelp" onChange={onChange} step="0.0001" placeholder='ratio of Nitrogen content in soil' value={land.nitrogen}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">phosphorous</label>
                    <input type="number" className="form-control" id="phosphorous" name="phosphorous" aria-describedby="emailHelp" onChange={onChange} step="0.0001" placeholder='ratio of Phosphorous content in soil' value={land.phosphorous}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">potassium</label>
                    <input type="number" className="form-control" id="potassium" name="potassium" aria-describedby="emailHelp" onChange={onChange} step="0.0001" placeholder='ratio of Potassium content in soil' value={land.potassium}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Temperature</label>
                    <input type="number" className="form-control" id="avg_temperature" name="avg_temperature" aria-describedby="emailHelp" onChange={onChange} step="0.0001" placeholder='Temperature in °C' value={land.avg_temperature}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Relative Humidity</label>
                    <input type="number" className="form-control" id="avg_humidity" name="avg_humidity" aria-describedby="emailHelp" onChange={onChange} step="0.0001" placeholder='Relative humidity in %' value={land.avg_humidity}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">ph</label>
                    <input type="number" className="form-control" id="ph" name="ph" aria-describedby="emailHelp" onChange={onChange} step="0.0001" placeholder='ph value of the soil' value={land.ph}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">rainfall</label>
                    <input type="number" className="form-control" id="rainfall" name="rainfall" aria-describedby="emailHelp" onChange={onChange} step="0.0001" placeholder='rainfall in mm' value={land.rainfall}/>
                </div>
                <button disabled={land.city.length === 0} type="submit" className="btn btn-success" onClick={handleClick}>Edit Land</button>
            </form>)}
        </div>
    )
}

export default EditLandModal
