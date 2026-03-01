let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleSection(id) {
    let section = document.getElementById(id);
    if (section.style.display === "none")
        section.style.display = "block";
    else
        section.style.display = "none";
}

function addTask() {
    let text = document.getElementById("taskInput").value;
    let time = document.getElementById("taskTime").value;

    if (text === "" || time === "") {
        alert("Enter task with time");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        time: time,
        completed: false,
        completedAt: ""
    });

    saveTasks();
    document.getElementById("taskInput").value = "";
    document.getElementById("taskTime").value = "";
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function completeTask(id) {
    let task = tasks.find(task => task.id === id);
    task.completed = true;
    task.completedAt = new Date().toLocaleString();
    saveTasks();
    renderTasks();
}

function editTask(id) {
    let task = tasks.find(task => task.id === id);

    let newText = prompt("Edit Task:", task.text);
    let newTime = prompt("Edit Date & Time (YYYY-MM-DDTHH:MM):", task.time);

    if (newText && newTime) {
        task.text = newText;
        task.time = newTime;
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {

    document.getElementById("todayList").innerHTML = "";
    document.getElementById("tomorrowList").innerHTML = "";
    document.getElementById("upcomingList").innerHTML = "";
    document.getElementById("completedList").innerHTML = "";

    let today = new Date().toDateString();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowStr = tomorrow.toDateString();

    tasks.forEach(task => {

        let taskDate = new Date(task.time).toDateString();
        let li = document.createElement("li");

        if (task.completed) {
            li.innerHTML = `${task.text} - Completed at ${task.completedAt}`;
            li.classList.add("completed");
            document.getElementById("completedList").appendChild(li);
        } else {
            li.innerHTML = `
                <div>
                    ${task.text}<br>
                    <small>${new Date(task.time).toLocaleString()}</small>
                </div>
                <div>
                    <button class="edit" onclick="editTask(${task.id})">Edit</button>
                    <button class="complete" onclick="completeTask(${task.id})">Mark as Completed</button>
                    <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;

            if (taskDate === today)
                document.getElementById("todayList").appendChild(li);
            else if (taskDate === tomorrowStr)
                document.getElementById("tomorrowList").appendChild(li);
            else
                document.getElementById("upcomingList").appendChild(li);
        }
    });
}

renderTasks();