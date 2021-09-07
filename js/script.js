// Define UI elements

let form = document.querySelector('#form-id');
let taskInput = document.querySelector('#new-task');
let filter = document.querySelector('#task-filter');
let taskList = document.querySelector('#task-ul');
let clearBtn = document.querySelector('#clear-task-btn');

// =============== Define Event Listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getasks);

// =============== Define Function
// add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a new Task');
  } else {
    // create <li>
    let li = document.createElement('li');

    li.appendChild(document.createTextNode(taskInput.value + ' '));
    taskList.appendChild(li);

    let crossLink = document.createElement('a');
    crossLink.setAttribute('href', '#');
    crossLink.innerText = 'X';

    li.appendChild(crossLink);

    // Store Tasks in Local Storage
    storeTasksIntoLocalStorage(taskInput.value);

    // clear written tasks into input feild
    taskInput.value = '';
  }
  e.preventDefault();
}

// remove task
function removeTask(e) {
  if (e.target.hasAttribute('href')) {
    if (confirm('Are you sure?')) {
      let ele = e.target.parentElement;
      ele.remove();
      // console.log(ele);

      removeFromLocalServer(ele);
    }
  }
}

// clear tasks
function clearTask(e) {
  // taskList.innerHTML = '';
  // or
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear local storage
  localStorage.clear();
}

// filter task
function filterTask(e) {
  let text = e.target.value.toLowerCase();
  // console.log(text)
  document.querySelectorAll('ul li').forEach((task) => {
    // console.log(task);
    let taskText = task.firstChild.textContent;
    let lowerTaskText = taskText.toLowerCase();
    if (lowerTaskText.indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Store Tasks in Local Storage
function storeTasksIntoLocalStorage(task) {
  let allTasks;
  if (localStorage.getItem('allTasks') === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(localStorage.getItem('allTasks'));
  }

  allTasks.push(task);

  // set data into brwoser storage
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function getasks() {
  let allTasks;
  if (localStorage.getItem('allTasks') === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(localStorage.getItem('allTasks'));
  }

  allTasks.forEach((task) => {
    let li = document.createElement('li');

    li.appendChild(document.createTextNode(task + ' '));
    taskList.appendChild(li);

    let crossLink = document.createElement('a');
    crossLink.setAttribute('href', '#');
    crossLink.innerText = 'X';

    li.appendChild(crossLink);
  });
}

// Remove tasks from local server
function removeFromLocalServer(task) {
  let allTasks;
  if (localStorage.getItem('allTasks') === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(localStorage.getItem('allTasks'));
  }

  let myTaskLi = task;
  // console.log(taskLi)
  myTaskLi.lastChild.remove(); // <a>X</a>
  //or
  // taskLi.removeChild(taskLi.lastChild)  // <a>X</a>

  allTasks.forEach((taskItem, index) => {
    if (myTaskLi.textContent.trim() === taskItem) {
      allTasks.splice(index, 1);
      // trim() function dane bamer space delete kore dey
    }
  });

  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}
