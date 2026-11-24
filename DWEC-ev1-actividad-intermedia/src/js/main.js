import editTemplateHTML from '../templates/ficha_edicion.html?raw';

const form = document.getElementById("task-form");
const input = document.getElementById("task-title");
const select = document.getElementById("task-priority");
const todoSection = document.getElementById("todo");
const inProgressSection = document.getElementById("in-progress");
const doneSection = document.getElementById("done");



function addTask(){    
    const article = document.createElement("article");
    const title = document.createElement("p");
    const category = document.createElement("span");
    const divActions = document.createElement("div");
    const btnNext = document.createElement("button");
    const btnDelete = document.createElement("button")

    article.classList.add("card");
    title.classList.add("card-title");
    category.classList.add("badge", `badge-${select.value}`);
    divActions.classList.add("card-actions");
    btnNext.classList.add("btn-next");
    btnDelete.classList.add("btn-delete");
    

    title.textContent = input.value;
    category.textContent = select.value;
    btnNext.textContent = "→";
    btnDelete.textContent = "🗑️";


    divActions.appendChild(btnNext);
    divActions.appendChild(btnDelete);

    article.appendChild(title);
    article.appendChild(category);
    article.appendChild(divActions);
    
    todoSection.appendChild(article);

    input.value="";
}

function addTodoColumn(article){
    const devActions = article.querySelector(".card-actions");

    let btnNext = devActions.querySelector(".btn-next");
    if(!btnNext){
        btnNext = document.createElement("button");
        btnNext.textContent = "→";
        btnNext.classList.add("btn-next");
        devActions.prepend(btnNext);
    }

    const btnPrev = devActions.querySelector(".btn-prev");
    if(btnPrev){
        btnPrev.remove();
    }
    
    todoSection.appendChild(article);
}

function addInProgressColumn(article){
    const divActions = article.querySelector(".card-actions");
    
    let btnPrev = article.querySelector(".btn-prev");
    if (btnPrev) {
        btnPrev.remove();
    }

    let btnNext = article.querySelector(".btn-next");
    if (btnNext){
        btnNext.remove();
    }

    btnNext = document.createElement("button")
    btnNext.textContent = "→";
    btnNext.classList.add("btn-next");
    divActions.prepend(btnNext);

    btnPrev = document.createElement("button");
    btnPrev.textContent = "←";
    btnPrev.classList.add("btn-prev");
    divActions.prepend(btnPrev);

    inProgressSection.appendChild(article);
}
function addDoneColumn(article){
    const btnNext = article.querySelector(".btn-next");
    btnNext.remove();
    doneSection.appendChild(article);

}
function containsTitle(title){
    if (title.trim() === "") {
        window.alert("El título no puede estar vacío");
        return false;
    }
    return true;
}
form.addEventListener("submit", function(event){
    event.preventDefault();
    
    if(!containsTitle(input.value)){
        return;
    }
    addTask();
});

function putInNextSection(event){
    const article = event.target.closest(".card");
    const currentColumn = article.closest(".column");
    const nextColumn = currentColumn.nextElementSibling;

    if(nextColumn){       
        if(nextColumn.id==="in-progress"){
            addInProgressColumn(article);
        }else{
            addDoneColumn(article);
        }
    }
}

function putInPreviousSection(event){
    const article = event.target.closest(".card");
        const currentColumn = article.closest(".column");
        const previousColumn = currentColumn.previousElementSibling
        if(previousColumn){
            if(previousColumn.id==="in-progress"){
                addInProgressColumn(article);
            }else{
                addTodoColumn(article);
            }
        }
}

function deleteTask(event){
    const article = event.target.closest(".card");
        
        if(article){
            article.remove();
        }
}

function editTask(event){
    const article = event.target.closest(".card");
    
    if(article.querySelector("input[name='edit-title']")){
        return; 
    }
  
    const titleElement = article.querySelector(".card-title");
    const badge = article.querySelector(".badge");
 
    article.dataset.originalTitle = titleElement.textContent;
    article.dataset.originalPriority = badge.textContent;
    article.innerHTML = editTemplateHTML;

    const inputEdit = article.querySelector("input[name='edit-title']");
    const selectEdit = article.querySelector("select[name='edit-priority']");

    if (inputEdit) {
        inputEdit.value = titleElement.textContent; 
        inputEdit.focus(); 
    }

    if (selectEdit) {
        selectEdit.value = badge.textContent; 
    }
}

function returnTask(article, newTitle, newPriority, buttonsHTML){
    article.innerHTML = `
        <p class="card-title">${newTitle}</p>
        <span class="badge badge-${newPriority}">${newPriority}</span>
        <div class="card-actions">
            ${buttonsHTML}
        </div>
    `;
}
function returnActivityButton(currentColumn){
    const columnId = currentColumn ? currentColumn.id : "todo";

    let buttonsHTML = `<button class="btn-delete">🗑️</button>`;
    
    if (columnId === "todo") {
        buttonsHTML = `<button class="btn-next">→</button>` + buttonsHTML;
    } else if (columnId === "in-progress") {
        buttonsHTML = `<button class="btn-prev">←</button><button class="btn-next">→</button>` + buttonsHTML;
    } else if (columnId === "done") {
        buttonsHTML = `<button class="btn-prev">←</button>` + buttonsHTML;
    }

    return buttonsHTML;
}


function saveTask(event){
    const article = event.target.closest(".card");
    
    const inputEdit = article.querySelector("input[name='edit-title']");
    const selectEdit = article.querySelector("select[name='edit-priority']");
        
    const newTitle = inputEdit.value;
    const newPriority = selectEdit.value;

    if(!containsTitle(newTitle)){
        return;
    }
    
    const currentColumn = article.closest(".column");
    
    const buttonsHTML = returnActivityButton(currentColumn);

    returnTask(article, newTitle, newPriority, buttonsHTML);
    
}
function cancelTask(target){
    const article = target instanceof window.Element ? target : target.target.closest(".card");
    if (!article) return;

    const originalTitle = article.dataset.originalTitle || "";
    const originalPriority = article.dataset.originalPriority || "media";

    const currentColumn = article.closest(".column");
    
    const buttonsHTML = returnActivityButton(currentColumn);

    returnTask(article, originalTitle, originalPriority, buttonsHTML);
}

function listenerButtons(event) {
   
    const actionHandlers = {
        "btn-next": putInNextSection,
        "btn-prev": putInPreviousSection,
        "btn-delete": deleteTask,
        "btn-save": saveTask,
        "btn-cancel": cancelTask
    };
    
    const activeClass = Object.keys(actionHandlers).find(cls => 
        event.target.classList.contains(cls)
    );

    if (activeClass) {
        actionHandlers[activeClass](event);
    } else if (event.target.closest(".card")) {
        editTask(event);
    }
}

document.addEventListener("click", function(event){

    const editInput = document.querySelector("input[name='edit-title']");
    const editingCard = editInput ? editInput.closest(".card") : null;
    
    if (editingCard) {
        if (!editingCard.contains(event.target)) {
            cancelTask(editingCard);
            return;
        }
    }

    listenerButtons(event);
    

});
