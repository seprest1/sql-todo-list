console.log('in js');

$(document).ready(clickHandlers);

function clickHandlers(){
    $('#submitButton').on('click', addTask);
    $('#editButton').on('click', editCategory);
    $(document).on('click', '.checkButton', taskComplete);
    $(document).on('click', '.deleteButton', deleteTask);
};

function addTask(){

};

function editCategory(){

};

function taskComplete(){

};

function deleteTask(){

};

function renderTasks(){

};