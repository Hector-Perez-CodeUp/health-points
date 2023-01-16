var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var buttonStart = document.getElementById("button-start");
var buttonStop = document.getElementById('button-stop')
var buttonReset = document.getElementById("button-reset");
var interval;

function startTimer() {
    tens++;
    if (tens < 9) {
        appendTens.innerHTML = "0" + tens;
    }
    else if (tens > 9) {
        appendTens.innerHTML = tens;
    }
    else if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + 0;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    else if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}

buttonStart.onclick = function() {
    interval = setInterval(startTimer);
}

buttonStop.onclick = function() {
    clearInterval(interval);
}

buttonReset.onclick = function() {
    clearInterval(interval);
    tens = "0";
    seconds = "0";
    appendSeconds.innerHTML = seconds;
    appendTens.innerHTML = tens;

}