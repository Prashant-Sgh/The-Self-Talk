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
            Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

            for (let index_of_TimerDay = 0; index_of_TimerDay < Timmer_Days.length; index_of_TimerDay++) {
                let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerDay) + 0)]);
                let input_Index = ((4 * index_of_TimerDay) + 0);
                Timer_on_Work(Input_array, Timmer_Days, OLD_TIME_value, input_Index, index_of_TimerDay);



            //     const inputSec = Input_array[((4 * index) + 3)];
            //     const inputMin = Input_array[((4 * index) + 2)];
            //     const inputHrs = Input_array[((4 * index) + 1)];
            //     const inputDays = Input_array[((4 * index) + 0)];
            //     Timmer_Days[index].value = inputDays;
            //     if (Input_array[((4 * index) + 0)] <= 0) {
            //         Timmer_Days[index].style.color = "red";
            //     }
            //     if (((inputHrs) === 24) && (inputMin === 59) && (inputSec === 0)) {
            //         Input_array[((4 * index) + 0)] = inputDays - 1;
            //     }
            //     localStorage.setItem("Input_array", JSON.stringify(Input_array));
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
            Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

            for (let index_of_TimerHour = 0; index_of_TimerHour < Timmer_Hours.length; index_of_TimerHour++) {
                let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerHour) + 1)]);
                let input_Index = ((4 * index_of_TimerHour) + 1);
                Timer_on_Work(Input_array, Timmer_Hours, OLD_TIME_value, input_Index, index_of_TimerHour);



                // const inputSec = Input_array[((4 * index) + 3)];
                // const inputMin = Input_array[((4 * index) + 2)];
                // const inputHrs = Input_array[((4 * index) + 1)];
                // Timmer_Hours[index].value = inputHrs;
                // if (((inputMin) === 59) && (inputSec === 0)) {
                //     Input_array[((4 * index) + 1)] = inputHrs - 1;

                //     if (Input_array[((4 * index) + 1)] < 0) {
                //         Input_array[((4 * index) + 1)] = 24;
                //     }
                // }
                // if (Input_array[((4 * index) + 1)] < 13) {
                //     Timmer_Hours[index].style.color = "#934712";
                //     Timmer_Hours[index].style.color = "purple";
                // }
                // localStorage.setItem("Input_array", JSON.stringify(Input_array));
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
            Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

            for (let index_of_TimerMin = 0; index_of_TimerMin < Timmer_Minutes.length; index_of_TimerMin++) {
                let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerMin) + 2)]);
                let input_Index = ((4 * index_of_TimerMin) + 2);
                Timer_on_Work(Input_array, Timmer_Minutes, OLD_TIME_value, input_Index, index_of_TimerMin);




                // const inputSec = Input_array[((4 * index) + 3)];
                // const inputMin = Input_array[((4 * index) + 2)];
                // Timmer_Minutes[index].value = inputMin;
                // // Input_array[((4 * index) + 3)] = inputSec - 1;
                // if ((inputSec) === 0) {
                //     Input_array[((4 * index) + 2)] = inputMin - 1;

                //     if (Input_array[((4 * index) + 2)] < 0) {
                //         Input_array[((4 * index) + 2)] = 59;
                //     }
                // }
                // localStorage.setItem("Input_array", JSON.stringify(Input_array));
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

                // const inputSec = Input_array[((4 * index) + 3)];
                // [index].value = inputSec;
                // Input_array[((4 * index) + 3)] = inputSec - 1;
                // if ((Input_array[((4 * index) + 3)]) < 0) {
                //     Input_array[((4 * index) + 3)] = 59;
                // }
                // localStorage.setItem("Input_array", JSON.stringify(Input_array));
            }
        }, 1000);
    }
}








function Timer_on_Work(Input_array, Timmer_units_inputs, OLD_TIME_value, input_Index, index_of_Timer_unit) {
    let now = new Date();
    let New_Time;
    let Time;
    // console.log("input_Index", input_Index);
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
        // console.log("ATUL");
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
    // console.log("Atul Singh RESULT is: ", New_Time, typeof(New_Time), "OLD_TIME_value: ", (OLD_TIME_value  - New_Time));
    Timmer_units_inputs[index_of_Timer_unit].value = result;
    Input_array[input_Index] = result;
    localStorage.setItem("Input_array", JSON.stringify(Input_array));
}