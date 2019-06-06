//POST

//console.log something when form submitted


//takes in user input in name field
const form = document.getElementById('name');
const FD = new FormData(form);


// //this console logs the name passed in when you click save
// function consoleMessage(){
//     console.log(form.value);
//     };

// function postName(){
//     $.ajax({
//         type: "POST",
//         url: ,
//         contentType: "application/json",
//         data: JSON.stringify(FD)s
//     });
//     console.log("post name function");
// }

function postName(){
var data = JSON.stringify(FD);
const Http = new XMLHttpRequest();
const url='https://localhost:44366/api/teammembers';
Http.open("POST", url);
Http.setRequestHeader("Content-Type", "application/json");
Http.send(data);
console.log("post name function");
}





//convert text to json in order to POST
//JSON.stringify()

//XMLHTTPrequestobject created here? send request to web server
//read response back from web server
//Add Name function
// onsubmit in HTML file performs add name function
//use AJAX
//send (string)
