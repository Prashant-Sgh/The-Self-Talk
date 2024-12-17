setTimeout(function () {
    load_now();
}, 3000)

function load_now() {

    const Timmer_Days = document.querySelectorAll('.Timmer_Day');
    const Timmer_Hours = document.querySelectorAll('.Timmer_Hour');
    const Timmer_Minutes = document.querySelectorAll('.Timmer_Minute');
    const Timmer_Seconds = document.querySelectorAll('.Timmer_Second');
    let target_date = Number(17);

    // const Days_in_Timmer = document.querySelector('.Timmer_Day').textContent;


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
        Timmer_Days.forEach(Timmer_Day => {
            Timmer_Day.textContent = target_date - date;
        });
        // Timmer_Days.textContent = Number(Days_in_Timmer) ;
        // Timmer_Days.textContent = (Number(Days_in_Timmer) + date) - date;
    }

    function Hours() {
        let now = new Date();
        let hour = now.getHours();
        Timmer_Hours.forEach(Timmer_Hour => {
            Timmer_Hour.textContent = 24 - hour;
        });
    }

    function Minutes() {
        let now = new Date();
        let minute = now.getMinutes();
        Timmer_Minutes.forEach(Timmer_Minute => {
            Timmer_Minute.textContent = 60 - minute;
        });
    }

    function Seconds() {
        let now = new Date();
        let second = now.getSeconds();
        Timmer_Seconds.forEach(Timmer_Second => {
            Timmer_Second.textContent = 60 - second;
        });
    }
}