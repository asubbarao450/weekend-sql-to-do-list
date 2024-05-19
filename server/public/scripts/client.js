console.log('JS is sourced!');




function savetodo(todotoAdd) {

    axios({
        method: 'POST',
        url: '/todos',
        data: todotoAdd,
    }).then(function (response) {
        console.log('savetodo()', response.data);
        refreshtodo();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add book at this time. Please try again later.');
    });

}

function rendertodo(todos) {
    let todoshelf = document.getElementById('todoshelf')
    todoshelf.innerHTML = '';

    console.log(todos)
   
    for(todo of todos){
        // For each book, append a new row to our table

        if(todo.isComplete === false){
        todoshelf.innerHTML += (`
        <tr data-testid="toDoItem">
        <td>${todo.text}</td>
      <td>${todo.isComplete}</td>
      <td><button data-testid="completeButton" onClick="markComplete(${todo.isComplete}, ${todo.id})">
      Mark as Complete
      </button></td>
      <td><button data-testid="deleteButton" id="deleteButton" onClick="deletetodo(${todo.id})">
      Delete
  </button></td>
        </tr>
      `);
        }

        else if(todo.isComplete === true){
            todoshelf.innerHTML += (`
            <tr data-testid="toDoItem">
            <td class="completed" data-testid="toDoItem">${todo.text}</td>
          <td>${todo.isComplete}</td>
          <td><button data-testid="completeButton" onClick="markComplete(${todo.isComplete}, ${todo.id})">
          Mark as Complete
          </button></td>
          <td><button data-testid="deleteButton" id="deleteButton" onClick="deletetodo(${todo.id})">
          Delete
      </button></td>
            </tr>
          `);


        }
    }

}


function refreshtodo() {
    //needs get route 

    axios({
        method: 'GET',
        url: '/todos'
    }).then(function (response) {
        console.log('refrestodo() response', response.data);
        rendertodo(response.data);
    }).catch(function (error) {
        console.log('error in GET', error);
    });

}


function handleSubmit(event) {
    event.preventDefault();


let todo = {};
  todo.text = document.getElementById("toDoTextInput1").value;
  
  todo.isComplete = false;
  savetodo(todo);

}

function markComplete(isComplete, todoid) {

    

    // Use axios to send a PUT request to change song rank
    // Send direction & id in URL
    // For .then, will call the render function.    
    axios({
        // Sending both req.params & req.body in the same request.
        method: "PUT",
        url: "/todos/" + todoid,
        data: {
            isComplete: isComplete
        }
    })
        .then((response) => {

            refreshtodo()
        })
        .catch((error) => {
            console.log('Error', error);
            alert('Something went wrong on put axios');
        })
}


function deletetodo(todoid) {

    axios({
        method: "DELETE",
        //the url need not include 

        url: `/todos/${todoid}`
    })
        .then((response) => {
            refreshtodo();
        }).catch((error) => {
            console.log('Error', error);
            alert('Something went wrong delete');
        });
    //needs delete route 
}