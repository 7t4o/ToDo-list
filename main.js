let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let lst = document.getElementById("list");
let count = 1;

function getText() {inp.value !== "" ? createTodo(inp.value) :"";}

function createTodo(text) {
    inp.value = "";
    let toDo = document.createElement("div");
    toDo.id = "toDo";
    toDo.setAttribute("count", count+"")
    toDo.appendChild(document.createTextNode(text));

    let toDo_btn = document.createElement("i");
    toDo_btn.className = "fa-solid fa-circle-xmark";
    toDo_btn.id = "toDo_btn";
    toDo_btn.setAttribute("count", count+"")
    toDo.appendChild(toDo_btn);
    lst.appendChild(toDo);

    count++;
    deleteTodo();
}

function deleteTodo() {
    let lst_i = document.querySelectorAll("#toDo i");
    lst_i.forEach(ele => {
        ele.addEventListener('click', function() {
            let elementToDelete = document.querySelector(`[count="${this.getAttribute('count')}"]`);
            elementToDelete ? elementToDelete.remove(): "";
        });
    });
}

document.addEventListener('keypress', function(e) {if (e.key === 'Enter') {btn.click();}});

btn.addEventListener("click", getText)