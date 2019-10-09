function init() {
  fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9a4d1c2917194941aa3da679d3e40262/40.806862,-96.681679')
  .then((resp) => resp.json())
  .then(function(data) {
    display(data);
    document.getElementById('loader').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
  })
  .catch(()=>{
    alert('There was an error loading the page.');
  })
}

function display(jsonDump){
  let weatherPicture;
  const daysOfWeek = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const currentDay = new Date().getDay()
  const weatherPictures = {
    rain : "url('https://i.pinimg.com/originals/23/d8/ab/23d8ab1eebc72a123cebc80ce32b43d8.jpg')",
    sunny: "url('https://i.imgur.com/Klia7QY.jpg')",
    cloudy: "url('https://images.wallpaperscraft.com/image/field_grass_clouds_cloudy_119502_1920x1080.jpg')",
    clearNight: "url(https://hdqwalls.com/download/clear-stars-sky-night-rock-5k-h6-1920x1080.jpg)"
  }
  
  console.log(jsonDump);
  //Fill out weather information.
  humidity.insertAdjacentHTML('beforeend', `${Math.round(jsonDump.currently.humidity * 100)}%`);
  temperature.insertAdjacentHTML('beforeend', `${Math.round(jsonDump.currently.temperature)}&#176;`);
  summary.insertAdjacentHTML('beforeend', `"${jsonDump.daily.summary}"`);
  cloudcover.insertAdjacentHTML('beforeend', `${jsonDump.currently.cloudCover * 100}%`);
  currentWeather = jsonDump.currently.icon;

  //Determine type of weather for display. 
  switch (currentWeather) {
    case "rain" :
      weatherPicture = weatherPictures.rain;
      break;
    case "clear-day" :
      weatherPicture = weatherPictures.sunny;
      break;
    case "cloudy" :
      weatherPicture = weatherPictures.cloudy;
      break;
    case "clear-night":
      weatherPicture = weatherPictures.clearNight;
      break;
    default:
        weatherPicture = weatherPictures.sunny;

  }
  //Sets display image. 
  document.getElementById('background').style.backgroundImage = weatherPicture;

  //Fill out daily forecast.
  day1.insertAdjacentHTML(`beforeend`, `${daysOfWeek[currentDay]} : ${jsonDump.daily.data[0].summary}`) 
  day2.insertAdjacentHTML(`beforeend`, `${daysOfWeek[(currentDay + 1) % 7]} : ${jsonDump.daily.data[1].summary}`) 
  day3.insertAdjacentHTML(`beforeend`, `${daysOfWeek[(currentDay + 2) % 7]} : ${jsonDump.daily.data[2].summary}`) 
  day4.insertAdjacentHTML(`beforeend`, `${daysOfWeek[(currentDay + 3) % 7]} : ${jsonDump.daily.data[3].summary}`) 
  day5.insertAdjacentHTML(`beforeend`, `${daysOfWeek[(currentDay + 4) % 7]} : ${jsonDump.daily.data[4].summary}`) 
  day6.insertAdjacentHTML(`beforeend`, `${daysOfWeek[(currentDay + 5) % 7]} : ${jsonDump.daily.data[5].summary}`) 
  day7.insertAdjacentHTML(`beforeend`, `${daysOfWeek[(currentDay + 6) % 7]} : ${jsonDump.daily.data[6].summary}`) 
}

init();
