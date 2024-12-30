// setTimeout(function () {
//     load_now();
// }, 3000)

// function load_now() {

//     const Timmer_Days = document.querySelectorAll('.Timer_days_input');
//     const Timmer_Hours = document.querySelectorAll('.Timer_hours_input');
//     const Timmer_Minutes = document.querySelectorAll('.Timer_minutes_input');
//     const Timmer_Seconds = document.querySelectorAll('.Timer_seconds_input');

//     // const Input_array = JSON.parse(localStorage.getItem("Input_array"));


//     // let target_date = Number(17);

//     // setInterval(function () {
//     //     Days();
//     // }, 1000);

//     // setInterval(function () {
//     //     Hours();
//     // }, 1000);

//     // setInterval(function () {
//     //     Minutes();
//     // }, 1000);

//     // setInterval(function () {
//     //     Seconds();
//     // }, 1000);

//     Seconds();

//     Minutes();

//     Hours();

//     Days();



//     function Days() {
//         setInterval(function () {
//             const Input_array = JSON.parse(localStorage.getItem("Input_array"));
//             Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

//             for (let index_of_TimerDay = 0; index_of_TimerDay < Timmer_Days.length; index_of_TimerDay++) {
//                 let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerDay) + 0)]);
//                 let input_Index = ((4 * index_of_TimerDay) + 0);
//                 Timer_on_Work(Input_array, Timmer_Days, OLD_TIME_value, input_Index, index_of_TimerDay);
//             }
//         }, 1000);
//     }

//     function Hours() {
//         setInterval(function () {
//             const Input_array = JSON.parse(localStorage.getItem("Input_array"));
//             Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

//             for (let index_of_TimerHour = 0; index_of_TimerHour < Timmer_Hours.length; index_of_TimerHour++) {
//                 let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerHour) + 1)]);
//                 let input_Index = ((4 * index_of_TimerHour) + 1);
//                 Timer_on_Work(Input_array, Timmer_Hours, OLD_TIME_value, input_Index, index_of_TimerHour);
//             }
//         }, 1000);
//     }

//     function Minutes() {
//         setInterval(function () {
//             const Input_array = JSON.parse(localStorage.getItem("Input_array"));
//             Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));

//             for (let index_of_TimerMin = 0; index_of_TimerMin < Timmer_Minutes.length; index_of_TimerMin++) {
//                 let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerMin) + 2)]);
//                 let input_Index = ((4 * index_of_TimerMin) + 2);
//                 Timer_on_Work(Input_array, Timmer_Minutes, OLD_TIME_value, input_Index, index_of_TimerMin);
//             }
//         }, 1000);
//     }

//     function Seconds() {
//         setInterval(function () {
//             let Input_array = JSON.parse(localStorage.getItem("Input_array"));
//             Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));
//             for (let index_of_TimerSec = 0; index_of_TimerSec < Timmer_Seconds.length; index_of_TimerSec++) {
//                 let OLD_TIME_value = (Timer_decleared_time[((4 * index_of_TimerSec) + 3)]);
//                 let input_Index = ((4 * index_of_TimerSec) + 3);
//                 Timer_on_Work(Input_array, Timmer_Seconds, OLD_TIME_value, input_Index, index_of_TimerSec);
//             }
//         }, 1000);
//     }
// }


















// function Timer_on_Work(Input_array, Timmer_units_inputs, OLD_TIME_value, input_Index, index_of_Timer_unit) {
//     let now = new Date();
//     let New_Time;
//     let Time;
//     if ((input_Index % 4) === 0) {
//         Time = "D";
//         //DAY
//         New_Time = now.getDate();
//     } else if ((input_Index % 4) === 1) {
//         Time = "H";
//         //HOUR
//         New_Time = now.getHours();
//     } else if ((input_Index % 4) === 2) {
//         Time = "M";
//         //MINUTE
//         New_Time = now.getMinutes();
//     } else if ((input_Index % 4) === 3) {
//         Time = "S";
//         //SECONDS
//         New_Time = now.getSeconds();
//     }
//     let difference = (OLD_TIME_value - New_Time);
//     let result;
//     if (difference < 0) {
//         result = Input_array[input_Index] -(-difference);
//     }else if (difference >= 0) {
//         result = Input_array[input_Index] -difference;
//     }
//     // if ((result < 0) || (result === 0)) {
//     // if ((result < 0)) {
//     //     if (Time === "D") {
//     //         result = result;
//     //     } else if (Time === "H") {
//     //         result = 24 + difference;
//     //     } else if (Time === "M") {
//     //         result = 60 + result;
//     //     } else if (Time === "S") {
//     //         result = 60 - (-result);
//     //     }
//     // }

