const textbox = document.getElementById('textbox');
const send = document.querySelector('send');

const messagesarea = document.getElementById('messagesarea');


let History_array = JSON.parse(localStorage.getItem("History"));


let array = [];

if (History_array) {
    // let array = [];
    console.log("Restored history", History_array);
    for (let element = 0; element < History_array.length; element++) {
        // const element = History_array[element];
        const m = document.createElement('div');
        m.textContent = History_array[element];
        messagesarea.appendChild(m);

        array.push(History_array[element]);
    }
    // console.log("array present", History_array);

} else {
    let array = [];
}


function sendmessage() {
    let message = textbox.value.trim();
    array.push(message);
    localStorage.setItem("History", JSON.stringify(array));
    console.log("message", array);
    // return "hello";
    const m = document.createElement('div');
    // console.log(message, m);
    m.textContent = message;
    // m.classlist.add('newtexts');
    messagesarea.appendChild(m);
    textbox.value = '';
    // return message;
}

// function restore_chat() {
//     let array = [];
//     console.log("Restored history", History_array);
//     for (let element = 0; element < History_array.length; element++) {
//         // const element = History_array[element];
//         const m = document.createElement('div');
//         m.textContent = History_array[element];
//         messagesarea.appendChild(m);

//         array.push(History_array[element]);
//     }
// }

// console.log(sendmessage());