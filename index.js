// Logic of addFunction

//access to DOM elements
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

function saveList() {
  const items = [];
  taskList.querySelectorAll("li").forEach((li) => items.push(li));
  localStorage.setItem("Task-List", JSON.stringify(items));
}

function loadList() {
  taskList.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("Task-List"));
  console.log(items);
  if (items) {
    items.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = element[0];
      taskList.appendChild(li);
    });
  }
}

function createLiElement(text, date) {
  const li = document.createElement("li");
  li.innerHTML = `
		<label class="option">
			<input type="checkbox" />
			<span class="custom-checkbox"></span>
		</label>
		<div class="todo-name-and-date">
			<input type="text" placeholder="" value="${text}">
			<p class="date">${date}</p>
		</div>
`;
  taskList.appendChild(li);
  const delButton = document.createElement("button");
  delButton.innerHTML = `<img src="./assets/Icon-Set-Filled.png" alt="" />`;

  delButton.addEventListener("click", function () {
    li.remove();
    saveList();
    loadList();
  });
  li.appendChild(delButton);
}

//create list element by on click
addButton.addEventListener("click", function () {
  const probe = [
    ["Hausaufgaben", "02.12.2023"],
    ["Hausaufgaben2", "04.12.2023"],
  ];
  localStorage.setItem("Task-List", JSON.stringify(probe));
  probe.forEach((element) => {
    createLiElement(element[0], element[1]);
  });
});

//Logic of progressbar
const progress_bars = document.querySelectorAll(".progress");

progress_bars.forEach((bar) => {
  setTimeout(() => {
    const { size } = bar.dataset;
    bar.style.width = `${size}%`;
  }, 1000);
});
