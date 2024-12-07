fetch('Chat_background.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('Chat_background').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
    });




fetch('Side_menu_container.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('Side_menu_container').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
    });


// //////////////////////////////////////////////////////////////////

function content_loaded() {
    setTimeout(function run() { 
        console.log('DATA FETCHED');
        Ready_to_load() 
    }, 2000)
}

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
        else
            console.log('Sahi jgha click karo!!');
    })




}