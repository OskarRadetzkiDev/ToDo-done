
// Logic of addFunction

//access to DOM elements
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

function saveList() {
	const items = []
	taskList.querySelectorAll("li").forEach(li => items.push(li))
	localStorage.setItem("Task-List", JSON.stringify(items));
}

function loadList() {
	const items = JSON.parse(localStorage.getItem("Task-List"))
}

//create list element by on click
addButton.addEventListener("click", function() {
	const li = document.createElement("li");
	li.innerHTML =
	`<label class="option">
	  <input type="checkbox" />
	  <span class="custom-checkbox"></span>
	</label>
	<div class="todo-name-and-date">
	  <input type="text" placeholder="type here">
	  <p class="date">Mon, den 04.12</p>
		</div>`

//create delButton for each list item
	const delButton = document.createElement("button");
	delButton.innerHTML =
	`<img src="./assets/Icon-Set-Filled.png" alt="" />`
	delButton.addEventListener("click", function() {
		li.remove()
		saveList()
	})

//add delButton to each list element
	li.appendChild(delButton)
//add list item to taskList(ul)
	taskList.appendChild(li)
	saveList()
})















//Logic of progressbar
const progress_bars = document.querySelectorAll('.progress');

progress_bars.forEach(bar => {
	setTimeout(() => {
		const { size } = bar.dataset;
		bar.style.width = `${size}%`
	}, 1000);
});