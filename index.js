// Logic of addFunction

//access to DOM elements
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const inputField = document.getElementsByClassName("todoInput")
const saveButton = document.getElementById("save-button")
const loadButton = document.getElementById("load-button")

function saveList() {
  const items = [];
  const dates = [];
  const checked = [];
  const localStorageArray = [];
  const inputTodoArray = Array.from(document.getElementsByClassName("todoInput"))
  const inputDateArray = Array.from(document.getElementsByClassName("date"))
  inputTodoArray.forEach((element) => items.push(element.value));
  inputDateArray.forEach((element) => dates.push(element.innerHTML));

  for (let i = 0; i < items.length; i++) {
    localStorageArray.push([items[i], dates[i]]);
  }
  localStorage.setItem("Task-List", JSON.stringify(localStorageArray));
}




function loadList() {
  taskList.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("Task-List"));
  console.log(items);
  if (items) {
    
    items.forEach((element) => {
      createLiElement(element[0], element[1])
    });
  }
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDate = new Date();

const dayOfWeek = daysOfWeek[currentDate.getDay()];
const dayOfMonth = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString().slice(2);

const formattedDate = `${dayOfWeek}, ${dayOfMonth}.${month}`;
console.log(formattedDate)

function createLiElement(text="Was gibts?", date=formattedDate) {
  const li = document.createElement("li");
  li.innerHTML = `
		<label class="option">
			<input type="checkbox" />
			<span class="custom-checkbox "></span>
		</label>
		<div class="todo-name-and-date">
			<input type="text" placeholder="" class="todoInput" value="${text}">
			<p class="date">${date}</p>
		</div>
`;

  taskList.appendChild(li);
    const delButton = document.createElement("button");
    delButton.innerHTML = `<img src="./assets/Icon-Set-Filled.png" alt="" />`;

    delButton.addEventListener("click", function () {
      li.remove();
      saveList();
      // loadList();
    });
    li.appendChild(delButton);
  addEventListenerToElement(li);
}

//create list element by click on add button
addButton.addEventListener("click", function () {
  createLiElement();
});


function addEventListenerToElement(element) {
  element.addEventListener('focusout', () => {
    saveList();
  })
}


const allInputs = Array.from(inputField);
allInputs.forEach((element) => {
  element.addEventListener("mouseover", () => {
    console.log("456465")
  })
})

//Logic of progressbar
const progress_bars = document.querySelectorAll(".progress");

progress_bars.forEach((bar) => {
  setTimeout(() => {
    const { size } = bar.dataset;
    bar.style.width = `${size}%`;
  }, 1000);
});

loadList();