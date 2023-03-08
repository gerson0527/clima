import React from 'react';

function Icons({ weatherCode }) {
  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return 'fas fa-sun';
      case '01n':
        return 'fas fa-moon';
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return 'fas fa-cloud';
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return 'fas fa-cloud-showers-heavy';
      case '11d':
      case '11n':
        return 'fas fa-bolt';
      case '13d':
      case '13n':
        return 'fas fa-snowflake';
      case '50d':
      case '50n':
        return 'fas fa-smog';
      default:
        return 'fas fa-question';
    }
  };

  return <i className={getWeatherIcon(weatherCode)}></i>;
}

export default Icons;
