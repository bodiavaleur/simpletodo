$(function () {
    const info = $('.info span');
    const buttonAdd = $('.input-todo i')

    /* Make information text opaque on mouseover or tap
       and return to default state on mouseout */
    animateOpacity(info, 'mouseover', 1);
    animateOpacity(info, 'mouseout', .3);

    /* Make button icon opaque on mouseover or tap
       and return to default state on mouseout */
    animateOpacity(buttonAdd, 'mouseover', 1);
    animateOpacity(buttonAdd, 'mouseout', .3);

    addTodo();
    todoComplete();
    todoRemove();
});


/* Functions for use */

function animateOpacity(tag, event, val) {
    /* Animate opacity on some event for some element */
    $(tag).on(event, function () {
        $(tag).animate({
            opacity: val
        }, 200);
    });
}

function toggleLabel() {
    /* Check if list is empty
     * and then show or hide labels 
     * "In process" and "Completed" */
    const labelProcess = $('#label-process');
    const labelCompleted = $('#label-completed')
    const lbprocLength = $('.list-todo ul').prop('childElementCount');
    const lbcompLength = $('.list-completed ul').prop('childElementCount');

    // Show / hide "In process"
    lbprocLength ? labelProcess.show() : labelProcess.hide();
    // Show / hide "Completed"
    lbcompLength ? labelCompleted.show() : labelCompleted.hide();
}

function addTodo() {
    /* Check string from input, add to list, then clear input */
    const button = $('.input-todo button');
    const input = $('.input-todo input')
    const list = $('.list-todo ul');
    const label = $('#label-process');
    let todoId = 0;

    // Add to-do by click
    button.on('click', function () {
        if (checkTodo(input.val())) {
            // Assign id to the to-do and add it to list
            list.append(`<li id="todo-${todoId++}">${input.val()}</li>`);
            // Remove text from input
            input.val(null);
            // Show label "In process"
            toggleLabel();
        }
    })

    // Add to-do by pressing enter
    input.keypress(function (e) {
        // If enter is pressed
        if (e.which == 13) {
            button.click()
        }
    })
}

function checkTodo(todo) {
    /* Check to-do for existence and length */
    if (todo && todo.length <= 100) {
        return true;
    } else {
        return false;
    }
}

function todoComplete() {
    /* Add to-do to list with completed to-dos */
    $('body').on('click', '.list-todo li', function () {
        // Move to-do to completed list
        $(this).appendTo('.list-completed ul')
        // Hide label "In process" in case of empty to-do list
        toggleLabel();
    })
}

function todoRemove() {
    /* Remove to-do from completed list */
    $('body').on('click', '.list-completed li', function () {
        $(this).remove();
        // Hide label "Completed" in case of empty completed list
        toggleLabel();
    })
}