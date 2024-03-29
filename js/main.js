var taskList = new TaskList();
var validation = new Validation();
getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

getEle("addItem").addEventListener("click", function () {
    var taskName = getEle("newTask").value;
    var isValid = validation.checkInput(taskName, "notiInput", "(*) Task empty") &&
        validation.checkExist(taskName, "notiInput", "(*) Task already existed", taskList.arr);
    if (!isValid) return;
    var task = new Task(taskName, "todo");
    taskList.addTask(task);
    createTable(taskList.arr);
    setLocalStorage();
    getEle("newTask").value = "";
    getEle("newTask").focus();
    alert("Add Success!");
});

function createTable(arr) {
    var todoContent = "";
    var completedContent = "";
    arr.forEach(function (item, index) {
        var content = `
        <li>
            <span>${item.taskName}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteToDo(${item.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="changeStatus(${item.id})">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
        `
        if (item.status === "todo")
            todoContent += content;
        else
            completedContent += content;
    })
    getEle("todo").innerHTML = todoContent;
    getEle("completed").innerHTML = completedContent;
}

function setLocalStorage() {
    var arr = JSON.stringify(taskList.arr);
    localStorage.setItem("Task List", arr);
}

function getLocalStorage() {
    if (localStorage.getItem("Task List")) {
        taskList.arr = JSON.parse(localStorage.getItem("Task List"));
        createTable(taskList.arr);
    }
}

function deleteToDo(id) {
    taskList.deleteTask(id);
    createTable(taskList.arr);
    setLocalStorage();
    alert("Delete Success!");
}

function changeStatus(id) {
    var task = taskList.getTaskById(id);
    if (task.status === "todo")
        task.status = "completed";
    else
        task.status = "todo";
    taskList.updateTask(task);
    createTable(taskList.arr);
    setLocalStorage();
    alert("Change Status Success!");
}





