document.getElementById('search-button').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = '5facf4fa4aa8e18fb7e3b90ee997c468'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        document.getElementById('weather-display').innerHTML = `Error: ${error.message}`;
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const appContainer = document.getElementById('app-container');
    const { name, main, weather } = data;
    const weatherCondition = weather[0].main.toLowerCase();

    const backgroundImages = {
        clear: 'url("images/clear.jpg")',
        clouds: 'url("images/clouds.jpg")',
        rain: 'url("images/rain.jpg")',
        snow: 'url("images/snow.jpg")',
        thunderstorm: 'url("images/thunderstorm.jpg")',
        drizzle: 'url("images/drizzle.jpg")',
        mist: 'url("images/mist.jpg")',
        default: 'url("images/default.jpg")'
    };

    const backgroundImage = backgroundImages[weatherCondition] || backgroundImages.default;
    appContainer.style.backgroundImage = backgroundImage;
    appContainer.style.backgroundSize = 'cover';

    weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}
