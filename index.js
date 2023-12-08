// Logic of addFunction

// access to DOM elements
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const inputField = document.getElementsByClassName("todoInput");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");

let checkedLength = 0;

function setCheckedTasks() {
  let tasks = JSON.parse(localStorage.getItem("Task-List"));
  checkedLength = 0;
  tasks.forEach((element) => {
    element[2] === true ? checkedLength++ : undefined;
  });
}
setCheckedTasks();
setTaskCounter();

function setTaskCounter() {
  let tasks = JSON.parse(localStorage.getItem("Task-List"));
  let taskCounter = document.getElementById("task-counter");
  taskCounter.innerText = `${checkedLength} of ${tasks.length} Tasks`;

  if (tasks.length > 0) {
    let percent = Math.round((checkedLength / tasks.length) * 100);
    const progressName = document.getElementById("progress-name");
    progressName.innerText = `Tasks completed: ${percent}%`;

    setProgressBar(percent);
    updateProgessbar();
  }
}

function setProgressBar(percentvalue) {
  document.getElementById("progress-bar-div").innerHTML = `
  <div id="progress-bar" data-size="${percentvalue}" class="progress"></div>`;
}

// save list
function saveList() {
  const items = [];
  const dates = [];
  const checked = [];
  const localStorageArray = [];
  const inputTodoArray = Array.from(document.getElementsByClassName("todoInput"));
  const inputDateArray = Array.from(document.getElementsByClassName("date"));
  const inputCheckArray = Array.from(document.getElementsByClassName("inputCheck"));

  inputTodoArray.forEach((element) => items.push(element.value));
  inputDateArray.forEach((element) => dates.push(element.innerHTML));
  inputCheckArray.forEach((element) => checked.push(element.checked));

  for (let i = 0; i < items.length; i++) {
    localStorageArray.push([items[i], dates[i], checked[i]]);
  }
  localStorage.setItem("Task-List", JSON.stringify(localStorageArray));
  setCheckedTasks();
  setTaskCounter();
}

// load list
function loadList() {
  taskList.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("Task-List"));
  if (items) {
    items.forEach((element) => {
      element[2] === true ? (element[2] = "checked") : false;
      createLiElement(element[0], element[1], element[2]);
    });
  }
  setCheckedTasks();
  setTaskCounter();
}

// date
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDate = new Date();
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const dayOfMonth = currentDate.getDate().toString().padStart(2, "0");
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const year = currentDate.getFullYear().toString().slice(2);

const formattedDate = `${dayOfWeek}, ${dayOfMonth}.${month}`;

// create list element
function createLiElement(text = "", date = formattedDate, checked) {
  const li = document.createElement("li");
  li.innerHTML = `
		<label class="option">
			<input type="checkbox" class="inputCheck" ${checked}/>
			<span class="custom-checkbox"></span>
		</label>
		<div class="todo-name-and-date">
			<input type="text" placeholder="" class="todoInput" value="${text}">
			<p class="date">${date}</p>
		</div>
`;

  taskList.appendChild(li);
  const delButton = document.createElement("button.delbutton");
  delButton.innerHTML = `<img src="./assets/Icon-Set-Filled.png" alt="" />`;

  delButton.addEventListener("click", function () {
    li.remove();
    saveList();
    // loadList();
  });
  li.appendChild(delButton);
  addEventListenerToElement(li);
}

// create list element by click on add button
addButton.addEventListener("click", function () {
  createLiElement();
  setFocus();
  saveList();
  setTaskCounter();
});

// add event listener to element
function addEventListenerToElement(element) {
  element.addEventListener("focusout", () => {
    saveList();
  });
  element.addEventListener("click", () => {
    saveList();
    setCheckedTasks();
    setTaskCounter();
  });
  element.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      createLiElement();
      setFocus();
    }
  });
}

function setFocus() {
  inputField[inputField.length - 1].focus();
}

//Logic of progressbar
function updateProgessbar() {
  const progress_bars = document.querySelectorAll(".progress");

  progress_bars.forEach((bar) => {
    setTimeout(() => {
      const { size } = bar.dataset;
      bar.style.width = `${size}%`;
    }, 10);
  });
}
// load list by loading page
loadList();
