//POST

//console.log something when form submitted


//takes in user input in name field

const form = document.getElementById('nameForm');
const nameField = document.getElementById('name');

function postName(){
    const name = nameField.value;
    const data = {
        Name: name
    };
    const request = new XMLHttpRequest();
    const url='https://localhost:44366/api/teammembers';
    request.open("POST", url);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(data));
}

//target input elemet
//create object with field of name
//value of input value
//send that object (stringify)

//convert text to json in order to POST
//JSON.stringify()

//XMLHTTPrequestobject created here? send request to web server
//read response back from web server
//Add Name function
// onsubmit in HTML file performs add name function
//use AJAX
//send (string)
