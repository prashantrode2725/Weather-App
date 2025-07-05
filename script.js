async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherInfo");
  
  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "f6329c7616c997b24532b4c77644d71f";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      weatherDiv.innerHTML = `<p>City not found. Please try again.</p>`;
      return;
    }

    const data = await response.json();
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    const { speed } = data.wind;

    weatherDiv.innerHTML = `
      <h3>Weather in ${name}</h3>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Condition:</strong> ${description}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${speed} m/s</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error fetching data. Please check your connection.</p>`;
  }
}
