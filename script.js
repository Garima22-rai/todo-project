// ========== Welcome Page ==========
function saveName() {
    const name = document.getElementById('name-input').value.trim();
    if(name !== "") {
        localStorage.setItem('userName', name);
        window.location.href = 'add.html';
    } else {
        alert("Please enter your name!");
    }
}

// ========== Load Name (Add/List Page) ==========
function loadName() {
    const name = localStorage.getItem('userName') || "Your";
    const header = document.getElementById('header-name');
    if(header) header.innerText = ${name}'s To-Do List 🌟;
}

// ========== Add Task ==========
function addTask() {
    const taskInput = document.getElementById('task-input').value.trim();
    const category = document.getElementById('category-select').value;
    if(taskInput === "") { alert("Enter task!"); return; }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({text: taskInput, category: category, completed: false});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('task-input').value = "";
    alert("Task Added!");
}

// ========== Navigate to Task List ==========
function goToList() {
    window.location.href = 'list.html';
}

// ========== Load Tasks (Task List Page) ==========
function loadTasks() {
    loadName();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const list = document.getElementById('task-list');
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = ${task.text} <span class="task-category category-${task.category}">${task.category}</span>;

        if(task.completed) li.classList.add('completed');

        // Toggle complete
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            tasks[index] = task;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

// ========== Clear Completed ==========
function clearCompleted() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}