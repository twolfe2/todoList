$(document).ready(init);
var currDate = new Date();
function init() {
  //var currDate = new Date();
  $('.date').datepicker('setDate',currDate);
  // $('.datepicker').datepicker('update', currDate);
  
  // console.log(currDate);
    $('.date').datepicker({
        todayHighlight: true,
        autoclose: true
    });
    $('.addTask').on('click', addTask);
    $('#tasks').on('change', '[type=checkbox]', taskComplete);
    $('#tasks').on('click', '.delete', deleteTask);
    $('#tasks').on('click', '.edit', editTask);
    $('#tasks').on('click', '.saveEdit', saveEdit);
    $('#tasks').on('click', '.cancelEdit', cancelEdit);
    $('.deleteCompleted').on('click',deleteCompleted);
    var tasks = getTasks();
    renderTasks(tasks);


}


function addTask() {
    var taskName = $('.taskName').val();
    $('taskName').val('');

    // debugger;
    var date = $('.date').datepicker('getUTCDate');
    // debugger;
    date = date + "";
    date = date.split(' ');
    date.splice(4, 3);
    date = date.join(' ');

    //console.log(date);

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
    // console.log($(this).is(':checked'));
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

function editTask() {
    // console.log("edit");


    var $elems = $(this).closest('tr');
    // debugger;
    $task = $elems.find('.task');
    $date = $elems.find('.dueDate');
    $editButton = $elems.find('.edit');
    $deleteButton = $elems.find('.delete');

    $deleteButton.html('<span class="glyphicon glyphicon-floppy-remove" aria-hidden="true">');
    $editButton.html('<span class="glyphicon glyphicon-floppy-save" aria-hidden="true">');
    $editButton.addClass('btn-success');
    $editButton.addClass('saveEdit');
    $editButton.removeClass('edit');
    $deleteButton.addClass('cancelEdit');
    $deleteButton.removeClass('delete');

    name = $task.text();
    date = $date.text();
    $task.html('');
    $date.html('');
    // debugger;
    $task.append(`<input class="form-control input-sm editTask" class="editTask btn activeEdit">`);
    $('.editTask').val(name);
    $date.append('<input type="text" class="datepicker form-control input-sm editDate">');
    $('.datepicker').datepicker('setDate',currDate);
    $('.datepicker').datepicker({
        todayHighlight: true,
        autoclose: true

    });
    $('.editDate').val(date);




}

function saveEdit() {
    var index = $(this).closest('tr').index();

    var tasks = getTasks();
    var $elems = $(this).closest('tr');
    $task = $elems.find('.task');
    $date = $elems.find('.dueDate');

    //change buttons
    $save = $elems.find('.saveEdit');
    $cancel = $elems.find('.cancelEdit');
    $save.removeClass('saveEdit');
    $cancel.removeClass('cancelEdit');
    $save.addClass('edit');
    $save.removeClass('btn-success');
    $cancel.addClass('delete');
    $save.html('<span class="glyphicon glyphicon-pencil" aria-hidden="true">');
    $cancel.html('Delete');


    newTask = $elems.find('.editTask').val();
    newDate = $elems.find('.editDate').datepicker('getUTCDate');

    newDate = newDate + "";
    newDate = newDate.split(' ');
    newDate.splice(4, 3);
    newDate = newDate.join(' ');
    tasks[index].taskName = newTask;
    tasks[index].dueDate = newDate;


    $task.html('').text(newTask);
    $date.html('').text(newDate);

    writeTasks(tasks);




    // console.log(newTask, newDate);
}

function cancelEdit() {
    var index = $(this).closest('tr').index();

    var tasks = getTasks();
    var $elems = $(this).closest('tr');

    $task = $elems.find('.task');
    $date = $elems.find('.dueDate');
    task = tasks[index].taskName;
    date = tasks[index].date;
    $task.text(task);
    $date.text(date);

    //change buttons
    $save = $elems.find('.saveEdit');
    $cancel = $elems.find('.cancelEdit');
    $save.removeClass('saveEdit');
    $cancel.removeClass('cancelEdit');
    $save.addClass('edit');
    $save.removeClass('btn-success');
    $cancel.addClass('delete');
    $save.html('<span class="glyphicon glyphicon-pencil" aria-hidden="true">');
    $cancel.html('Delete');



}

function deleteCompleted() {
  var tasks = getTasks();

  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].isComplete) {
      tasks.splice(i,1);
    }
  }
  writeTasks(tasks);
  renderTasks(tasks);

}



