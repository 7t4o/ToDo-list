let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let lst = document.getElementById("list");
let count = 1;

function getText() {
    if(inp.value === ""){
        return false;
    }else{
        createTodo(inp.value);
        inp.value = "";
    }
}

function createTodo(text) {
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
            const dataId = this.getAttribute('count');
            const elementToDelete = document.querySelector(`[count="${dataId}"]`);
            if (elementToDelete) {
                elementToDelete.remove();
            }
        });
    });
}



document.addEventListener('keypress', function(e) {if (e.key === 'Enter') {btn.click();}});

btn.addEventListener("click", getText)