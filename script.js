async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "7a989ef9ff418bc3fbb88429543a196e"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;

      weatherDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Condition:</strong> ${desc}</p>
      `;
    } else {
      weatherDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
    }
  } catch (err) {
    weatherDiv.innerHTML = `<p style="color: red;">Error fetching weather data.</p>`;
  }
}
