const apiKey = "ba823726217941c8bb8234701242701";
const baseUrl = `https://api.weatherapi.com/v1`;

let searchInput = document.getElementById("search");
let dayName = document.getElementById("dayName");
let dayNum = document.getElementById("dayNum");
let monthName = document.getElementById("monthName");
let cityName = document.getElementById("city");
let temp = document.getElementById("temp");
let icon = document.getElementById("icon-img");
let condition = document.getElementById("condition");
let cloudy = document.getElementById("cloud");
let wind = document.getElementById("wind");
let wind_dir = document.getElementById("wind_dir");

async function fetchData(cityName) {
  try {
    const response = await fetch(
      `${baseUrl}/forecast.json?key=${apiKey}&q=${cityName}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    let data = await response.json();

    
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

fetchData();

function display(data) {
  let dayOpj = new Date();
  dayName.innerHTML = dayOpj.toLocaleDateString("en-Us", { weekday: "long" });
  dayNum.innerHTML = dayOpj.getDate();
  monthName.innerHTML = dayOpj.toLocaleDateString("en-Us", { month: "long" });
  cityName.innerHTML = data.location.name;
  temp.innerHTML = data.current.temp_c + "&deg;C";
  icon.setAttribute("src", data.current.condition.icon);
  condition.innerHTML = data.current.condition.text;
  cloudy.innerHTML = data.current.cloud;
  wind.innerHTML = data.current.wind_kph;
  wind_dir.innerHTML = data.current.wind_dir;
}

// here the forcast just for a day

let nextMaxTemp = document.getElementsByClassName("next_max_temp");
let nextMinTemp = document.getElementsByClassName("next_min_temp");
let nextIcon = document.getElementsByClassName("next_day_icon");
let nextcondition = document.getElementsByClassName("next_condition");
let nextDayName = document.getElementById("nextDayName");
let fakeimg = document.getElementById("fakeimg");

// here the info about forecast day is in a list

function displayNextDay(data) {
  let forecastData = data.forecast.forecastday[0].day;
  nextDayName = forecastData.name;
  nextMaxTemp[0].innerHTML = forecastData.maxtemp_c + "<sup> O</sup>C";
  nextMinTemp[0].innerHTML = forecastData.mintemp_c + "<sup> O</sup>C";
  nextIcon[0].setAttribute("src", forecastData.condition.icon);
  nextcondition[0].innerHTML = forecastData.condition.text;
  fakeimg.setAttribute("src", forecastData.condition.icon);
}

async function startApp(cityName = "cairo") {
  let data = await fetchData(cityName);
  if (!data.error) {
    display(data);
    displayNextDay(data);
  } else {
    console.error("API Error:", data.error.message);
  }
}

startApp();

searchInput.addEventListener("input", function () {
  startApp(searchInput.value);
});

function validateEmail(event) {
  event.preventDefault(); // Prevents the form from submitting by default

  var emailInput = document.getElementById("mail");
  var email = emailInput.value;

  // Simple email validation using a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    // If the email is valid, you can use the "mailto" protocol to open the user's default email client
    window.location.href = "mailto:" + email;
  } else {
    // If the email is not valid, add the "error" class to the input to change its border color
    emailInput.classList.add("error");
  }
}

// Remove the "error" class when the user starts typing again
document.getElementById("search").addEventListener("input", function () {
  this.classList.remove("error");
});

document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});
