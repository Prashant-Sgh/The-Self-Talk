fetch('Chat_background.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('Chat_background').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
    });



fetch('Chat_box.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('Chat_box').innerHTML = data;
        ClockWorkingFunction();
    })
    .catch(error => {
        console.error('Error loading Chat_box.html:', error);
    });




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
        // ClockWorkingFunction()

    }, 2000)
}

// window.onload = ClockWorkingFunction();


content_loaded()



function Ready_to_load() {


    //Load notes from local Storage
    // JSON.parse(localStorage.getItem("Notes_HTML"));
    if (localStorage.getItem("Notes_HTML")) {
        (document.getElementById('Notes_container')).innerHTML = JSON.parse(localStorage.getItem("Notes_HTML"));
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

            Make_These_Editable(Editables);

            // const Is_Editable = Notes_container.getAttribute('contenteditable') === 'true';
            // Notes_container.setAttribute('contenteditable', !Is_Editable);

            //THESE ARE FOR VISUAL CHANGES ON THAT PARTICULAR NOTE CARD
            const Edit_icon = Notes_container.querySelector('.Edit_icon');
            const Save_icon = Notes_container.querySelector('.Save_icon');
            Edit_icon.classList.toggle('edit_toggle');
            Save_icon.classList.toggle('save_toggle');
            console.log('Target =', event.target.classList);
        }
        else if (event.target.classList.contains('Save_icon')) {
            Update_notes();
            console.log("Notes updated in local storage!");
        }
        else if (event.target.classList.contains('Delete_note')) {
            const Notes_container = event.target.closest('.Notes_container');
            Notes_container.remove();
            console.log("Notes Being deleted!");
            Update_notes();
        }
        else if (ID === 'Option_button') {
            console.log("You clicked Options");
            const Options = document.getElementById('Options');
            Options.classList.toggle('show');
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


        let message = Message_texts.value.trim();
        Message_texts.value = "";
        // Messages_array.push(message);
        // localStorage.setItem("History", JSON.stringify(Messages_array));
        // console.log("message", Messages_array);
        const row_div = document.createElement('div');
        row_div.classList.add('row');
        const message_div = document.createElement('div');
        message_div.classList.add('message');
        message_div.textContent = message
        row_div.appendChild(message_div);


        // For TIME
        const now = new Date();
        const hour = ((now.getHours()) % 12).toString().padStart(2, '0');
        const minute = (now.getMinutes()).toString().padStart(2, '0');
        const am_pm = now.getHours() >= 12 ? "pm" : "am";
        const time = `${hour}:${minute} ${am_pm}`
        // Time_array.push(time);
        // localStorage.setItem("History_Times", JSON.stringify(Time_array));
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

    function Make_These_Editable(Editables) {
        for (let elements = 0; elements < Editables.length; elements++) {
            const element = Editables[elements];
            const Is_Editable = element.getAttribute('contenteditable') === 'true';
            element.setAttribute('contenteditable', !Is_Editable);
        }
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
        const Edit_icon = document.createElement('img');
        Edit_icon.classList.add('Edit_icon');
        Edit_icon.setAttribute('src', '/ASSETS/pencil.svg');
        Edit_button.appendChild(Edit_icon);

        // const Save_button = document.createElement('button');
        // Save_button.classList.add('Save_button');
        const Save_icon = document.createElement('img');
        Save_icon.classList.add('Save_icon');
        Save_icon.setAttribute('src', '/ASSETS/tick.svg');
        Edit_button.appendChild(Save_icon);
        // Notes_container_div.appendChild(Save_button);
        Notes_container_div.appendChild(Edit_button);

        const Notes_Timmer_div = document.createElement('div');
        Notes_Timmer_div.classList.add('Timmer');
        Notes_container_div.appendChild(Notes_Timmer_div);

        const Timmer_Day_div = document.createElement('div');
        Timmer_Day_div.classList.add('Timmer_Day', 'Editable');
        Timmer_Day_div.textContent = "1";
        const Timmer_Hour_div = document.createElement('div');
        Timmer_Hour_div.classList.add('Timmer_Hour', 'Editable');
        Timmer_Hour_div.textContent = "0";
        const Timmer_Minute_div = document.createElement('div');
        Timmer_Minute_div.classList.add('Timmer_Minute', 'Editable');
        Timmer_Minute_div.textContent = "0";
        const Timmer_Second_div = document.createElement('div');
        Timmer_Second_div.classList.add('Timmer_Second', 'Editable');
        Timmer_Second_div.textContent = "0";

        Notes_Timmer_div.appendChild(Timmer_Day_div);
        Notes_Timmer_div.appendChild(Timmer_Hour_div);
        Notes_Timmer_div.appendChild(Timmer_Minute_div);
        Notes_Timmer_div.appendChild(Timmer_Second_div);

        const Notes_text_div = document.createElement('div');
        Notes_text_div.classList.add('Notes_text', 'Editable');

        const ul = document.createElement('ul');
        Notes_text_div.appendChild(ul);

        const paragraph = document.createElement('p');
        ul.appendChild(paragraph);


        Notes_container_div.appendChild(Notes_text_div);
    }



    //REMEMBER NOTES
    // Update_notes()
    function Update_notes() {
        const Notes_container_box = document.getElementById('Notes_container');
        const Notes = Notes_container_box.innerHTML;
        localStorage.setItem("Notes_HTML", JSON.stringify(Notes));
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