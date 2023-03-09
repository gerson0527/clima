import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import WeatherApp from './Componentes/WeatherResults/WeatherResults';
import './App.css';
import fondo from './assets/Rectangle 27.png';

function App() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  const API_KEY = '1c9f4be264c59588a211530c1e4a2be6'; // accede a la clave de API desde una variable de entorno

  useEffect(() => {
    // obtiene la ubicación del usuario al cargar la página
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
        )
        .then((response) => {
          setCountry(response.data.sys.country);
          setCity(response.data.name);
          setWeatherData(response.data);
          setError(null); // borra cualquier error anterior
        })
        .catch((error) => {
          console.log(error);
          setError(
            'No se pudo obtener el clima para la ubicación especificada. Por favor, inténtalo de nuevo.',
          ); // establece el estado de error
        });
    });
  }, [API_KEY]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`,
      )
      .then((response) => {
        setWeatherData(response.data);
        setError(null); // borra cualquier error anterior
      })
      .catch((error) => {
        console.log(error);
        setError(
          'No se pudo obtener el clima para la ubicación especificada. Por favor, inténtalo de nuevo.',
        ); // establece el estado de error
      });
  };
  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div className={`main ${theme}`}>
      <div className="centro">
        <div className="title">
          <h2>Clima</h2>
        </div>
        <div class="formulario">
          <form onSubmit={handleFormSubmit}>
            <div class="flex flex-col md:flex-row md:justify-between -mx-3 mb-6">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <input
                  id="location-input"
                  type="text"
                  placeholder="País"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                ></input>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <input
                  id="location-input"
                  type="text"
                  placeholder="Ciudad"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                ></input>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="buttom-Clima">
                  <button type="submit">Obtener Clima</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="buttom-theme">
          <button className="btn" onClick={handleThemeChange}>
            Themas
          </button>
        </div>
      </div>
      {error && <div>{error}</div>}
      <div className="information">
        <img src={fondo} alt="" />
        <div>{weatherData && <WeatherApp weatherData={weatherData} />}</div>
      </div>
    </div>
  );
}

export default App;
