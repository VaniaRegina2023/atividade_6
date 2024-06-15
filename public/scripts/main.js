document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
  
    document.getElementById('addTaskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('taskTitle').value;
      addTask(title);
    });
  });
  
  async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.textContent = task.title;
  
      const taskButtons = document.createElement('div');
      taskButtons.className = 'task-buttons';
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(task.id));
  
      taskButtons.appendChild(deleteButton);
      listItem.appendChild(taskButtons);
      taskList.appendChild(listItem);
    });
  }
  
  async function addTask(title) {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });
  
    if (response.ok) {
      document.getElementById('taskTitle').value = '';
      fetchTasks();
    }
  }
  
  async function deleteTask(id) {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      fetchTasks();
    }
  }
  