
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
    request.onreadystatechange = function() {
      if (request.readyState == XMLHttpRequest.DONE) {
        document.getElementById("nameForm").reset();
          getNames();
          toggleAddInput();
      } 
    }
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
            let namesResponse = JSON.parse(request.response);
            document.getElementById('tableGoesHere').innerHTML = jsonIntoTable(namesResponse, 'table'); 
        }
    }
    
    request.send(null);
}

//DELETE METHOD - delete name by ID
function deleteName(id){
  const request = new XMLHttpRequest();
    const url=`https://localhost:44366/api/teammembers/${id}`;
    request.open("DELETE", url, true);
    request.onreadystatechange = function() {
      if (request.readyState == XMLHttpRequest.DONE) {
          getNames();
      }       
    };
   
    request.send(null);
}

//delete from checkboxes - for each id of checked row, call deletename function

const newNameField = document.getElementById('newname');

//PATCH METHOD - amend name by ID
function updateName(){
  id = fr.getAttribute('data-row-id');
  const newName = newNameField.value;
  const data = [{
    "op": "add",
    "path": "/name",
    "value": newName
  }];
  console.log(data);
  const request = new XMLHttpRequest();
  const url=`https://localhost:44366/api/teammembers/${id}`;
  request.open("PATCH", url, true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-type", "application/json")
  request.send(JSON.stringify(data));
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      document.getElementById("updateForm").reset();
      fr.classList.add('hidden');
        getNames();
    } 
  }
}

var fr = document.getElementById("updateForm");

function toggleUpdateInput(entityId){
  console.log(entityId);
  if (fr.classList.contains('hidden')) {
    fr.classList.remove('hidden');
  } else {
    fr.classList.add('hidden');
  }
  fr.setAttribute("data-row-id", entityId);
}

function toggleAddInput(){
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
  } else {
    form.classList.add('hidden');
  }
}

var membersToDelete = []; 

function editMembersToDelete(entityId) {
  var index = membersToDelete.findIndex(x => x === entityId)
  if (index === -1){
    membersToDelete.push(entityId);
  } else {
    membersToDelete.splice(index,1);  
  }
  console.log(membersToDelete);
  console.log(membersToDelete.length);
  toggleDeleteSelected();
}
var deleteBtn = document.getElementById("deleteButton");

function toggleDeleteSelected(){
  if (membersToDelete.length <= 0) {
    deleteBtn.classList.add('hidden');
  } else {
    deleteBtn.classList.remove('hidden');
  }
}




 

  //rows to delete function
  //for each box checked, add to array (if not already in)
  //if already in array, remove it (for uncheck)
  //if anything in the array display delete button
  //otherwise hide




function jsonIntoTable(json, classes) {
  //1 column per property - each object in array has same properties of name and id
  //this takes property names (keys) from first object and stores in cols
    var cols = Object.keys(json[0]);
    
    var headerRow = '';
    var bodyRows = '';

    //if no class argument passed, then classes is empty string
    
    classes = classes || '';
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    cols.map(function(col) {
      headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
    });
  
    json.map(function(row) {
      bodyRows += '<tr>';
  
      cols.map(function(colName) {
        bodyRows += '<td>' + row[colName] + '</td>';
      })
  
      bodyRows += `<td><button class="btn" type="button" onclick = deleteName(${row.id})>Delete <i class="fa fa-trash-o" aria-hidden="true"></i></button><button class="btn" type="button" onclick = toggleUpdateInput(${row.id})>Edit <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><input type="checkbox" class="myCheck" onclick="editMembersToDelete(${row.id})"></td></tr>`;
    });
  
    return '<table class="' +
           classes +
           '"><thead><tr>' +
           headerRow +
           '</tr></thead><tbody>' +
           bodyRows +
           '</tbody></table>';
  }






