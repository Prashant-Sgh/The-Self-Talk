setTimeout(function () {
    load_now();
}, 3000)

function load_now() {

    const Timmer_Days = document.querySelector('.Timmer_Day');
    const Timmer_Hours = document.querySelector('.Timmer_Hour');
    const Timmer_Minutes = document.querySelector('.Timmer_Minute');
    const Timmer_Seconds = document.querySelector('.Timmer_Second');
    let target_date = Number(14);


    setInterval(function () {
        Days();
    }, 1000);

    setInterval(function () {
        Hours();
    }, 1000);

    setInterval(function () {
        Minutes();
    }, 1000);

    setInterval(function () {
        Seconds();
    }, 1000);


    function Days() {
        let now = new Date();
        let date = now.getDate();
        Timmer_Days.textContent = target_date - date;
    }

    function Hours() {
        let now = new Date();
        let hour = now.getHours();
        Timmer_Hours.textContent = 24 - hour;
    }

    function Minutes() {
        let now = new Date();
        let minute = now.getMinutes();
        Timmer_Minutes.textContent = 60 - minute;
    }

    function Seconds() {
        let now = new Date();
        let second = now.getSeconds();
        Timmer_Seconds.textContent = 60 - second;
    }
}