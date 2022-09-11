console.log('in js');

$(document).ready(clickHandlers);

function clickHandlers(){
    $('#submitButton').on('click', addTask);
    $('#editButton').on('click', editCategory);
    $(document).on('click', '.checkButton', taskComplete);
    $(document).on('click', '.deleteButton', deleteTask);
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

function editCategory(){

};

function taskComplete(){
    let taskToCheck = $(this).closest('tr').data('id');
    console.log(taskToCheck);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToCheck}`
    }).then((response) => {
        $(this).val('on');
        console.log($(this).next('td'));
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
    $('#tableBody').empty();
    for (let task of response){
        $('#tableBody').append(`
            <tr data-id="${task.id}">
                <td>
                    <input type="checkbox" value="" class="checkButton"/>
                </td>
                <td data-tf="${task.checked}">${task.listItem}</td>
                <td>
                    <button class="deleteButton">X</button>
                </td>
            </tr>
        `);
    }
};

function deleteTask(){
    let taskToDelete = $(this).closest('tr').data('id');
    console.log(taskToDelete);
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

