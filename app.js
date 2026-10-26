const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task-button');
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  //innerText (not innerHTML) because user input must be shown as text, not parsed as markup
  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, setTaskComplete);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditing = listItem.classList.contains('edit-mode');
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const setTaskComplete = function () {
  const listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, setTaskIncomplete);
};

const setTaskIncomplete = function () {
  //When the checkbox is unchecked
  const listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, setTaskComplete);
};

addButton.onclick = addTask;

const bindTaskEvents = function (listItem, setTaskStatus) {
  const checkbox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = setTaskStatus;
};

const bindListEvents = function (list, setTaskStatus) {
  for (const listItem of list.children) {
    bindTaskEvents(listItem, setTaskStatus);
  }
};

bindListEvents(incompleteTasksList, setTaskComplete);
bindListEvents(completedTasksList, setTaskIncomplete);
