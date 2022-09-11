console.log('in js');

$(document).ready(clickHandlers);

function clickHandlers(){
    $('#submitButton').on('click', addTask);
    $(document).on('click', '.checkButton', taskComplete);
    $(document).on('click', '#deleteButton', deleteAlert);
    getTasks();
};

function addTask(){
    let listObject = {
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
        getTasks();
        $('#taskIn').val('');
    }).catch((error) => {
        console.log('Error in task post', error);
        alert('Error adding task.  Please try again!');
    });
};



function taskComplete(){
    let taskToCheck = $(this).closest('tr').data('id');
    console.log(taskToCheck);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToCheck}`
    }).then((response) => {
        getTasks();
    }).catch ((error) => {
        console.log('Error in task PUT', error);
    })
};
 
function getTasks(){
    console.log('you clicked me!');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        renderTasks(response);
    }).catch((error) => {
        console.log('Error in GET', error);
    });
}

function renderTasks(response){
    $('#listItems').empty();
    for (let task of response){
        if (task.checked === true){
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
        else {
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


function deleteTask(taskToDelete){
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskToDelete}`
    }).then((response) => {
        console.log('It worked!');
        getTasks();
    }).catch ((error) => {
        console.log('Error in task DELETE', error);
    })
};

function deleteAlert(){
    let taskToDelete = $(this).closest('tr').data('id');
    console.log(taskToDelete);

    swal({
        title: "Are you sure?",
        text: "Once deleted, it will be removed permanently!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Poof! The task has been deleted!", {
            icon: "success",});
            deleteTask(taskToDelete);
        } 
        else {
            swal("Your task is safe!");
        }
    });
};






//////////////////////////////////////////////////WIP///////////////////////////////////////////////////////////
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