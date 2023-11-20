const container = document.querySelector(".container");
const search = document.querySelector(".searchbox button");
const weatherBox = document.querySelector(".weatherbox");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// Search lai click banaune
search.addEventListener("click", () => {
  const APIKey = "0b1f9dda86a7d2ccf458ede9bb3ab124";
  const city = document.querySelector(".searchbox input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weatherbox img");
      const temperature = document.querySelector(".weatherbox .temperature");
      const description = document.querySelector(".weatherbox .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "image/gham.png";
          break;

        case "Rain":
          image.src = "image/Rain.png";
          break;

        case "Snow":
          image.src = "image/Snow.png";
          break;

        case "Cloud":
          image.src = "image/Cloud.png";
          break;

        case "haze":
          image.src = "image/Haze.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; //Degree ko lagi alt+0176
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
