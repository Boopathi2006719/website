// Load saved data
window.onload = function () {
    let savedUser = localStorage.getItem("user");
    if (savedUser) {
        document.getElementById("welcome").innerText = "Welcome back " + savedUser;
    }

    showTasks();
};

// Login system
function login() {
    let name = document.getElementById("username").value;
    localStorage.setItem("user", name);
    document.getElementById("welcome").innerText = "Welcome " + name;
}

// Add Task
function addTask() {
    let task = document.getElementById("task").value;

    if (task === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

// Show Tasks
function showTasks() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((t, index) => {
        let li = document.createElement("li");
        li.innerText = t;

        let btn = document.createElement("button");
        btn.innerText = "❌";
        btn.onclick = function () {
            deleteTask(index);
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}

// Delete Task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

