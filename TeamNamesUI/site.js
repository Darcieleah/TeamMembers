
const form = document.getElementById('nameForm');
const nameField = document.getElementById('name');

//POST METHOD - submit a new team member name
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

//GET METHOD - display all names
function getNames(){
    const request = new XMLHttpRequest();
    const url='https://localhost:44366/api/teammembers';
    request.open("GET", url, true);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type", "application/json"); 
    request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE) {
            console.log(request.response); 
            generateTable(table, teamNames);
            generateTableHead(table, data); 
        }
    }
    
    request.send(null);
}

let teamNames = [ 
    { Name:"Darcie JS", ID: 1 },
    { Name:"Jamie JS", ID: 2 },
    { Name:"Gareth JS", ID: 3 },
    { Name:"Dimitri JS", ID: 4 }
];

let table = document.querySelector("table");
let data = Object.keys(teamNames[0]);

function generateTableHead(table, data){
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
}
    
    


    

    
    




    // request.onload = () => {
    //     if (request.status === 200) {
    //       console.log("Success"); // So extract data from json and create table
          
    //       //Extracting data
    //       var name = JSON.parse(request.response).value.name;
    //       var memberid = JSON.parse(request.response).value.id;
          
    //       //Creating table
    //       var table="<table>";
    //       table+="<tr><td>Member ID</td><td>Name</td></tr>"; 
    //       table+="<tr><td>"+memberid+"</td><td>"+name+"</td></tr>";
    //       table+="</table>";
       
    //       //Showing the table inside table
    //       document.getElementById("mydiv").innerHTML = table;   
    //     } 
    //   };
       
    //   request.onerror = () => {
    //     console.log("error")
    //   };


    // console.log('get request');




