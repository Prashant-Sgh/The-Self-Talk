setTimeout(function () {
    load_now();
}, 3000)

function load_now() {

    // const Timmer_Days = document.querySelectorAll('.Timmer_Day');
    // const Timmer_Hours = document.querySelectorAll('.Timmer_Hour');
    // const Timmer_Minutes = document.querySelectorAll('.Timmer_Minute');
    // const Timmer_Seconds = document.querySelectorAll('.Timmer_Second');
    const Timmer_Days = document.querySelectorAll('.Timer_days_input');
    const Timmer_Hours = document.querySelectorAll('.Timer_hours_input');
    const Timmer_Minutes = document.querySelectorAll('.Timer_minutes_input');
    const Timmer_Seconds = document.querySelectorAll('.Timer_seconds_input');
    let target_date = Number(17);

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
    }

    function Hours() {
        let now = new Date();
        let hour = now.getHours();
        Timmer_Hours.forEach(Timmer_Hour => {
            // let input_hour = Timmer_Hour.value.trim();
            Timmer_Hour.value = input_hour - hour;
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