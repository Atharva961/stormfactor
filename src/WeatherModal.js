import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

const WeatherModal = ({ weatherData }) => {
    const icons = {
        "Clear": "fa-solid fa-sun text-warning",
        "Clouds": "fa-solid fa-cloud",
        "Rain": "fa-solid fa-cloud-rain text-primary"
    }

    function kelvinToCelsius(kelvin) {
        const celsius = kelvin - 273.15;
        return celsius.toFixed(3);
    }

    const tempData = weatherData && weatherData.list && weatherData.list.map(item => {
        return { name: formatDate(item.dt_txt), Temperature: kelvinToCelsius(item.main.temp) };
    });

    const humidityChartData = weatherData && weatherData.list && weatherData.list.map(item => {
        return { name: formatDate(item.dt_txt), humidity: item.main.humidity };
    });

    const cloudChartData = weatherData && weatherData.list && weatherData.list.map(item => {
        return { name: formatDate(item.dt_txt), cloudCover: item.clouds.all };
    });

    const windSpeedChartData = weatherData && weatherData.list && weatherData.list.map(item => {
        return { name: formatDate(item.dt_txt), windSpeed: item.wind.speed };
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    }


    return (

        <div className="container">

            {
                weatherData && weatherData.cod !== "404" ? (<div>
                    <h3>Following is the forecast over next 5 days for {weatherData && weatherData.city.name}</h3>
                    <div>
                        {
                            <div style={{ display: "flex", overflow: "scroll" }}>
                                {weatherData && weatherData.list && 
                                    weatherData.list.map((ele) => (
                                        <div style={{ margin: "10px", textAlign: "center" }}>
                                            <i className={icons[ele.weather[0].main]} style={{ fontSize: "3rem", marginBottom: "10px" }}></i>
                                            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{ele.weather[0].main}</p>
                                            <p style={{ fontSize: "0.9rem", color: "#888" }}>{formatDate(ele.dt_txt)}</p>
                                        </div>
                                    ))}
                            </div>

                        }
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="text-center">Temperature</h5>
                                <div className="d-flex justify-content-center">
                                    <LineChart width={500} height={300} data={tempData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid stroke="#ccc" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="Temperature" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h5 className="text-center">Humidity</h5>
                                <div className="d-flex justify-content-center">
                                    <LineChart width={500} height={300} data={humidityChartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid stroke="#ccc" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h5 className="text-center">Cloud cover</h5>
                                <div className="d-flex justify-content-center">
                                    <LineChart width={500} height={300} data={cloudChartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid stroke="#ccc" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="cloudCover" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h5 className="text-center">Wind Speed</h5>
                                <div className="d-flex justify-content-center">
                                    <LineChart width={500} height={300} data={windSpeedChartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid stroke="#ccc" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="windSpeed" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (<h2>No weather data available for this location</h2>)
            }

        </div>
    );
};

export default WeatherModal;