//     if ((result < 0)) {
//         if (Time === "D") {
//             result = result;
//         } else if ((Time === "H") && (result < (-24))) {
//             result = -1;
//         } else if ((Time === "M") && (result < (-59))) {
//             result = -1;
//         } else if (Time === "S") {
//             result = 60 - (-result);
//         }
//     }

//     // difference = Input_array[input_Index] - difference;

//     // Timmer_units_inputs[index_of_Timer_unit].value = Input_array[input_Index] - (-difference);

//     // if (difference < 0) {
//     //     Timmer_units_inputs[index_of_Timer_unit].value = Input_array[input_Index] -(-difference);
//     // } else if (difference >= 0) {
//     //     Timmer_units_inputs[index_of_Timer_unit].value = Input_array[input_Index] - difference;
//     // }
//         Timmer_units_inputs[index_of_Timer_unit].value = result;



//     // Input_array[input_Index] = difference;
//     // localStorage.setItem("Input_array", JSON.stringify(Input_array));
// }












setTimeout(function () {
    // Update_Notes();
    setInterval(function () {

        if ((localStorage.getItem('Input_array')) && (localStorage.getItem('Timer_decleared_time'))) {
            let Input_array = JSON.parse(localStorage.getItem('Input_array'));
            let Timer_decleared_time = JSON.parse(localStorage.getItem('Timer_decleared_time'));
            const ALL_INPUTS_array = document.querySelectorAll('#Notes_container input');
            if ((Input_array.length === Timer_decleared_time.length) && !(Timer_decleared_time.length === 0) && (ALL_INPUTS_array.length === Timer_decleared_time.length)) {
                Update_Notes_Timer()
            }
        }
    }, 1000)
}, 3000)


function Update_Notes_Timer() {
    const ALL_INPUTS_array = document.querySelectorAll('#Notes_container input');
    for (let the_index = 0; the_index < ALL_INPUTS_array.length; the_index++) {
        let input_element = ALL_INPUTS_array[the_index];
        Bring_The_Timers(input_element, the_index);
    }
}














function Bring_The_Timers(input_element, the_index) {
    let Input_array = JSON.parse(localStorage.getItem('Input_array'));
    let Timer_decleared_time = JSON.parse(localStorage.getItem('Timer_decleared_time'));
    let Old_Time = Timer_decleared_time[the_index];
    let Given_Quota = Input_array[the_index];
    let now = new Date();
    let New_Time;
    let Unit;
    if ((the_index % 4) === 0) {
        New_Time = now.getDate();
        Unit = "Day";
    }
    else if ((the_index % 4) === 1) {
        New_Time = now.getHours();
        Unit = "Hour";
    }
    else if ((the_index % 4) === 2) {
        New_Time = now.getMinutes();
        Unit = "Minute";
    }
    else if ((the_index % 4) === 3) {
        New_Time = now.getSeconds();
        Unit = "Second";
    }


    let difference;
    if (Old_Time < New_Time) {
        difference = New_Time - Old_Time;
    }else if (Old_Time === New_Time) {
        difference = 0;
    }
    else if (Old_Time > New_Time) {
        // difference = 59 - Old_Time + New_Time;

        if (Unit === "Day") {
            difference = New_Time - Old_Time;
        }
        else if (Unit === "Hour") {
            difference = 24 - Old_Time + New_Time;
        }
        else if (Unit === "Minute") {
            difference = 60 - Old_Time + New_Time;
        }
        else if (Unit === "Second") {
            difference = 60 - Old_Time + New_Time;
        }
    }


    let Answer = Given_Quota - difference;
    if (Answer < 0) {
        // Answer = 59 - Answer;

        if (Unit === "Day") {
            Answer = Answer;
        }
        else if (Unit === "Hour") {
            Answer = 25 + Answer;
        }
        else if (Unit === "Minute") {
            Answer = 60 + Answer;
        }
        else if (Unit === "Second") {
            Answer = 60 + Answer;
        }
    }

    // console.log("Given Quota:  >", Given_Quota, "Difference:  >", difference, "Answer:  >", Answer);

    input_element.value = Answer;
}