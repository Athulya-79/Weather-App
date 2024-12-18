// import React from 'react';
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

import React, { useState, useEffect } from "react";


const weatherImages = {
  Clear: clear_icon,
  Clouds: cloud_icon,
  Rain: rain_icon,
  Snow: snow_icon,
  Thunderstorm: drizzle_icon,
  Drizzle: drizzle_icon,
  Mist: drizzle_icon,
  Haze: drizzle_icon,
  Smoke: drizzle_icon,
  Fog: drizzle_icon,
  Dust: drizzle_icon,
  Sand: drizzle_icon,
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("PALAKKAD");

  const fetchWeatherData = async (query) => {
    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(searchQuery);
  }, []);

  useEffect(() => {
    console.log("Weather Data: ", weatherData);
  }, [weatherData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  const getWeatherImage = () => {
    if (!weatherData) return drizzle_icon;
    const condition = weatherData.weather[0].main;
    return weatherImages[condition] || drizzle_icon;
  };

  return (
    <div
  className="d-flex flex-column justify-content-center align-items-center"
  style={{ height: "100vh", width: "100vw", background: "linear-gradient(to bottom, #00c6ff, #0072ff)" }}
>
  <div
    className="d-flex flex-column justify-content-center align-items-center p-4 rounded-3 gap-3"
    style={{
      background: "rgba(255, 255, 255, 0.8)",
      width: "300px",
      borderRadius: "20px",
    }}
  >
    <form
      onSubmit={handleSearch}
      className="search d-flex align-items-center gap-2"
    >
      <input
        type="text"
        className="form-control"
        style={{
          height: "50px",
          border: "none",
          outline: "none",
          borderRadius: "40px",
          paddingLeft: "25px",
          color: "#333333",  
          background: "#ebfffc",
          fontSize: "18px",
        }}
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        style={{
          width: "50px",
          padding: "15px",
          borderRadius: "50%",
          background: "#00c6ff",  
          cursor: "pointer",
          border: "none",
        }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>

    <div
      className="d-flex flex-column justify-content-center align-items-center gap-2"
      style={{
        minHeight: "400px",
        width: "100%",
      }}
    >
      {loading ? (
        <p style={{ color: "#666666" }}>Loading...</p> 
      ) : error ? (
        <p style={{ color: "#ff4d4d" }}>{error}</p> 
      ) : weatherData ? (
        <>
          <img
            src={getWeatherImage()}
            alt="Weather Icon"
            style={{ width: "150px", margin: "30px 0" }}
          />
          <p
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              margin: "0",
              lineHeight: "1",
              color: "#333333",  
            }}
          >
            {weatherData.main.temp}°C
          </p>
          <p
            style={{
              fontSize: "40px",
              margin: "0",
              color: "#333333",  
            }}
          >
            {weatherData.name}
          </p>
          <div
            style={{
              width: "100%",
              marginTop: "40px",
              color: "#333333", 
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                style={{ width: "30px", height: "30px" }}
                src={humidity_icon}
                alt="Humidity Icon"
              />
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, color: "#333333" }}>{weatherData.main.humidity}%</p> 
                <span
                  style={{
                    fontSize: "14px",
                    color: "#666666",  
                  }}
                >
                  Humidity
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                style={{ width: "30px", height: "30px" }}
                src={wind_icon}
                alt="Wind Icon"
              />
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, color: "#333333" }}>{weatherData.wind.speed} km/hr</p> 
                <span
                  style={{
                    fontSize: "14px",
                    color: "#666666",  
                  }}
                >
                  Wind Speed
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: "#666666" }}>No data available</p>  
      )}
    </div>
  </div>
</div>


  );
};

export default Weather;
