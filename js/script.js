const time = document.querySelector('.time');
const dataNum = document.querySelector('.date');
const name = document.querySelector(".name")
const body = document.querySelector(".body")
let bgNum
const slideNext = document.querySelector(".slide-next")
const slidePrev = document.querySelector(".slide-prev")
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector(".city")
const speed = document.querySelector(".wind")
const humid = document.querySelector(".humidity")
const quote = document.querySelector(".quote")
const author = document.querySelector(".author")
const BtnQuote = document.querySelector(".change-quote")







//num1 time and Data
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate()
    getTimeOfDay()
    
    
  }


function showDate() {
  let mass = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
  const date = new Date();
  const options = {month: 'long', day: 'numeric', weekday: 'long'};
  const currentDate = date.toLocaleDateString("en-US", options);
  dataNum.textContent = currentDate
}


//num2 Good day and save input value
function getTimeOfDay() {
  const greeting = document.querySelector(".greeting")
  const date = new Date();
  const hours = date.getHours();
  if (6 <= hours && hours < 12) {
    greeting.textContent = "Good morning"
  } else if (12 <= hours && hours < 18) {
    greeting.textContent = "Good afternoon"
  } else if (18 <= hours && hours < 24) {
    greeting.textContent = "Good evening"
  } else if (0 <= hours && hours < 6) {
    greeting.textContent = "Good night"
  }
  return greeting.textContent.split(' ')[1]


}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorage)

// background slider



function getRandomNum() {
  return Math.round(Math.random() * (20 - 1) + 1);
}




function setBg() {
  const img = new Image();
  const timeOfDay = getTimeOfDay();
  bgNum = getRandomNum()
  if (bgNum < 10) {
    img.onload = () => {      
      body.style.backgroundImage = img.src = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/0${bgNum}.jpg')`
    };
  } else {
    img.onload = () => {      
      body.style.backgroundImage = img.src = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
    };
  }
 
  
}



function getSlideNext() {
  const timeOfDay = getTimeOfDay();
  bgNum = bgNum + 1
  if (bgNum < 20) {
    if (bgNum < 10) {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/0${bgNum}.jpg')`
    } else {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
    }
  } else {
    bgNum = 1
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/0${bgNum}.jpg')`
  }
}

function getSlidePrev() {
  const timeOfDay = getTimeOfDay();
  bgNum = bgNum - 1
  if (bgNum > 0) {
    if (bgNum < 10) {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/0${bgNum}.jpg')`
    } else {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
    }
  } else {
    bgNum = 20
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
  }
}

slideNext.addEventListener("click", getSlideNext)

slidePrev.addEventListener("click", getSlidePrev)

//weather
//link https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric

async function getWeather(event) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(event.key)
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = `${(data.weather[0].main).toLowerCase()}`;
  speed.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
  humid.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
}

city.addEventListener("blur", getWeather)
city.addEventListener('keydown', getWeather)

//citata BtnQuote author quote

const list = [
  {
    "text": "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
    "author": "Стив Макконнелл"
  },
  {
    "text": "Сложность программы растет до тех пор, пока не превысит способности программиста",
    "author": "Артур Блох. Законы Мэрфи"
  },
    {
    "text": "Ходить по воде и разрабатывать программы, следуя ТЗ, очень просто… если они заморожены",
    "author": "И. Берард"
  }
] 

function getQuotes() { 
  let num = 0
  quote.textContent = list[num]["text"]
  author.textContent = list[num]["author"]
  BtnQuote.addEventListener("click", function() {
    num = num + 1
    if (num == 3) {
      num = 0
    }
    quote.textContent = list[num]["text"]
    author.textContent = list[num]["author"]
    
  })


}

// audio 
let audio = document.querySelector(".audio_1")
let playBtn = document.querySelector('.play');
let pauseBtn = document.querySelector('.pause');
let isAudio = false
const playNext = document.querySelector(".play-next")
const playPrev = document.querySelector(".play-prev")
let numB = 1


function playAudio() {
  playBtn.classList.toggle('pause');
  if (isAudio == false) {
    audio.currentTime = 0;
    audio.play();
    isAudio = true
  } else {
    audio.pause()
    isAudio = false
  }
}

function playNextJS () {
  if (numB == 5) {
    numB = 0
  }
  numB = numB + 1
  audio.pause()
  audio = document.querySelector(`.audio_${numB}`)
  audio.currentTime = 0;
  audio.play();
  isAudio = true
  playBtn.classList.add('pause');
}

function playPrevJS () {
  if (numB == 1) {
    numB = 6
  }
  numB = numB - 1
  audio.pause()
  audio = document.querySelector(`.audio_${numB}`)
  audio.currentTime = 0;
  audio.play();
  isAudio = true
  playBtn.classList.add('pause');
}





playBtn.addEventListener('click', playAudio);
playNext.addEventListener("click", playNextJS)
playPrev.addEventListener("click", playPrevJS)














setBg()
getQuotes();
showTime();
