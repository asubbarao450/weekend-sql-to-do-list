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
    const todoshelf = document.getElementById('todoshelf')
    todoshelf.innerHTML = '';

    for (let i = 0; i < todos.length; i += 1) {
        let todo = todos[i];
        // For each book, append a new row to our table
        todoshelf.innerHTML += (`
        <tr>
        <td>${todo.id}</td>
        <td>${todo.item}</td>
      <td>${todo.isComplete}</td>
      <td><button onClick="markComplete(${todo.isComplete}, ${todo.id})">
      Mark as Complete
      </button></td>
      <td><button onClick="deletetodo(${todo.id})">
      Delete
  </button></td>
        </tr>
      `);
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
  todo.item = document.getElementById('author').value;
  todo.isComplete = document.getElementById('title').value;
  addtodo(todo);

}

function markComplete(isComplete, todoid) {

    console.log("Changing isRead...", isComplete, todoid)

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
            alert('Something went wrong');
        });
    //needs delete route 
}