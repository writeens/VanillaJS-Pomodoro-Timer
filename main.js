// DOM Manipulations
const playPause = document.querySelector("#start_stop");
const reset = document.querySelector("#reset");
const beep = document.querySelector("#beep");
const minutes = document.querySelector("#mm");
const seconds = document.querySelector("#ss");
const breakLength = document.querySelector("#break-length");
const sessionLength = document.querySelector("#session-length");
const increaseBreak = document.querySelector("#break-increment");
const decreaseBreak = document.querySelector("#break-decrement");
const increaseSession = document.querySelector("#session-increment");
const decreaseSession = document.querySelector("#session-decrement");
const timerLabel = document.querySelector("#timer-label");
const timeLeft = document.querySelector("#time-left");

// Global Variables
let isRunning = false;
let click = 0;
let intervalID;

// Functions

// Handle Session Increment
function incrementSession() {
    let currentValue = parseInt(sessionLength.textContent, 10);
    if (currentValue < 60 && currentValue > 0) {
        currentValue += 1;
        sessionLength.textContent = currentValue;
        if (timerLabel.textContent === "Session") {
            if (parseInt(sessionLength.textContent, 10) < 10) {
                minutes.textContent = `0${sessionLength.textContent}`;
            } else {
                minutes.textContent = sessionLength.textContent;
            }
            seconds.textContent = "00";
        }
    }
}

// Handle Session Decrement
function decrementSession() {
    let currentValue = parseInt(sessionLength.textContent, 10);
    if (currentValue < 61 && currentValue > 1) {
        currentValue -= 1;
        sessionLength.textContent = currentValue;
        if (timerLabel.textContent === "Session") {
            if (parseInt(sessionLength.textContent, 10) < 10) {
                minutes.textContent = `0${sessionLength.textContent}`;
            } else {
                minutes.textContent = sessionLength.textContent;
            }
            seconds.textContent = "00";
        }
    }
}

// Handle Break Increment
function incrementBreak() {
    let currentValue = parseInt(breakLength.textContent, 10);
    if (currentValue < 60 && currentValue > 0) {
        currentValue += 1;
        breakLength.textContent = currentValue;
        if (timerLabel.textContent === "Break") {
            if (parseInt(breakLength.textContent, 10) < 10) {
                minutes.textContent = `0${breakLength.textContent}`;
            } else {
                minutes.textContent = breakLength.textContent;
            }
            seconds.textContent = "00";
        }
    }
}

// Handle Break Decrement
function decrementBreak() {
    let currentValue = parseInt(breakLength.textContent, 10);
    if (currentValue < 61 && currentValue > 1) {
        currentValue -= 1;
        breakLength.textContent = currentValue;
        if (timerLabel.textContent === "Break") {
            if (parseInt(breakLength.textContent, 10) < 10) {
                minutes.textContent = `0${breakLength.textContent}`;
            } else {
                minutes.textContent = breakLength.textContent;
            }
            seconds.textContent = "00";
        }
    }
}

// Handle Reset
function resetClock() {
    timerLabel.textContent = "Session";
    clearInterval(intervalID);
    breakLength.textContent = 5;
    sessionLength.textContent = 25;
    minutes.textContent = 25;
    seconds.textContent = "00";
    increaseBreak.disabled = false;
    decreaseBreak.disabled = false;
    increaseSession.disabled = false;
    decreaseSession.disabled = false;
    isRunning = false;
    playPause.childNodes[0].classList.remove("fa-pause-circle");
    playPause.childNodes[0].classList.add("fa-play-circle");
    click = 0;
    beep.load();
}

function controlClock() {
    // Determine whether start or stop button has been initated
    click += 1;
    if (click % 2 !== 0) {
        isRunning = true;
        playPause.childNodes[0].classList.remove("fa-play-circle");
        playPause.childNodes[0].classList.add("fa-pause-circle");
    } else if (click % 2 === 0) {
        isRunning = false;
        playPause.childNodes[0].classList.remove("fa-pause-circle");
        playPause.childNodes[0].classList.add("fa-play-circle");
    }

    if (isRunning) {
        // While running disable buttons
        increaseBreak.disabled = true;
        decreaseBreak.disabled = true;
        increaseSession.disabled = true;
        decreaseSession.disabled = true;
        let currentMinutes = parseInt(minutes.textContent, 10);
        let currentSeconds = parseInt(seconds.textContent, 10);
        intervalID = setInterval(() => {
            if (currentSeconds === 0) {
                currentSeconds = 60;
                currentMinutes -= 1;
            }
            // Update seconds
            currentSeconds -= 1;
            if (currentSeconds < 10) {
                seconds.textContent = `0${currentSeconds}`;
            } else {
                seconds.textContent = currentSeconds;
            }
            // Update minutes
            if (currentMinutes < 10) {
                minutes.textContent = `0${currentMinutes}`;
            } else {
                minutes.textContent = currentMinutes;
            }
            // Handle Change
            if (minutes.textContent === "00" && seconds.textContent === "00" && timerLabel.textContent === "Session") {
                beep.play();
                timerLabel.textContent = "Break";
                currentMinutes = parseInt(breakLength.textContent, 10);
                currentSeconds = 1;
            } else if (minutes.textContent === "00" && seconds.textContent === "00" && timerLabel.textContent === "Break") {
                beep.play();
                timerLabel.textContent = "Session";
                currentMinutes = parseInt(sessionLength.textContent, 10);
                currentSeconds = 1;
            }
        }, 1000);
    }
    if (!isRunning) {
        increaseBreak.disabled = false;
        decreaseBreak.disabled = false;
        increaseSession.disabled = false;
        decreaseSession.disabled = false;
        clearInterval(intervalID);
    }
}
// Event Listeners
increaseSession.addEventListener("click", incrementSession);
decreaseSession.addEventListener("click", decrementSession);
increaseBreak.addEventListener("click", incrementBreak);
decreaseBreak.addEventListener("click", decrementBreak);
reset.addEventListener("click", resetClock);
playPause.addEventListener("click", controlClock);
