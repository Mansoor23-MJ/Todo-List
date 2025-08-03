
document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.getElementById('input-box');
  const taskList = document.getElementById('task-list');
  const taskCount = document.getElementById('task-count');
  const addBtn = document.querySelector('.add-btn');
  const deleteAllBtn = document.querySelector('.delete-all');

  loadTasks();

  addBtn.addEventListener('click', addTask);

  deleteAllBtn.addEventListener('click',function ()  {
    localStorage.removeItem('tasks');
    taskList.innerHTML = '';
    showEmptyMessageIfNeeded();
    updateTaskCount();
  });

  inputBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') return;

    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    saveTasksToStorage(tasks);
    inputBox.value = '';
    renderTasks(tasks);
  }

  function toggleComplete(index) {
    const tasks = getTasksFromStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToStorage(tasks);
    renderTasks(tasks);
  }

  function deleteTask(index) {
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    renderTasks(tasks);
  }

  function renderTasks(tasks) {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
      showEmptyMessageIfNeeded();
      updateTaskCount();
      return;
    }

    tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'todo-item';
      if (task.completed) taskItem.classList.add('completed');

      const taskPara = document.createElement('p');
      taskPara.innerText = task.text;

      const actions = document.createElement('div');
      actions.className = 'actions';

      const completeBtn = document.createElement('span');
      completeBtn.innerHTML = '✔️';
      completeBtn.title = 'Mark as Complete';
      completeBtn.addEventListener('click', () => toggleComplete(index));

      const deleteBtn = document.createElement('span');
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Delete Task';
      deleteBtn.classList.add('delete');
      deleteBtn.addEventListener('click', () => deleteTask(index));

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      taskItem.appendChild(taskPara);
      taskItem.appendChild(actions);

      taskList.appendChild(taskItem);
    });

    updateTaskCount();
  }

  function updateTaskCount() {
    const tasks = getTasksFromStorage();
    taskCount.textContent = `Total Tasks: ${tasks.length}`;
  }

  function showEmptyMessageIfNeeded() {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty';
    emptyDiv.textContent = 'Empty Todo List';
    taskList.appendChild(emptyDiv);
  }

  function getTasksFromStorage() {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  }

  function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = getTasksFromStorage();
    renderTasks(tasks);
  }
});
