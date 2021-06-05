import './App.css';
import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';

const App = () => {
    const [ query, setQuery ] = useState('');
    const [ weather, setWeather ] = useState('');

    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(query);

            setWeather(data);
            setQuery('');
        }
    }

    return (
        <div className='main-container'>
            <input 
              type='text'
              className='search'
              placeholder='Enter a city...'
              value={query}
              onChange={e=>setQuery(e.target.value)}
              onKeyPress={search} />
            
            {weather && (
                <div className='weather-preview'>
                    <h2 className='city-name'>
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <ul className='weather'>
                        <li>Temperature: {weather.main.temp}&deg;C</li>
                        <li>Feels Like: {weather.main.feels_like}&deg;C</li>
                        <li>Humidity: {weather.main.humidity}</li>
                        <li>Pressure: {weather.main.pressure}</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default App;