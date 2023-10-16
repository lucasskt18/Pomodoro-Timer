const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

let workDuration = 25 * 60; 
let breakDuration = 5 * 60;
let isRunning = false;
let isWorking = true;
let countdown;

function updateDisplay() {
    const minutes = Math.floor(workDuration / 60);
    const seconds = workDuration % 60;
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.innerText = isWorking ? `Work: ${displayTime}` : `Break: ${displayTime}`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(countdown);
    } else {
        countdown = setInterval(updateTimer, 1000);
    }
    isRunning = !isRunning;
    startButton.innerText = isRunning ? "Pause" : "Start";
}

function updateTimer() {
    if (workDuration === 0 && isWorking) {
        isWorking = false;
        workDuration = breakDuration;
        timerDisplay.style.color = "green";
    } else if (workDuration === 0 && !isWorking) {
        isWorking = true;
        workDuration = 25 * 60;
        timerDisplay.style.color = "red";
    }
    workDuration--;
    updateDisplay();
}

function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    isWorking = true;
    workDuration = 25 * 60;
    updateDisplay();
    startButton.innerText = "Start";
    timerDisplay.style.color = "black";
}

startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
updateDisplay();
