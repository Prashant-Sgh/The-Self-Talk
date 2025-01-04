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
        fetchClock();
    })
    .catch(error => {
        console.error('Error loading Side_menu_container.html:', error);
    });


function fetchClock() {
    fetch('clock.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('clock_container').innerHTML = data;
            ClockWorkingFunction();
        })
        .catch(error => {
            console.error('Error loading clock.html:', error);
        });
}

// fetch('clock.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('clock_container').innerHTML = data;
//         ClockWorkingFunction();
//     })
//     .catch(error => {
//         console.error('Error loading clock.html:', error);
//     });


// //////////////////////////////////////////////////////////////////

function content_loaded() {
    setTimeout(function run() {
        console.log('DATA FETCHED');
        Ready_to_load()
        // Scroll the chats to top
        setInterval(function scroll_chat() {
            let chatBox = document.getElementById('Chat_box');
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 2000)

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
        }
    }

    document.addEventListener('click', function (event) {
        const ID = event.target.id;
        if (ID === 'Menu_button') {
            console.log("You clicked Menu_button");
            const Menu_content = document.getElementById('Menu_content');
            Menu_content.classList.toggle('show');
        }
        else if (ID === 'View_Side_Container') {
            if (document.getElementById('Side_menu_container').style.display === 'none') {
                document.getElementById('Side_menu_container').style.display = 'flex';
            }
        else if (!(document.getElementById('Side_menu_container').style.display === 'none')) {
            document.addEventListener('click', function (touch) {
                if (touch.target.id === 'Chat_background' || touch.target.id === 'Chat_box' || touch.target.id === 'background' ||  'Message_input_box') {
                    document.getElementById('Side_menu_container').style.display = 'none';
                }
            }, { once: true })
        }
        }


        // else if (document.getElementById('Side_menu_container').style.display === 'flex') {
        //     document.addEventListener('click', function (touch) {
        //         if (touch.target.id === 'Chat_background' || 'Chat_box' || 'background' || 'Message_input_box') {
        //             document.getElementById('Side_menu_container').style.display = 'none';
        //         }
        //     }, { once: true })
        // }

        else if (ID === 'Add_a_new_note') {
            Add_A_New_Note();
            // Update_notes();
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
            console.log("Delete button CLICKED.");

        }
        else if (ID === 'Option_button') {
            console.log("You clicked Options");
            const Options = document.getElementById('Options');
            Options.classList.toggle('show');
        }
        else if ((event.target.classList.contains('Editable') === false) && !(event.target.id === "Yes_Delete_Note")) {
            // console.log('You just clicked on "Editable"');
            console.log('Notes SAVED');
            Save_and_Update_Notes();
        }
    })

    function Delete_Popup(Notes_container) {
        const Delete_Popup_Window = document.getElementById('Delete_window');
        Delete_Popup_Window.style.display = 'flex';
        let count = 0;
        console.log("START COUNT:----", count);
        document.addEventListener('click', function (source) {
            if (source.target.id === 'Yes_Delete_Note') {
                count = count + 1;
                console.log("AFTER COUNT:----", count);
                // let All_inputs = Notes_container.querySelectorAll('input');
                let This_note_first_input = Notes_container.querySelector('input');
                let Parent_Note_Container = Array.from(document.querySelectorAll("#Notes_container input"));
                let input_Index = Parent_Note_Container.indexOf(This_note_first_input);
                // console.log("Let's check the input's INDEX:  =  ", input_Index);
                Update_TimerDeclearedTimeInLocalStorage(Notes_container, This_note_first_input, input_Index);
                Notes_container.remove();
                console.log("Note deleted!");
                Update_notes();

                Delete_Popup_Window.style.display = 'none';
            }
            // else if (source.target.id === 'Cancel_Delete_Note') {
            //     Delete_Popup_Window.style.display = 'none';
            // }
            else if (!(source.target.id === 'Yes_Delete_Note')) {
                Delete_Popup_Window.style.display = 'none';
            }
        }, { once: true });
    }


    // A function that updates "Timer_decleared_time" in local storage.
    // the function will look something like this. function (Notes_container)
    // Notes_container_INPUT = Notes container.querryselectorall(inputs);
    // let inputss = documents.querryselectorall(.notes_container input);
    // -->>>> let index_range_of = inputss(Notes_container_INPUT);  return <<-- (start_index, end_index)
    // -->> Timer_decleared_time.slice(index_range_of);
    // Update Timer_decleared_time in LocalStorage.


    function Update_TimerDeclearedTimeInLocalStorage(Notes_container, This_note_first_input, input_Index) {
        let Timer_decleared_time = JSON.parse(localStorage.getItem("Timer_decleared_time"));
        let Input_array = JSON.parse(localStorage.getItem("Input_array"));

        let Input_Array_length = (document.querySelectorAll("#Notes_container input")).length;


        // Timer_decleared_time.splice(input_Index, 4); to match the length of input array.
        // So Start = length of input array.
        // And end = length of OT array. 
        // Update the array in the end.

        //First >> Timer_decleared_time.splice(input_Index, 4);
        //Second > Timer_decleared_time.splice(Start, End);
        //Third >> Update in LocalStorage.


        let Start = Input_Array_length - 4;
        let End = Timer_decleared_time.length;

        Input_array.splice(input_Index, 4);
        Timer_decleared_time.splice(input_Index, 4);
        // Timer_decleared_time.splice(Start, End);

        localStorage.setItem("Timer_decleared_time", JSON.stringify(Timer_decleared_time));
        localStorage.setItem("Input_array", JSON.stringify(Input_array));

    }


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
        const row_div = document.createElement('div');
        row_div.classList.add('row');
        const message_div = document.createElement('div');
        message_div.classList.add('message');
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
        // console.log("Timer_decleared_time EXISTS");
    }

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
                                        if ((inputss[index].value.trim() === '') && !(inputss[index].value.trim() === 0)) {
                                            inputss[index].value = 0;
                                        }
                                        if (index === 0) {
                                            Timer_decleared_time.push(now.getDate());
                                            // inputss[index].value = 1;
                                        } else if (index === 1) {
                                            Timer_decleared_time.push(now.getHours());
                                        } else if (index === 2) {
                                            Timer_decleared_time.push(now.getMinutes());
                                        }
                                    }
                                    else if (!next_input) {
                                        if (inputss[index].value.trim() === '') {
                                            inputss[index].value = 0;
                                        }
                                        Timer_decleared_time.push(now.getSeconds());
                                        localStorage.setItem("Timer_decleared_time", JSON.stringify(Timer_decleared_time));
                                        Save_and_Update_Notes("Editable");
                                    }
                                }
                            })
                        })
                    }
                }
            })
        });
    }


    function Save_and_Update_Notes(source = "None") {
        const Editables = document.querySelectorAll('.Editable');
        for (let elements = 0; elements < Editables.length; elements++) {
            const element = Editables[elements];
            element.setAttribute('contenteditable', false);
        }

        const Notes_container = document.getElementById('Notes_container');
        const inputs = Notes_container.querySelectorAll('input');
        for (let elements = 0; elements < inputs.length; elements++) {
            const element = inputs[elements];
            element.disabled = true;
        }

        // localStorage.setItem("Timer_decleared_time", JSON.stringify(Timer_decleared_time));
        Input_digits_size();

        Update_notes(source);
    }


    // CLEAR CHAT
    Option_clear_chat_button.addEventListener('click', function () {
        localStorage.removeItem('Chat_HTML');
        Chat_box.innerHTML = "";
        Messages_array.length = 0;
        Time_array.length = 0;
        console.log("Chat cleared");
    });




    // ADD A NEW NOTE
    function Add_A_New_Note() {
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
        Notes_container_div.appendChild(Edit_button);

        const Notes_Timmer_div = document.createElement('div');
        Notes_Timmer_div.classList.add('Timmer');
        Notes_container_div.appendChild(Notes_Timmer_div);

        const Timer_days_input = document.createElement('input');
        Timer_days_input.type = 'number';
        Timer_days_input.placeholder = 'dd';
        Timer_days_input.maxLength = 2;
        Timer_days_input.disabled = false;
        Timer_days_input.classList.add('Timer_days_input', 'Timer_input');

        const Timer_hours_input = document.createElement('input');
        Timer_hours_input.type = 'number';
        Timer_hours_input.placeholder = 'hh';
        Timer_hours_input.maxLength = 2;
        Timer_hours_input.disabled = false;
        Timer_hours_input.classList.add('Timer_hours_input', 'Timer_input');

        const Timer_minutes_input = document.createElement('input');
        Timer_minutes_input.type = 'number';
        Timer_minutes_input.placeholder = 'mm';
        Timer_minutes_input.maxLength = 2;
        Timer_minutes_input.disabled = false;
        Timer_minutes_input.classList.add('Timer_minutes_input', 'Timer_input');

        const Timer_seconds_input = document.createElement('input');
        Timer_seconds_input.type = 'number';
        Timer_seconds_input.placeholder = 'ss';
        Timer_seconds_input.maxLength = 2;
        Timer_seconds_input.disabled = false;
        Timer_seconds_input.classList.add('Timer_seconds_input', 'Timer_input');

        Notes_Timmer_div.appendChild(Timer_days_input);
        Notes_Timmer_div.appendChild(Timer_hours_input);
        Notes_Timmer_div.appendChild(Timer_minutes_input);
        Notes_Timmer_div.appendChild(Timer_seconds_input);

        const Timer_inputs = Notes_Timmer_div.querySelectorAll('.Timmer input');
        Input_digits_size();

        const Notes_text_div = document.createElement('div');
        Notes_text_div.classList.add('Notes_text', 'Editable');
        const ul = document.createElement('ul');
        Notes_text_div.appendChild(ul);
        const List_paragraph = document.createElement('li');
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
    function Update_notes(source = "None") {
        const Notes_container_box = document.getElementById('Notes_container');
        const Notes = Notes_container_box.innerHTML;
        localStorage.setItem("Notes_HTML", JSON.stringify(Notes));

        if (source === "Editable") {
            // console.log("XXXXXXXXXXXXXXXXXXXXX");
            const inputs = Notes_container_box.querySelectorAll('input');
            const inputs_length = inputs.length;
            // console.log("Length og inputs present in timer = ", inputs_length);
            let input_contents = [];
            for (let index = 0; index < inputs_length; index++) {
                const input_data = inputs[index].value;
                input_contents.push(input_data);
            }
            localStorage.setItem("Input_array", JSON.stringify(input_contents));
        }

        // localStorage.setItem("Timer_decleared_time", JSON.stringify(Timer_decleared_time));

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


}