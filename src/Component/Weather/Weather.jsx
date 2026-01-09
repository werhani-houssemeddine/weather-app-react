import "./style.css";

import icons from "./icons";
import weatherData from "./data";
import { CloudRain, Wind, Droplets } from 'lucide-react';

import {
  calculateAverage,
  calculateTotal,
  getThreshold,
  makeArrayFromObjectKey,
  formatDate,
  formatTime
} from "./lib";

function WeatherIcon({ code, size }) {
  const getWeatherIconSrc = code => '/weather-icons/' + icons[code];

  return (
    <div className="icon-container">
      <img src={getWeatherIconSrc(code)} alt="Weather Icon" width={size} height={size} />
    </div>
  );
}

function WeatherDescription({ code }) {

  function getWeatherDescription(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code === 45 || code === 48) return "Foggy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 85 && code <= 86) return "Snow showers";
    if (code === 95 || code === 96 || code === 99) return "Thunderstorm";
    return "Unknown";
  };

  return (
    <div className="weather-desc">
      {getWeatherDescription(code)}
    </div>
  );
}

function HeaderWeather() {

  const temps = makeArrayFromObjectKey(weatherData, 'temp')
  const { min, max } = getThreshold(temps);
  const avgHumidity = calculateAverage(weatherData, 'humidity').toFixed(1);
  const avgWind = calculateAverage(weatherData, 'wind').toFixed(1);
  const totalRain = calculateTotal(weatherData, 'rain').toFixed(1);

  return (
    <div className="header">
      <h1 className="title">{formatDate(weatherData[0].time)}</h1>

      <div className="summary-grid">
        <SummaryCard title="High / Low" value={`${max.toFixed(1)}° / ${min.toFixed(1)}°`} customClass="max-min" />
        <SummaryCard title="Humidity" value={`${avgHumidity}%`} icon={Droplets} customClass="humidity-card" />
        <SummaryCard title="Wind" value={`${avgWind} km/h`} icon={Wind} customClass="wind-card" />
        <SummaryCard title="Rain" value={`${totalRain} mm`} icon={CloudRain} customClass="rain-card" />
      </div>
    </div>

  );
}

function SummaryCard({ title, value, icon: Icon, customClass }) {
  return (
    <div className={`summary-card ${customClass}`}>
      <div className="summary-label">
        {Icon && <Icon size={16} />} {title}
      </div>
      <div className="summary-value">{value}</div>
    </div>
  );
}


function WeatherCard({ time, code, humidity, wind, rain, temperature }) {
  return (
    <div className="hourly-card">
      <div className="hourly-time">
        {formatTime(time)}
      </div>

      <WeatherIcon code={code} size={48} />
      <WeatherDescription code={code} />

      <div className="temperature">
        {temperature.toFixed(1)}°
      </div>

      <div className="details-container">
        <div className="detail-row">
          <Droplets size={12} />
          <span>{humidity}%</span>
        </div>

        <div className="detail-row">
          <Wind size={12} />
          <span>{wind.toFixed(1)} km/h</span>
        </div>

        {rain > 0 && (
          <div className="detail-row">
            <CloudRain size={12} />
            <span>{rain} mm</span>
          </div>
        )}
      </div>
    </div>
  );
}

function HourlyWeather() {
  function getWeatherCard(data, index) {
    return <WeatherCard
      time={data.time}
      code={data.weatherCode}
      humidity={data.humidity}
      wind={data.wind}
      rain={data.rain}
      key={index}
      temperature={data.temp}
    />
  }

  return (
    <div className="hourly-section">
      <h2 className="section-title">Hourly Forecast</h2>
      <div className="hourly-grid">
        {weatherData.map(getWeatherCard)}
      </div>
    </div>
  );
}

export default function Weather() {
  return (
    <div className="container">
      <div className="max-width">
        <HeaderWeather />
        <HourlyWeather />
      </div>
    </div>
  );
};
