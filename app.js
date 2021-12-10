const newTodoForm = document.querySelector("form#newTodoForm");
const newTodoText = document.querySelector("input[type='text']");
const todoList = document.querySelector("#todoList");
let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

//Add todos from local storage
for (let todoObject of storedTodos) {
	let { todo, completed } = todoObject;
	createTodo(todo, completed);
}

function createTodo(todoText, completed) {
	//Creating todo and adding it to the list
	const newTodo = document.createElement("li");
	const newRemoveButton = document.createElement("button");
	newTodo.innerText = todoText;
	newTodo.completed = completed;
	newRemoveButton.innerText = "Remove Todo";
	newTodo.append(newRemoveButton);
	if (completed) {
		newTodo.classList.add("done");
	}
	todoList.append(newTodo);
}

//Add a new todo (by submitting a form)
newTodoForm.addEventListener("submit", function (event) {
	event.preventDefault();
	//Check if the input is empty
	if (newTodoText.value.trim()) {
		createTodo(newTodoText.value, false);
		const newTodoObject = { todo: newTodoText.value, completed: false };
		storedTodos.push(newTodoObject);
		localStorage.setItem("todos", JSON.stringify(storedTodos));
		newTodoForm.reset();
	} else {
		//Alert that the user must enter a todo
		alert("Please enter a Todo");
	}
});

todoList.addEventListener("click", function (event) {
	let clickedTodo = event.target;
	if (clickedTodo.tagName === "LI") {
		//Mark a todo as completed (cross out the text of the todo)
		clickedTodo.classList.toggle("done");
		clickedTodo.completed = !clickedTodo.completed;
		//Update completed status in local storage
		for (let i in storedTodos) {
			if (storedTodos[i].todo === clickedTodo.firstChild.nodeValue) {
				storedTodos[i].completed = clickedTodo.completed;
			}
		}
	} else if (clickedTodo.tagName === "BUTTON") {
		//Remove a todo
		clickedTodo.parentElement.remove();
		for (let i in storedTodos) {
			let todoText = clickedTodo.parentElement.firstChild.nodeValue;
			if (storedTodos[i].todo === todoText) {
				storedTodos.splice(i, 1);
			}
		}
	}
	//Update Local Storage
	localStorage.setItem("todos", JSON.stringify(storedTodos));
});
