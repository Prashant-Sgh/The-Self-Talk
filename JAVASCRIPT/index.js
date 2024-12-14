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

    // const Menu_button = document.getElementById('Menu_button');

    document.addEventListener('click', function (event) {
        const ID = event.target.id;
        if (ID === 'Menu_button') {
            console.log("You clicked Menu_button");
            const Menu_content = document.getElementById('Menu_content');
            Menu_content.classList.toggle('show');
        }
        else if (ID === 'Option_button') {
            console.log("You clicked Options");
            const Options = document.getElementById('Options');
            Options.classList.toggle('show');
        }
        // else
        //     console.log('Sahi jgha click karo!!');
    })


    const Send_button = document.getElementById('Send_button');


    // let Chat_history = JSON.parse(localStorage.getItem('History'));
    // let Chat_history_Times = JSON.parse(localStorage.getItem('History_Times'));
    let Chat_HTML = JSON.parse(localStorage.getItem('Chat_HTML'));


    const Chat_box = document.getElementById('Chat_box');

    // let Messages_array = [];
    // let Time_array = [];
    if (Chat_HTML) {
        Chat_box.innerHTML = Chat_HTML;

        const Day_div = document.querySelectorAll('.Day');

        const now = new Date();
        const date = String(now.getDate());
        const month = String(now.getMonth());
        const year = String(now.getFullYear());

        const Today = (`${date}th, ${month} ${year}`);
        const Yesterday = (`${(Number(date) - 1)}th, ${month} ${year}`);

        // console.log(Yesterday);
        for (let Day = 0; Day < Day_div.length; Day++) {
            // console.log("vvvvvvvvvvvvv");
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

        // for (let element = 0; element < Chat_HTML.length; element++) {
        //     // For MESSAGES
        //     console.log("Chat_Box inner html = ", Chat_HTML);
        //     const chat = Chat_history[element];
        //     const row_div = document.createElement('div');
        //     row_div.classList.add('row');
        //     const message_div = document.createElement('div');
        //     row_div.appendChild(message_div);
        //     message_div.classList.add('message');
        //     const messages = document.querySelectorAll('.message');
        //     message_div.textContent = chat;
        //     Messages_array.push(chat);

        //     // For Times

        //     const time = Chat_history_Times[element];
        //     const time_div = document.createElement('div');
        //     time_div.classList.add('time');
        //     row_div.appendChild(time_div);
        //     time_div.textContent = time;
        //     Time_array.push(time);
        //     Chat_box.appendChild(row_div);

        // }
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
            // console.log("CHILD NODES ====", element);
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
            // console.log("Day_div.id =======", Day_div.id);
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
}

// function Clear_chat() {
//     localStorage.clear();
//     Chat_box.innerHTML = "";
//     Messages_array.length = 0;
//     Time_array.length = 0;
//     console.log("Chat cleared");
// }

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