
const list = document.getElementById("taskList");

function addTask() {
 const input = document.getElementById("taskInput");
 if(input.value === "") return;
 const li = document.createElement("li");
 li.textContent = input.value;
 li.onclick = () => li.classList.toggle("completed");
 const del = document.createElement("button");
 del.textContent = "X";
 del.onclick = () => li.remove();
 li.appendChild(del);
 list.appendChild(li);
 input.value = "";
}
