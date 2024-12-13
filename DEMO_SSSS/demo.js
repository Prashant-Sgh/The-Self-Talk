const seconds = document.getElementById('second');
const millSeconds = document.getElementById('millSecond')
const minutes = document.getElementById('minute')
const hours = document.getElementById('hour')



setInterval(function () {second()}, 1000);
setInterval(function () {millSecond()}, 100);
setInterval(function () {minute()}, 1000);
setInterval(function () {hour()}, 1000);


function hour() {
    let now = new Date();
    let hour = now.getHours();
    hours.textContent = (24 - hour);
}

function minute() {
    let now = new Date();
    let minute = now.getMinutes();
    minutes.textContent = (60 - minute);
}


function second() {
    let now = new Date();
    let second = now.getSeconds();
    seconds.textContent = (60 - second);
}

function millSecond() {
    let now = new Date();
    let second = now.getMilliseconds();
    millSeconds.textContent = (1000 - second);
}