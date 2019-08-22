

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

//GET BY ID - display one entry
function searchId(){
  let id = searchIdField.value;
  const data = {
    Id: searchIdField.value
  };
  const request = new XMLHttpRequest();
  const url=`https://localhost:44366/api/teammembers/${id}`;
  request.open("GET", url, true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(data)); 
  request.onreadystatechange = () => {
    if (request.readyState == XMLHttpRequest.DONE) { 
        let idResponse = JSON.parse(request.response);
        document.getElementById('searchGoesHere').innerHTML = jsonIntoTable(idResponse, 'table'); 
    }
    toggleFindByIDInput()
  } 
}

//GET BY NAME - display multiple entries
function searchName(){
  let name = searchNameField.value;
  const data = {
    Name: searchNameField.value
  };
  const request = new XMLHttpRequest();
  const url=`https://localhost:44366/api/teammembers/names/${name}`;
  request.open("GET", url, true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(data)); 
  request.onreadystatechange = () => {
    if (request.readyState == XMLHttpRequest.DONE) { 
        let nameResponse = JSON.parse(request.response);
        document.getElementById('searchGoesHere').innerHTML = jsonIntoTable(nameResponse, 'table'); 
    }
    toggleFindByNameInput()
  } 
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

//DELETE BULK METHOD - delete names by array of IDs
function deleteSelected(){
  membersToDelete.forEach(deleteName);
  membersToDelete.length = 0;
  toggleDeleteSelected();
}

const newNameField = document.getElementById('newname');

//PATCH METHOD - amend name by ID
function updateName(){
  id = updateForm.getAttribute('data-row-id');
  const newName = newNameField.value;
  const data = [{
    "op": "add",
    "path": "/name",
    "value": newName
  }];
  const request = new XMLHttpRequest();
  const url=`https://localhost:44366/api/teammembers/${id}`;
  request.open("PATCH", url, true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-type", "application/json")
  request.send(JSON.stringify(data));
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      document.getElementById("updateForm").reset();
      updateForm.classList.add('hidden');
        getNames();
    } 
  }
}

const updateForm = document.getElementById("updateForm");

function toggleUpdateInput(entityId){
  if (updateForm.classList.contains('hidden')) {
    updateForm.classList.remove('hidden');
  } else {
    updateForm.classList.add('hidden');
  }
  updateForm.setAttribute("data-row-id", entityId);
}

const addForm = document.getElementById('addForm');
const nameField = document.getElementById('name');


function toggleAddInput(){
  if (addForm.classList.contains('hidden')) {
    addForm.classList.remove('hidden');
  } else {
    addForm.classList.add('hidden');
  }
}

const searchIdForm = document.getElementById("searchIdForm");
const searchIdField = document.getElementById("findId");

function toggleFindByIDInput(){
  if (searchIdForm.classList.contains('hidden')) {
    searchIdForm.classList.remove('hidden');
  } else {
    searchIdForm.classList.add('hidden');
  }
}

const searchNameForm = document.getElementById("searchNameForm");
const searchNameField = document.getElementById("findName");

function toggleFindByNameInput(){
    if (searchNameForm.classList.contains('hidden')) {
    searchNameForm.classList.remove('hidden');
  } else {
    searchNameForm.classList.add('hidden');
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
  
      bodyRows += `<td><button class="btn table-btn" type="button" onclick = deleteName(${row.id})>Delete <i class="fa fa-trash-o" aria-hidden="true"></i></button><button class="btn table-btn" type="button" onclick = toggleUpdateInput(${row.id})>Edit <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><input type="checkbox" class="myCheck" onclick="editMembersToDelete(${row.id})"></td></tr>`;
    });
  
    return '<table class="' +
           classes +
           '"><thead><tr>' +
           headerRow + '<th>Options</th></tr></thead><tbody>' +
           bodyRows +
           '</tbody></table>';
  }






