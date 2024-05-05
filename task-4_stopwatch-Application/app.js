let timer;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
  if (!timer) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    document.querySelector("button:nth-of-type(1)").innerText = "Pause";
  } else {
    clearInterval(timer);
    timer = null;
    document.querySelector("button:nth-of-type(1)").innerText = "Start";
  }
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById("display").innerText = formattedTime;
}

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function reset() {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  document.getElementById("display").innerText = "00:00:00";
  document.querySelector("button:nth-of-type(1)").innerText = "Start";
  laps = [];
  document.getElementById("lapTimes").innerHTML = "";
}

function lap() {
  if (timer) {
    const lapTime = elapsedTime;
    laps.push(lapTime);
    const lapIndex = laps.length;
    const formattedLapTime = formatTime(lapTime);
    const lapElement = document.createElement("div");
    lapElement.innerText = `Lap ${lapIndex}: ${formattedLapTime}`;
    document.getElementById("lapTimes").appendChild(lapElement);
  }
}
