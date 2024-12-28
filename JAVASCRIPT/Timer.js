setTimeout(function () {
    load_now();
}, 3000)

function load_now() {

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
        setInterval(function () {
            const Input_array = JSON.parse(localStorage.getItem("Input_array"));
            Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

            for (let index_of_TimerDay = 0; index_of_TimerDay < Timmer_Days.length; index_of_TimerDay++) {
                let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerDay) + 0)]);
                let input_Index = ((4 * index_of_TimerDay) + 0);
                Timer_on_Work(Input_array, Timmer_Days, OLD_TIME_value, input_Index, index_of_TimerDay);
            }
        }, 1000);
    }

    function Hours() {
        setInterval(function () {
            const Input_array = JSON.parse(localStorage.getItem("Input_array"));
            Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

            for (let index_of_TimerHour = 0; index_of_TimerHour < Timmer_Hours.length; index_of_TimerHour++) {
                let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerHour) + 1)]);
                let input_Index = ((4 * index_of_TimerHour) + 1);
                Timer_on_Work(Input_array, Timmer_Hours, OLD_TIME_value, input_Index, index_of_TimerHour);
            }
        }, 1000);
    }

    function Minutes() {
        setInterval(function () {
            const Input_array = JSON.parse(localStorage.getItem("Input_array"));
            Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

            for (let index_of_TimerMin = 0; index_of_TimerMin < Timmer_Minutes.length; index_of_TimerMin++) {
                let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerMin) + 2)]);
                let input_Index = ((4 * index_of_TimerMin) + 2);
                Timer_on_Work(Input_array, Timmer_Minutes, OLD_TIME_value, input_Index, index_of_TimerMin);
            }
        }, 1000);
    }

    function Seconds() {
        setInterval(function () {
            let Input_array = JSON.parse(localStorage.getItem("Input_array"));
            Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));
            for (let index_of_TimerSec = 0; index_of_TimerSec < Timmer_Seconds.length; index_of_TimerSec++) {
                let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerSec) + 3)]);
                let input_Index = ((4 * index_of_TimerSec) + 3);
                Timer_on_Work(Input_array, Timmer_Seconds, OLD_TIME_value, input_Index, index_of_TimerSec);
            }
        }, 1000);
    }
}


function Timer_on_Work(Input_array, Timmer_units_inputs, OLD_TIME_value, input_Index, index_of_Timer_unit) {
    let now = new Date();
    let New_Time;
    let Time;
    if ((input_Index % 4) === 0) {
        Time = "D";
        //DAY
        New_Time = now.getDate();
    }else if ((input_Index % 4) === 1) {
        Time = "H";
        //HOUR
        New_Time = now.getHours();
    }else if ((input_Index % 4) === 2) {
        Time = "M";
        //MINUTE
        New_Time = now.getMinutes();
    }else if ((input_Index % 4) === 3) {
        Time = "S";
        //SECONDS
 New_Time = now.getSeconds();
        console.log("ATUL", New_Time);
    }
    let result = (OLD_TIME_value - New_Time);
    if ((result < 0) || (result === 0)) {
        if (Time === "D") {
            result = result;
        } else if (Time === "H") {
            result = 24 + result;
        } else if (Time === "M") {
            result = 60 + result;
        } else if (Time === "S") {
            result = 60 -(-result);
        }
    }
    Timmer_units_inputs[index_of_Timer_unit].value = result;
    Input_array[input_Index] = result;
    localStorage.setItem("Input_array", JSON.stringify(Input_array));
}