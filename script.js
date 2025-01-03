let notes;

const containerElement = document.querySelector("#main.container");

const inputElement = document.querySelector("#textValue");

// We select the button elements and assign them to variables.

const addButton = document.getElementById("add");
const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");
const clearButton = document.getElementById("clear");

// We select the ul element and assign it to a variable.

const ulElement = document.querySelector(".card-body>ul.list-group");

// Add Button

addButton.addEventListener("click", () => {
    let value = inputElement.value.trim();

    if (value === "") {
        alert("Please enter a note.");
        return;
    }

    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    if (notes.includes(value)) {
        alert("Note was added before. Adding failed.");
    } else {
        notes.unshift(value);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    inputElement.value = "";
    inputElement.focus();
    generateList();
})

// generateList

const generateList = () => {
    let newList = JSON.parse(localStorage.getItem("notes"));
    ulElement.innerHTML = "";

    newList.forEach((element) => {
        const liElement = document.createElement("li");
        liElement.classList.add("list-group-item");
        liElement.innerHTML = element;
        liElement.addEventListener("click", () => {
            inputElement.value = liElement.textContent;
            const previouslySelected = ulElement.querySelector(".selected");
            if (previouslySelected) {
                previouslySelected.classList.remove("selected");
            }
            liElement.classList.add("selected");
        });
        ulElement.append(liElement);
    });
}


// Delete Button

deleteButton.addEventListener("click", () => {
    const newList = JSON.parse(localStorage.getItem("notes"));
    newList.forEach((note, position) => {
        if (note === inputElement.value) {
            newList.splice(position, 1);
        }
    })

    localStorage.setItem("notes", JSON.stringify(newList));
    inputElement.value = "";
    inputElement.focus();
    generateList();
})

// Clear Button

clearButton.addEventListener("click", () => {
    localStorage.removeItem("notes");
    generateList();
});

// Update Button

updateButton.addEventListener("click", () => {
    const newValue = inputElement.value;
    let notes = JSON.parse(localStorage.getItem("notes"));

    const selectedNoteElement = ulElement.querySelector(".selected");
    if (selectedNoteElement) {
        const oldNote = selectedNoteElement.textContent;

        notes.forEach((note, position) => {
            if (note === oldNote) {
                notes[position] = newValue;
            }
        });

        localStorage.setItem("notes", JSON.stringify(notes));
        inputElement.value = "";
        inputElement.focus();
        generateList();
    } else {
        alert("Please do not select one to update.");
    }
});