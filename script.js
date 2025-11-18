window.onload = function () {
    showTasks();
};

// Add new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let now = new Date();
    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    let newTask = {
        text: taskValue,
        date: date,
        time: time,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    showTasks();
}

// Show tasks
function showTasks(filter = "all") {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        let li = document.createElement("li");

        li.innerHTML = `
            <div class="task-row">
                <span>${task.completed ? "✔️ " : ""}${task.text}</span>
                <div class="task-time">${task.date} | ${task.time}</div>
            </div>
            <div class="btns">
                <button class="complete-btn" onclick="markCompleted(${index})">Complete</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

function markCompleted(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks[index].completed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

// Filter tasks
function filterTasks(type) {
    showTasks(type);
}
