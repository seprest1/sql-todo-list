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

};

function deleteTask(){

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
            <tr class="row">
                <td class="col-11 col-sm-6">${task.listItem}</td>
                <div class="col-1">
                    <div class="row">
                        <td class="col" class="tableButton">
                            <input type="checkbox" class="form-check-input-lg" class="checkButton"/>
                        </td>
                        <td class="col" class="tableButton">
                            <button type="button" class="btn-close btn-sm" class="deleteButton"></button>
                        </td>
                    </div>
                </div>
            </tr>
        `);
    }
};


