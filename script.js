const containerElement = document.querySelector("#main.container");

const inputElement = document.querySelector("#textValue");

// We select the button elements and assign them to variables.

const addButton = document.getElementById("add");
const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");
const clearButton = document.getElementById("clear");

// We select the ul element and assign it to a variable.

const ulElement = document.querySelector(".card-body>ul.list-group");

const generateList = () => {
    let newList = JSON.parse(localStorage.getItem("notes"));
    ulElement.innerHTML = "";

    newList.forEach((element) => {
        const liElement = document.createElement("li");
        liElement.classList.add("list-group-item");
        liElement.addEventListener("click",() => {
            inputElement.value = liElement.textContent;
        })
        ulElement.append(liElement);
    })
}