const btn = document.querySelector("#btn");
const search = document.querySelector("input");
const ul = document.querySelector("ul");
let tasks = [];

const showTask = () => {
  ul.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.innerText = tasks[i].name;
    if (tasks[i].completed) li.classList.add('check');
    li.id = tasks[i].id;
    ul.append(li);
  }
};

if (localStorage.getItem("keyName")) {
  tasks = JSON.parse(localStorage.getItem("keyName"));
  showTask();
}

const doTask = () => {
  const list = search.value;
  if (list !== "") {
    const taskObject = {
      id: Math.random() * 7982389 + list,
      name: list,
      completed: false,
    };
    tasks.push(taskObject);
    search.value = "";
    showTask();
    localStorage.setItem("keyName", JSON.stringify(tasks));
  }
};

btn.addEventListener("click", doTask);
search.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    doTask();
  }
});

ul.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("check");
    const taskId = e.target.id;
    const currentTask = tasks.find((task) => task.id == taskId);
    currentTask.completed = !currentTask.completed;
    localStorage.setItem("keyName", JSON.stringify(tasks));
    showTask();
  }
});
