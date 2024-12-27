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

    const Input_array = JSON.parse(localStorage.getItem("Input_array"));


    let target_date = Number(17);

    // setInterval(function () {
    //     Days();
    // }, 1000);

    // setInterval(function () {
    //     Hours();
    // }, 1000);

    // setInterval(function () {
    //     Minutes();
    // }, 1000);

    // setInterval(function () {
    //     Seconds();
    // }, 1000);

    Seconds();

    Minutes();

    Hours();

    Days();



    function Days() {
        // let now = new Date();
        // let date = now.getDate();
        // Timmer_Days.forEach(Timmer_Day => {
        //     Timmer_Day.textContent = target_date - date;
        // });

        setInterval(function () {
            const Input_array = JSON.parse(localStorage.getItem("Input_array"));
            for (let index = 0; index < Timmer_Hours.length; index++) {
                const inputSec = Input_array[((4 * index) + 3)];
                const inputMin = Input_array[((4 * index) + 2)];
                const inputHrs = Input_array[((4 * index) + 1)];
                const inputDays = Input_array[((4 * index) + 0)];
                Timmer_Days[index].value = inputDays;
                if(((inputHrs) === 24) && (inputMin === 59) && (inputSec === 0)) {
                    Input_array[((4 * index) + 0)] = inputDays - 1;
                    // if (Input_array[((4 * index) + 1)] < 0) {
                    //     Input_array[((4 * index) + 1)] = 24;
                    // change color to red to represent you are taking too long for this task.
                    // }
                }
                localStorage.setItem("Input_array", JSON.stringify(Input_array));
            }
        }, 1000);
    }

    function Hours() {
        // let now = new Date();
        // let hour = now.getHours();
        // let count = 0;
        // Timmer_Hours.forEach(Timmer_Hour => {
        //     let Input_hour = Number(Input_array[(4 * count) + 1]);
        //     // let input_hour = Timmer_Hour.value.trim();
        //     let min = 60 - now.getMinutes();
        //     Timmer_Hour.value = Input_hour - 1;
        //     count++;
        // });

        setInterval(function () {
            const Input_array = JSON.parse(localStorage.getItem("Input_array"));
            for (let index = 0; index < Timmer_Hours.length; index++) {
                const inputSec = Input_array[((4 * index) + 3)];
                const inputMin = Input_array[((4 * index) + 2)];
                const inputHrs = Input_array[((4 * index) + 1)];
                Timmer_Hours[index].value = inputHrs;
                if(((inputMin) === 59) && (inputSec === 0)) {
                    Input_array[((4 * index) + 1)] = inputHrs - 1;

                    if (Input_array[((4 * index) + 1)] < 0) {
                        Input_array[((4 * index) + 1)] = 24;
                    }
                }
                localStorage.setItem("Input_array", JSON.stringify(Input_array));
            }
        }, 1000);
    }

    function Minutes() {
        // let now = new Date();
        // let minute = now.getMinutes();
        // Timmer_Minutes.forEach(Timmer_Minute => {
        //     Timmer_Minute.textContent = 60 - minute;
        // });

        setInterval(function () {
            const Input_array = JSON.parse(localStorage.getItem("Input_array"));
            for (let index = 0; index < Timmer_Minutes.length; index++) {
                const inputSec = Input_array[((4 * index) + 3)];
                const inputMin = Input_array[((4 * index) + 2)];
                Timmer_Minutes[index].value = inputMin;
                // Input_array[((4 * index) + 3)] = inputSec - 1;
                if((inputSec) === 0) {
                    Input_array[((4 * index) + 2)] = inputMin - 1;

                    if (Input_array[((4 * index) + 2)] < 0) {
                        Input_array[((4 * index) + 2)] = 59;
                    }
                }
                localStorage.setItem("Input_array", JSON.stringify(Input_array));
            }
        }, 1000);
    }

    function Seconds() {
        // let count = 0;
        // let Input_second = Number(Input_array[(4 * count) + 3]);
        setInterval(function () {
            // let now = new Date();
            // let second = now.getSeconds();
            const Input_array = JSON.parse(localStorage.getItem("Input_array"));
            for (let index = 0; index < Timmer_Seconds.length; index++) {
                const inputSec = Input_array[((4 * index) + 3)];
                Timmer_Seconds[index].value = inputSec;
                Input_array[((4 * index) + 3)] = inputSec - 1;
                if((Input_array[((4 * index) + 3)]) < 0) {
                    Input_array[((4 * index) + 3)] = 59;
                }
                localStorage.setItem("Input_array", JSON.stringify(Input_array));
            }
        }, 1000);
    }
}