const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Utility function to log tasks in localStorage to console
function logTasksToConsole() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Current Tasks in Local Storage:", tasks);
}

// Load tasks from local storage on page load
const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
storedTasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <p>${task.task}</p>
        <p>Priority: ${task.priority}</p>
        <p>Deadline: ${task.deadline}</p>
        <button class="achieve-task">Achieve</button>
        <button class="delete-task">Delete</button>
    `;
    if (task.achieved) {
        taskItem.classList.add("achieved");
        taskItem.querySelector("button.achieve-task").disabled = true;
    }
    taskList.appendChild(taskItem);
});

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;

    if (task.trim() === "" || deadline === "") {
        alert("Please enter a task and select a deadline.");
        return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        alert("Please select a deadline in the future.");
        return;
    }

    const taskData = {
        task: task,
        priority: priority,
        deadline: deadline,
        achieved: false,
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    logTasksToConsole(); // Log updated tasks to the console

    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <p>${task}</p>
        <p>Priority: ${priority}</p>
        <p>Deadline: ${deadline}</p>
        <button class="achieve-task">Achieve</button>
        <button class="delete-task">Delete</button>
    `;
    taskList.appendChild(taskItem);

    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("achieve-task")) {
      const taskItem = event.target.parentElement;
      event.target.innerHTML = "&#10003;"; // Replace button text with a tick
      event.target.disabled = true; // Disable the button
      const taskText = taskItem.querySelector("p").textContent;
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.map((task) => {
        if (task.task === taskText) {
          task.achieved = true;
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      logTasksToConsole(); // Log updated tasks to the console
    }
    if (event.target.classList.contains("delete-task")) {
      const taskItem = event.target.parentElement;
      const taskText = taskItem.querySelector("p").textContent;
      taskItem.remove();
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter((task) => task.task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      logTasksToConsole(); // Log updated tasks to the console
    }
  });
  