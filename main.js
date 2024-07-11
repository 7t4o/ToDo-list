let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let lst = document.getElementById("list");
let tasks = [];
let count = 1;


if(window.localStorage.getItem("tasks")){
    let tasks = JSON.parse(window.localStorage.getItem("tasks"));
    tasks.forEach((task) => createTodo(task));
    count = tasks.length ? tasks[tasks.length-1].id + 1 : 1;
}

function getText(val) {
    if(val !== ""){
        let obj = createObj(val);
        createTodo(obj);
        if(window.localStorage.getItem("tasks")){
            tasks = JSON.parse(window.localStorage.getItem("tasks"));
            tasks.push(obj);
            window.localStorage.setItem("tasks", JSON.stringify(tasks));
        }else{
            tasks.push(obj);
            window.localStorage.setItem("tasks", JSON.stringify(tasks))
        }
        inp.value = "";
    }
}

function createObj(text) {
    let obj = {id:count, content:text};
    count++;
    return obj;
}

function createTodo(obj) {
    let toDo = document.createElement("div");
    toDo.id = "toDo";
    toDo.setAttribute("count", obj.id+"")
    toDo.appendChild(document.createTextNode(obj.content));

    let divBtns = document.createElement("div");
    divBtns.className = "divBtns";

    let del_btn = document.createElement("i");
    del_btn.className = "fa-solid fa-circle-xmark";
    del_btn.id = "toDo_btn";
    del_btn.setAttribute("count", obj.id+"")
    divBtns.appendChild(del_btn);

    let edit_btn = document.createElement("i");
    edit_btn.className = "fa-solid fa-pen";
    edit_btn.id = "edit_btn";
    edit_btn.setAttribute("count", obj.id+"")
    divBtns.prepend(edit_btn);

    toDo.appendChild(divBtns);
    lst.appendChild(toDo);

    deleteTodo();
    editTodo();
}

function deleteTodo() {
    let lst_i = document.querySelectorAll(".divBtns #toDo_btn");
    lst_i.forEach(ele => {
        ele.addEventListener('click', function() {
            let elementToDelete = document.querySelector(`[count="${this.getAttribute('count')}"]`);
            elementToDelete ? elementToDelete.remove(): "";
            if(window.localStorage.getItem("tasks")){
                tasks = JSON.parse(window.localStorage.getItem("tasks"));
                tasks = tasks.filter((task) => task.id != this.getAttribute('count'))
                window.localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        });
    });
}

function editTodo() {
    let lst_i = document.querySelectorAll(".divBtns #edit_btn");
    lst_i.forEach(ele => {
        ele.addEventListener('click', function() {
            let elementToEdit = document.querySelector(`[count="${this.getAttribute('count')}"]`);
            if(elementToEdit){
                inp.value = elementToEdit.textContent;
                inp.focus();
                elementToEdit.remove();
            }
            if(window.localStorage.getItem("tasks")){
                tasks = JSON.parse(window.localStorage.getItem("tasks"));
                tasks = tasks.filter((task) => task.id != this.getAttribute('count'))
                window.localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        });
    });
}

document.addEventListener('keypress', function(e) {if (e.key === 'Enter') {btn.click();}});

btn.addEventListener("click",() => getText(inp.value))

inp.addEventListener('paste', (event) => {
    event.preventDefault();
    let pastedText = (event.clipboardData || window.clipboardData).getData('text');
    let cleanedText = pastedText.replace(/\r/g, '');
    let linesArray = cleanedText.split('\n');
    linesArray.forEach((itm) => getText(itm));
});