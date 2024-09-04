const weatherForm = document.querySelector(".weatherForm")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "522d2454ddf943d0f5f9e433b627a6c9"


weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error)
            displayError(error)
        }

    }
    else{
        displayError("Please Enter a city")
    }
});

cityInput.addEventListener("keydown", async event => {
    if (event.key === "Enter") {
        event.preventDefault();

        const city = cityInput.value;

        if (city) {
            try {
                const weatherData = await getWeatherData(city);
                displayWeatherInfo(weatherData);
            } catch (error) {
                console.log(error);
                displayError(error);
            }
        } else {
            displayError("Please Enter a city");
        }
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);

    if(!response.ok)
        throw new Error("Could not fetch weather data")
    return await response.json();
}

function displayWeatherInfo(data){

    const {name :city,
         main:{temp, humidity},
        weather:[{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("h1");
    const descDisplay = document.createElement("h1");
    const weatherEmoji = document.createElement("h1");

    cityDisplay.classList.add("cityDisplay")
    cityDisplay.textContent = city;
    card.appendChild(cityDisplay)
    
    tempDisplay.classList.add("tempDisplay")
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    card.appendChild(tempDisplay)

    humidityDisplay.classList.add("humidityDisplay")
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    card.appendChild(humidityDisplay)

    descDisplay.classList.add("descDisplay");
    descDisplay.textContent = description;
    card.appendChild(descDisplay);

    weatherEmoji.classList.add("weatherEmoji")
    weatherEmoji.textContent =  getWeatherEmoji(id);
    card.appendChild(weatherEmoji)




}

function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >= 200 && weatherId< 300):
        return "⛈️";
        case(weatherId >= 300 && weatherId< 400):
        return "💦";
        case(weatherId >= 500 && weatherId< 600):
        return "🌧️";
        case(weatherId >= 600 && weatherId< 700):
        return "❄️";
        case(weatherId >= 700 && weatherId< 800):
        return "🌫️";
        case(weatherId === 800):
        return "☀️";
        case(weatherId >= 801 && weatherId< 810):
        return "☁️";
        default:
            return "❔";
    }

}

function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

displayWeatherInfo()
