const WeatherFoam = document.querySelector(".WeatherFoam");
const Cityinput = document.querySelector(".Cityinput");
const card = document.querySelector(".card");
const apikey = "78bf09b6135133226a24e2b58b4c6e42";

WeatherFoam.addEventListener("submit",async event =>{

    event.preventDefault();
    const city = Cityinput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherinfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch Weather data");
    }
    
    return await response.json();
}

function displayWeatherinfo(data){
    const {name: city,
           main: {temp,humidity},
           weather: [{description,id}]} = data;

    card.textContent = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const desDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    desDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    desDisplay.classList.add("disDisplay");
    emojiDisplay.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desDisplay);
    card.appendChild(emojiDisplay);
}

function getWeatherEmoji(weatherID){
    switch(true){
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case (weatherID >= 300 && weatherID < 400):
            return "⛈️";
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case (weatherID >= 600 && weatherID < 700):
            return "🌨️";
        case (weatherID >= 600 && weatherID < 700):
            return "🌫️";
        case (weatherID == 800):
            return "☀️";
        case (weatherID > 800 && weatherID <= 810):
                return "☁️";
        default:
            return "❓";
        
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
