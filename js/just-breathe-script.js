let numberDiv = document.getElementById("numberDiv");
let number = 0;

function breathingTimer() {
    while (number <= 4) {
        setTimeout(function () {
            numberDiv.innerHTML = ('<p>${number}</p>' + number);
            number = number + 1;
        }, 1000);
    }
}

breathingTimer();

setTimeout(function(){
    console.log("Hello World");
}, 5000);