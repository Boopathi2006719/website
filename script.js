let filter = "all";

// Load
window.onload = showTasks;

// Add Task
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({ text: text, done: false });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";

    showTasks();
}

// Show Tasks
function showTasks() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let filtered = tasks.filter(t => {
        if (filter === "done") return t.done;
        if (filter === "pending") return !t.done;
        return true;
    });

    filtered.forEach((task, i) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = task.text;
        if (task.done) span.classList.add("completed");

        span.onclick = () => toggleTask(i);

        let edit = document.createElement("button");
        edit.innerText = "✏️";
        edit.onclick = () => editTask(i);

        let del = document.createElement("button");
        del.innerText = "❌";
        del.onclick = () => deleteTask(i);

        li.append(span, edit, del);
        list.appendChild(li);
    });

    updateCount(tasks);
}

// Toggle
function toggleTask(i) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[i].done = !tasks[i].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

// Delete
function deleteTask(i) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

// Edit
function editTask(i) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newText = prompt("Edit task:", tasks[i].text);
    if (newText) {
        tasks[i].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showTasks();
    }
}

// Search
function searchTask() {
    let search = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll("li");

    items.forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(search)
            ? "flex"
            : "none";
    });
}

// Filter
function filterTasks(type) {
    filter = type;
    showTasks();
}

// Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark");
}

// Counter
function updateCount(tasks) {
    let done = tasks.filter(t => t.done).length;
    document.getElementById("count").innerText =
        `Total: ${tasks.length} | Completed: ${done}`;
}

