fetch('Chat_background.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('Chat_background').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
    });



// fetch('Chat_box.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('Chat_box').innerHTML = data;
//         ClockWorkingFunction();
//     })
//     .catch(error => {
//         console.error('Error loading Chat_box.html:', error);
//     });




fetch('Side_menu_container.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('Side_menu_container').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading Side_menu_container.html:', error);
    });




fetch('clock.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('clock_container').innerHTML = data;
        ClockWorkingFunction();
    })
    .catch(error => {
        console.error('Error loading clock.html:', error);
    });


// //////////////////////////////////////////////////////////////////

function content_loaded() {
    setTimeout(function run() {
        console.log('DATA FETCHED');
        Ready_to_load()
        // Scroll the chats to top
        // setInterval(function scroll_chat() {
        //     let chatBox = document.getElementById('Chat_box');
        //     chatBox.scrollTop = chatBox.scrollHeight;
        // },2000)
        // ClockWorkingFunction()

    }, 2000)
}

// window.onload = ClockWorkingFunction();


content_loaded()



function Ready_to_load() {


    //Load notes from local Storage
    if (localStorage.getItem("Notes_HTML") && localStorage.getItem("Input_array")) {
        (document.getElementById('Notes_container')).innerHTML = JSON.parse(localStorage.getItem("Notes_HTML"));
        const inputs = document.querySelectorAll('#Notes_container input');
        const input_array_from_localstorage = JSON.parse(localStorage.getItem("Input_array"));
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].value = input_array_from_localstorage[index];
            // inputs.disabled = false;
            // inputs[index].value = 23;           
        }
    }


    // const Menu_button = document.getElementById('Menu_button');

    document.addEventListener('click', function (event) {
        const ID = event.target.id;
        if (ID === 'Menu_button') {
            console.log("You clicked Menu_button");
            const Menu_content = document.getElementById('Menu_content');
            Menu_content.classList.toggle('show');
        }
        else if (ID === 'Add_a_new_note') {
            Add_A_New_Note();
            Update_notes();
        }
        else if (event.target.classList.contains('Edit_button')) {
            //MAKES THE CONTENT EDITABLE.
            const Notes_container = event.target.closest('.Notes_container');
            const Editables = Notes_container.querySelectorAll('.Editable');
            const inputs = Notes_container.querySelectorAll('input');
            Make_These_Editable(Editables, inputs);
        }
        else if (event.target.classList.contains('Delete_note')) {
            const Notes_container = event.target.closest('.Notes_container');
            Delete_Popup(Notes_container);
            function Delete_Popup(Notes_container) {
                const Delete_Popup_Window = document.getElementById('Delete_window');
                Delete_Popup_Window.style.display = 'flex';
                document.addEventListener('click', function (source) {
                    if (source.target.id === 'Yes_Delete_Note') {
                        Notes_container.remove();
                        console.log("Notes Being deleted!");
                        Update_notes();
                        Delete_Popup_Window.style.display = 'none';
                    }
                    else if (source.target.id === 'Cancel_Delete_Note') {
                        Delete_Popup_Window.style.display = 'none';
                    }
                })
            }
        }
        else if (ID === 'Option_button') {
            console.log("You clicked Options");
            const Options = document.getElementById('Options');
            Options.classList.toggle('show');
        }
        else if (event.target.classList.contains('Editable') === false) {
            console.log('You just clicked on "Editable"');
            //Saves the note and update them on local storage..
            Save_and_Update_Notes();
        }
    })


    const Send_button = document.getElementById('Send_button');
    let Chat_HTML = JSON.parse(localStorage.getItem('Chat_HTML'));
    const Chat_box = document.getElementById('Chat_box');
    if (Chat_HTML) {
        Chat_box.innerHTML = Chat_HTML;

        const Day_div = document.querySelectorAll('.Day');

        const now = new Date();
        const date = String(now.getDate());
        const month = String(now.getMonth());
        const year = String(now.getFullYear());

        const Today = (`${date}th, ${month} ${year}`);
        const Yesterday = (`${(Number(date) - 1)}th, ${month} ${year}`);

        for (let Day = 0; Day < Day_div.length; Day++) {
            let element = Day_div[Day];
            let ID = element.id;
            if (ID === Today) {
                element.textContent = "Today";
            } else if (ID === Yesterday) {
                element.textContent = "Yesterday";
            }
            else {
                element.textContent = ID;
            }
        }
    }

    Send_button.addEventListener('click', function () { Send_message() });

    function Send_message() {
        console.log('You just clicked send....');

        console.log((new Date()).getDate(), (new Date()).getMonth());
        let contain_date = false;

        const noww = new Date();
        const date = String(noww.getDate());
        const month = String(noww.getMonth());
        const year = String(noww.getFullYear());

        const Today = (`${date}th, ${month} ${year}`);

        for (let child = 0; child < (Chat_box.children).length; child++) {
            const element = (Chat_box.children)[child];
            if (element.id === Today) {
                contain_date = true;
            }
        }
        if (contain_date === false) {
            const now = new Date();
            const date = String(now.getDate());
            const month = String(now.getMonth());
            const year = String(now.getFullYear());

            const Day_div = document.createElement('div');
            Day_div.classList.add('Day');
            Day_div.textContent = 'Today';
            Day_div.id = `${date}th, ${month} ${year}`;
            Chat_box.appendChild(Day_div);
        }


        let textbox = document.getElementById('Message_texts').value;
        let message = Message_texts.value.trim();
        Message_texts.value = "";
        // Messages_array.push(message);
        // localStorage.setItem("History", JSON.stringify(Messages_array));
        // console.log("message", Messages_array);
        const row_div = document.createElement('div');
        row_div.classList.add('row');
        const message_div = document.createElement('div');
        message_div.classList.add('message');
        // message_div.textContent = message;
        row_div.appendChild(message_div);
        message_div.innerHTML = textbox.replace(/\n/g, "<br>");
        let chatBox = document.getElementById('Chat_box');
        chatBox.scrollTop = chatBox.scrollHeight;



        // For TIME
        const now = new Date();
        const hour = ((now.getHours()) % 12).toString().padStart(2, '0');
        const minute = (now.getMinutes()).toString().padStart(2, '0');
        const am_pm = now.getHours() >= 12 ? "pm" : "am";
        const time = `${hour}:${minute} ${am_pm}`
        const time_div = document.createElement('div');
        time_div.classList.add('time');
        time_div.textContent = time;
        row_div.appendChild(time_div);
        Chat_box.appendChild(row_div);

        // UPDATING CHAT IN LOCAL STORAGE AT THE END OF "SEND" FUNCTION
        let Chat_HTML = Chat_box.innerHTML;
        localStorage.setItem("Chat_HTML", JSON.stringify(Chat_HTML));
    }

    // handleng the keys 

    const textbox = document.getElementById('Message_texts');
    textbox.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            console.log("You presed enter");
            if (e.shiftKey) {
                e.preventDefault();
                console.log("You presed SHIFTT ! ! ! !");
                Send_message();
            }
        }
    })

    //Make_These_Editable(Editables)


    let Timer_decleared_time = [];

    if (localStorage.getItem("Timer_decleared_time")) {
        Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));
        console.log("Timer_decleared_time EXISTS");
    }
    // else if (!(localStorage.getItem("Timer_decleared_time"))) {
    // let Timer_decleared_time = [];
    // console.log("Timer_decleared_time DON'T EXISTS", Timer_decleared_time);
    // }
    // console.log("Timer_decleared_time::--", Timer_decleared_time);

    function Make_These_Editable(Editables, inputss) {
        let now = new Date();

        for (let elements = 0; elements < inputss.length; elements++) {
            const element = inputss[elements];
            element.disabled = false;
        }

        for (let elements = 0; elements < Editables.length; elements++) {
            const element = Editables[elements];
            const Is_Editable = element.getAttribute('contenteditable') === 'true';
            element.setAttribute('contenteditable', !Is_Editable);
        }

        Editables[0].focus();
        Editables.forEach((div, index, Editables) => {
            div.addEventListener('keydown', function (e) {
                if (e.shiftKey && e.key === 'Enter') {
                    e.preventDefault();
                    const next_div = Editables[index + 1];
                    if (next_div) {
                        next_div.focus();
                    } else if (!next_div) {
                        inputss[0].focus();
                        inputss.forEach((input, index, inputss) => {
                            input.addEventListener('keydown', function (e) {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const next_input = inputss[index + 1];
                                    if (next_input) {
                                        next_input.focus();
                                        if (inputss[index].value.trim() === '') {
                                            inputss[index].value = 1;
                                        }
                                        if (index === 0) {
                                            Timer_decleared_time.push(now.getDate());
                                        } else if (index === 1) {
                                            Timer_decleared_time.push(now.getHours());
                                        } else if (index === 2) {
                                            Timer_decleared_time.push(now.getMinutes());
                                        }
                                    }
                                    else if (!next_input) {
                                        if (inputss[index].value.trim() === '') {
                                            inputss[index].value = 11;
                                        }

                                        Timer_decleared_time.push(now.getSeconds());
                                        // if (index === 3) {
                                        // } 

                                        // Timer_decleared_time.push(inputss[index].value);
                                        // Timer_decleared_time.push(now.getMinutes());
                                        Save_and_Update_Notes();
                                    }
                                    // Timer_decleared_time.push(now.getMinutes());
                                    // Timer_decleared_time.push(inputss[index].value);

                                }
                            })
                        })
                    }
                }
            })
        });
    }


    function Save_and_Update_Notes() {
        const Editables = document.querySelectorAll('.Editable');
        for (let elements = 0; elements < Editables.length; elements++) {
            const element = Editables[elements];
            // const Is_Editable = element.getAttribute('contenteditable') === 'true';
            // element.setAttribute('contenteditable', !Is_Editable);
            element.setAttribute('contenteditable', false);
        }

        const Notes_container = document.getElementById('Notes_container');
        const inputs = Notes_container.querySelectorAll('input');
        for (let elements = 0; elements < inputs.length; elements++) {
            const element = inputs[elements];
            // const Is_disabled = element.getAttribute('disabled') === 'true';
            // element.value = 43;
            element.disabled = true;
        }

        Input_digits_size();

        Update_notes();
    }


    // CLEAR CHAT

    Option_clear_chat_button.addEventListener('click', function () {
        localStorage.removeItem('Chat_HTML');
        // localStorage.removeItem('History');
        // localStorage.removeItem('History_Times');
        Chat_box.innerHTML = "";
        Messages_array.length = 0;
        Time_array.length = 0;
        console.log("Chat cleared");
    });




    // ADD A NEW NOTE
    function Add_A_New_Note() {
        // <div id="Notes_container">
        //     <div class="Notes_container">
        //         <div class="Notes_heading">Build timer</div>
        //         <button class="Save_button"><img class="Save_icon" src="/ASSETS/check.svg" alt=""></button>
        //         <div class="Timmer">
        //             <div class="Timmer_Day">0</div>
        //             <div class="Timmer_Hour">0</div>
        //             <div class="Timmer_Minute">0</div>
        //             <div class="Timmer_Second">0</div>
        //         </div>
        //         <div class="Notes_text">
        //             <ul>
        //                 <li>Build this timer.</li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>
        const Notes_container = document.getElementById('Notes_container');
        const Notes_container_div = document.createElement('div');
        Notes_container_div.classList.add('Notes_container');
        Notes_container.appendChild(Notes_container_div);

        const Notes_heading_div = document.createElement('div');
        Notes_heading_div.classList.add('Notes_heading', 'Editable');
        Notes_heading_div.textContent = "Heading here";
        Notes_container_div.appendChild(Notes_heading_div);

        const Delete_button = document.createElement('button');
        Delete_button.classList.add('Delete_note');
        Notes_container_div.appendChild(Delete_button);

        const Edit_button = document.createElement('button');
        Edit_button.classList.add('Edit_button');
        // const Edit_icon = document.createElement('img');
        // Edit_icon.classList.add('Edit_icon');
        // Edit_icon.setAttribute('src', '/ASSETS/pencil.svg');
        // Edit_button.appendChild(Edit_icon);
        // const Save_icon = document.createElement('img');
        // Save_icon.classList.add('Save_icon');
        // Save_icon.setAttribute('src', '/ASSETS/tick.svg');
        // Edit_button.appendChild(Save_icon);
        // Notes_container_div.appendChild(Save_button);
        Notes_container_div.appendChild(Edit_button);

        const Notes_Timmer_div = document.createElement('div');
        Notes_Timmer_div.classList.add('Timmer');
        Notes_container_div.appendChild(Notes_Timmer_div);

        // const Timmer_Day_div = document.createElement('div');
        const Timer_days_input = document.createElement('input');
        // Timer_days_input.setAttribute("type", 'number');
        Timer_days_input.type = 'number';
        Timer_days_input.placeholder = 'dd';
        Timer_days_input.maxLength = 2;
        Timer_days_input.disabled = false;
        Timer_days_input.classList.add('Timer_days_input', 'Timer_input');
        // Timmer_Day_div.classList.add('Timmer_Day', 'Editable');
        // Timmer_Day_div.textContent = "1";

        // const Timmer_Hour_div = document.createElement('div');
        const Timer_hours_input = document.createElement('input');
        // Timer_hours_input.setAttribute("type", 'number');
        Timer_hours_input.type = 'number';
        Timer_hours_input.placeholder = 'hh';
        Timer_hours_input.maxLength = 2;
        Timer_hours_input.disabled = false;
        Timer_hours_input.classList.add('Timer_hours_input', 'Timer_input');
        // Timer_hours_input.setAttribute('maxlength', '2');
        // Timmer_Hour_div.classList.add('Timmer_Hour', 'Editable');
        // Timmer_Hour_div.textContent = "0";

        // const Timmer_Minute_div = document.createElement('div');
        const Timer_minutes_input = document.createElement('input');
        // Timer_minutes_input.setAttribute("type", 'number');
        Timer_minutes_input.type = 'number';
        Timer_minutes_input.placeholder = 'mm';
        Timer_minutes_input.maxLength = 2;
        Timer_minutes_input.disabled = false;
        Timer_minutes_input.classList.add('Timer_minutes_input', 'Timer_input');
        // Timmer_Minute_div.classList.add('Timmer_Minute', 'Editable');
        // Timmer_Minute_div.textContent = "0";

        // const Timmer_Second_div = document.createElement('div');
        const Timer_seconds_input = document.createElement('input');
        Timer_seconds_input.type = 'number';
        // Timer_seconds_input.disabled = 'false';
        Timer_seconds_input.placeholder = 'ss';
        Timer_seconds_input.maxLength = 2;
        Timer_seconds_input.disabled = false;
        // Timer_seconds_input.value = 541562;
        // Timer_seconds_input.setAttribute("type", 'number');
        Timer_seconds_input.classList.add('Timer_seconds_input', 'Timer_input');
        // Timmer_Second_div.classList.add('Timmer_Second', 'Editable');
        // Timmer_Second_div.textContent = "0";

        Notes_Timmer_div.appendChild(Timer_days_input);
        Notes_Timmer_div.appendChild(Timer_hours_input);
        Notes_Timmer_div.appendChild(Timer_minutes_input);
        Notes_Timmer_div.appendChild(Timer_seconds_input);

        const Timer_inputs = Notes_Timmer_div.querySelectorAll('.Timmer input');
        Input_digits_size();

        // Listen_timer_input(Timer_inputs);        

        // Timer_inputs.forEach(function (inputs) {
        //     inputs.addEventListener('input', function () {
        //         if (inputs.value.length > 2) {
        //             console.log("Limit is set to 2");
        //             inputs.value = inputs.value.slice(0, 2);
        //         }
        //     })
        // })

        // .addEventListener('input', function () {
        //     if (Timer_inputs[0].value.length > 2) {
        //         console.log("Limit is set to 2");
        //     }
        // })


        // if (input.value === "" || isNaN(input.value)) {
        //     input.value = 100;
        // } else if (input.value) {
        //     input.value = 911;
        // }


        // Notes_Timmer_div.appendChild(Timmer_Day_div);
        // Notes_Timmer_div.appendChild(Timmer_Hour_div);
        // Notes_Timmer_div.appendChild(Timmer_Minute_div);
        // Notes_Timmer_div.appendChild(Timmer_Second_div);

        const Notes_text_div = document.createElement('div');
        Notes_text_div.classList.add('Notes_text', 'Editable');
        const ul = document.createElement('ul');
        Notes_text_div.appendChild(ul);
        // const paragraph = document.createElement('p');
        const List_paragraph = document.createElement('li');
        // ul.appendChild(paragraph);
        ul.appendChild(List_paragraph);

        Notes_container_div.appendChild(Notes_text_div);


        Make_Only_Last_Note_Editable();

    }

    function Input_digits_size() {
        const Timer_inputs = document.querySelectorAll('.Timmer input');
        Timer_inputs.forEach(function (inputs) {
            inputs.addEventListener('input', function () {
                if (inputs.value.length > 2) {
                    console.log("Limit is set to 2");
                    inputs.value = inputs.value.slice(0, 2);
                }
            })
        })
    }

    // function Listen_timer_input(Timer_inputs) {
    //     Timer_inputs.forEach((function (input) {
    //         input.addEventListener('input', function () {
    //             // let value = 911;
    //             if (input.value === "" || isNaN(input.value)) {
    //                 input.value = 100;
    //             } else if (input.value.trim() === 3) {
    //                 input.value = 933;
    //             }
    //             else if (Enter_key(input)) {
    //                 console.log('QQQQQQQQQ     SSSSSS  DDDDDD');
    //             }
    //             // Enter_key(input);
    //             console.log("911");
    //         })
    //     }))
    // }

    function Enter_key(input) {
        console.log("E56912654bhugyrttttttttttt");
        input.addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
                console.log("Enter key is pressed");
                return true;
            }
            else {
                console.log("Enter key is NOT pressed");
                return false;
            }
        })
    }

    function Make_Only_Last_Note_Editable() {
        const Notes_container = document.querySelectorAll('.Notes_container');
        const Notes_container_Length = Notes_container.length;
        const Editables = Notes_container[Notes_container_Length - 1].querySelectorAll('.Editable');
        const inputs = Notes_container[Notes_container_Length - 1].querySelectorAll('.Timer_input');
        Make_These_Editable(Editables, inputs);
    }



    //REMEMBER NOTES
    // Update_notes()
    function Update_notes() {
        const Notes_container_box = document.getElementById('Notes_container');
        const Notes = Notes_container_box.innerHTML;
        localStorage.setItem("Notes_HTML", JSON.stringify(Notes));
        const inputs = Notes_container_box.querySelectorAll('input');
        const inputs_length = inputs.length;
        let input_contents = [];
        for (let index = 0; index < inputs_length; index++) {
            const input_data = inputs[index].value;
            input_contents.push(input_data);
        }
        localStorage.setItem("Input_array", JSON.stringify(input_contents));
        localStorage.setItem("Timer_decleared_time", JSON.stringify(Timer_decleared_time));
        // console.log("Hello Buddy", input_contents);

    }
}

function ClockWorkingFunction() {

    // Function to update the analog clock based on current time
    function updateClock() {

        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');

        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Calculate the degree of rotation for each hand
        const hourDeg = (360 / 12) * (hours % 12 + minutes / 60); // Hour hand rotation
        const minuteDeg = (360 / 60) * minutes;  // Minute hand rotation
        const secondDeg = (360 / 60) * seconds;  // Second hand rotation

        // Apply rotations to the hands
        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    }

    // Call updateClock every second to reflect real-time updates
    setInterval(updateClock, 1000);

    // Initial clock setup
    // window.onload = updateClock();

}