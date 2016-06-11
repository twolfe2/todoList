$(document).ready(init);

function init() {
    $('.addTask').on('click', addTask);
    $('#tasks').on('change', '[type=checkbox]', taskComplete);
    $('#tasks').on('click','.delete', deleteTask);
    var tasks = getTasks();
    renderTasks(tasks);


}


function addTask() {
    var taskName = $('.taskName').val();
    $('taskName').val('');

    var date = $('.date').val();
    console.log(date);

    var isComplete = false;

    var tasks = getTasks();
    task = { "taskName": taskName, "date": date, "isComplete": isComplete };
    tasks.push(task);
    writeTasks(tasks);
    renderTasks(tasks);




}


function getTasks() {
    var str = localStorage.tasks;

    try {
        var tasks = JSON.parse(str);

    } catch (err) {
        var tasks = [];
    }

    return tasks;

}


function writeTasks(tasks) {
    var taskStr = JSON.stringify(tasks);
    localStorage.tasks = taskStr;
}

function renderTasks(tasks) {
    var $trs = tasks.map(task => {
        var $tr = $('.template').clone();
        // console.log($tr);
        $tr.removeClass('template');
        // debugger;
        $tr.find('.check').attr("checked", task.isComplete);
        if (task.isComplete) {
            $tr.addClass('success');
        }
        $tr.find('.task').html(task.taskName);
        $tr.find('.dueDate').html(task.date);
        return $tr;
    });
    // console.log($trs);
    // debugger;
    $('#tasks').empty().append($trs);
}

function taskComplete() {
    // debugger;
    // debugger;
    console.log($(this).is(':checked'));
    var index = $(this).closest('tr').index();
    var tasks = getTasks();
    if ($(this).is(':checked')) {
        // debugger;
        $(this).closest('tr').addClass('success');
        tasks[index].isComplete = true;
        writeTasks(tasks);
        //renderTasks(tasks);  
    } else {
        $(this).closest('tr').removeClass('success');
        tasks[index].isComplete = false;
        writeTasks(tasks);
        //renderTasks(tasks);

    }
}


function deleteTask() {
    
    var index = $(this).closest('tr').index();
    var tasks = getTasks();

    tasks.splice(index, 1);

    writeTasks(tasks);
    renderTasks(tasks);


}
