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


    let Chat_history = JSON.parse(localStorage.getItem('History'));


    const Chat_box = document.getElementById('Chat_box');

    let Messages_array = [];
    if (Chat_history) {
        for (let element = 0; element < Chat_history.length; element++) {
            const chat = Chat_history[element];
            console.log(chat);
            const row_div = document.createElement('div');
            row_div.classList.add('row');
            const message_div = document.createElement('div');
            row_div.appendChild(message_div);
            message_div.classList.add('message');
            const messages = document.querySelectorAll('.message');
            message_div.textContent = chat;

            Chat_box.appendChild(row_div);


            Messages_array.push(chat);

        }
    }

    Send_button.addEventListener('click', function () {Send_message()});

    function Send_message() {
        console.log('You just clicked send....');
        let message = Message_texts.value.trim();
        Messages_array.push(message);
        localStorage.setItem("History", JSON.stringify(Messages_array));
        console.log("message", Messages_array);
        const row_div = document.createElement('div');
        row_div.classList.add('row');
        const message_div = document.createElement('div');
        message_div.classList.add('message');
        message_div.textContent = message
        const time_div = document.createElement('div');
        row_div.appendChild(message_div);
        time_div.classList.add('time');
        time_div.textContent = "09:45 am";
        row_div.appendChild(time_div);
        Chat_box.appendChild(row_div);

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