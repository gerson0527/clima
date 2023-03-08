import { useState } from 'react';
import React from 'react';
import './WeatherResults.css';
import Icons from '../Icon/Icons';

function WeatherApp({ weatherData }) {
  const [showFahrenheit, setShowFahrenheit] = useState(false);

  const handleToggleTemp = () => {
    setShowFahrenheit(!showFahrenheit);
  };
  const getTempInFahrenheit = () => {
    return Math.round(((weatherData.main.temp - 273.15) * 9) / 5 + 32);
  };
  return (
    <div className="weatherData">
      <div>
        <h2 className="name">{weatherData.name}</h2>
        <p className="Temperatura">
          {showFahrenheit
            ? getTempInFahrenheit() + '°'
            : Math.round(weatherData.main.temp - 273.15) + '°'}
        </p>
        <Icons weatherCode={weatherData.weather[0].icon} />
        <p className="Descripción"> {weatherData.weather[0].description}</p>
        <p className="Latitud">Latitud: {weatherData.coord.lat}</p>
        <p className="Longitud">Longitud: {weatherData.coord.lon}</p>
      </div>
      <div className="buttom-Temp">
        <button onClick={handleToggleTemp}>
          {showFahrenheit ? 'Mostrar en Celsius' : 'Mostrar en Fahrenheit'}
        </button>
      </div>
    </div>
  );
}

export default WeatherApp;
