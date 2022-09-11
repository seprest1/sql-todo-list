console.log('in js');

$(document).ready(clickHandlers);

function clickHandlers(){
    $('#submitButton').on('click', addTask);
    $(document).on('click', '.checkButton', taskComplete);
    $(document).on('click', '#deleteButton', deleteAlert);
    getTasks();
};

function getTasks(){
    console.log('you clicked me!');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        renderTasks(response);                          //update DOM
    }).catch((error) => {
        console.log('Error in GET', error);
    });
}

function renderTasks(response){
    $('#listItems').empty();        //empty tasks
    for (let task of response){         
        if (task.checked === true){       //if tasked is checked, update DOM like this--->
            $('#listItems').append(`
            <tr data-id="${task.id}" class="hoverTr">
                <td>
                    <input type="checkbox" class="checkButton" checked="true"/>
                </td>
                <td class="checkedListItem" data-tf="${task.checked}">${task.listItem}</td>
                <td>
                    <button type="button" class="btn btn-outline-secondary btn-sm" id="deleteButton"> ✗ </button>
                </td>
            </tr>
            `);
            $('.checkedListItem').css('text-decoration', 'line-through');
        }
        else {            //if tasked is still unchecked, update DOM like this --->             
            $('#listItems').append(`
            <tr data-id="${task.id}" class="hoverTr">
                <td>
                    <input type="checkbox" class="checkButton" id="checkbox"/>
                </td>
                <td data-tf="${task.checked}" class="taskItem">${task.listItem}</td>
                <td>
                    <button type="button" class="btn btn-outline-secondary btn-sm" id="deleteButton"> ✗ </button>
                </td>
            </tr>
            `);
        }
    }
};

function addTask(){                 
    let listObject = {                                   //data object
        listItem: $('#taskIn').val(),
        checked: false,
        timeCompleted: null
    }                                      
    console.log(listObject);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: listObject
    }).then((response) => {
        console.log(response);
        getTasks();                                     //update DOM
        $('#taskIn').val('');                           //reset input to placeholder
    }).catch((error) => {
        console.log('Error in task post', error);
        alert('Error adding task.  Please try again!');
    });
};

function taskComplete(){
    let taskToCheck = $(this).closest('tr').data('id');         //sets variable to row ID
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToCheck}`             //sets url to row ID               
    }).then((response) => {
        getTasks();                             //updateDOM
    }).catch ((error) => {
        console.log('Error in task PUT', error);
    })
};

function deleteAlert(){
    let taskToDelete = $(this).closest('tr').data('id');        //set variable to row ID
    console.log(taskToDelete);

    swal({                                                              //alert message
        title: "Are you sure?",
        text: "Once deleted, it will be removed permanently!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {     
        if (willDelete) {                                           //if user clicks continue
            swal("Poof! The task has been deleted!", {
            icon: "success",});
            deleteTask(taskToDelete);                             //send to DELETE route, ID as parameter
        } 
        else {
            swal("Your task is safe!");                 //else, go back to list
        }
    });
};

function deleteTask(taskToDelete){                          //uses row ID as parameter
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskToDelete}`                       //sets row ID as url
    }).then((response) => {
        console.log('It worked!');
        getTasks();                                         //update DOM
    }).catch ((error) => {
        console.log('Error in task DELETE', error);
    })
};







//////////////////////////////////////////////////WIP///////////////////////////////////////////////////////////
//          FUNCTIONS FOR USER TO BE ABLE TO EDIT LIST TITLE
//
//
// $(document).on('click', '#editButton', editCategory);
//
// function editCategory(){
//     $('#listTitle').empty();
//     $('#listTitle').append(`
//         <th class="col-10" id="newCategory">
//             <input type="text" id="newCategory" placeholder="New Title..." required/>
//         </th>
//         <th class="col-1">
//             <button type="button" id="submitTitleButton" class="btn btn-outline-secondary btn-sm mx-3">Submit</button>
//         </th>`);
//     $(document).on('click', '#submitTitleButton', renderTitle);
// };

// function renderTitle(){
//     let newTitle = $("#newCategory").val();
//     console.log(newTitle);
//     $('#listTitle').empty();
//     $('#listTitle').append(`
//         <th class="col-10 col-8-lg col-6-md col-4-sm" id="taskCategory">${newTitle}</th>
//         <th class="col-1">
//             <button type="button" id ="editButton" class="btn btn-outline-secondary btn-sm mx-3">Edit</button>
//         </th>`);
// };