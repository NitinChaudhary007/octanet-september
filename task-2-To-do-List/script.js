document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();
  if (task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.onclick = function() {
      deleteTask(li);
    };

    li.appendChild(deleteBtn);
    li.onclick = function() {
      toggleComplete(li);
    };

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = '';
  }
}

function deleteTask(taskElement) {
  taskElement.remove();
  saveTasks();
}

function toggleComplete(taskElement) {
  taskElement.classList.toggle('completed');
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  const taskList = document.getElementById('taskList').children;
  for (let task of taskList) {
    tasks.push({
      text: task.firstChild.textContent,
      completed: task.classList.contains('completed')
    });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');
  for (let task of tasks) {
    const li = document.createElement('li');
    li.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.onclick = function() {
      deleteTask(li);
    };

    if (task.completed) {
      li.classList.add('completed');
    }

    li.appendChild(deleteBtn);
    li.onclick = function() {
      toggleComplete(li);
    };

    taskList.appendChild(li);
  }
}
