const enterButton = document.querySelector("#enter");
const input = document.querySelector("#userInput");
const ul = document.querySelector("#ul");
const item = document.querySelector("#li");

function inputLength(){
	return input.value.length;
}

function listLength(){
	return item.length;
}

function createListElement() {
	const li = document.createElement("li"); // creates an element "li"
	li.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
	ul.appendChild(li); //adds li to ul
	input.value = ""; //Reset text input field


	//START STRIKETHROUGH
	// because it's in the function, it only adds it for new items
	function crossOut() {
		li.classList.toggle("done");
	}

	li.addEventListener("click",crossOut);
	//END STRIKETHROUGH


	// START ADD DELETE BUTTON
	const dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
	// END ADD DELETE BUTTON

	//ADD CLASS DELETE (DISPLAY: NONE)
	function deleteListItem(){
		li.classList.add("delete")
	}
	//END ADD CLASS DELETE
}


function addListAfterClick(){
	if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
		createListElement();
    }
    else {
        alert("Enter an item in the list first!")
    }
}

function addListAfterKeypress(event) {
    if (event.keycode ===13) { //enter key's keycode = 13; to look if user has hit "enter/return"
        if (inputLength() > 0) {
            createListElement();
        }
        else {
            alert("Enter an item in the list first!")
        }
    }
}


enterButton.addEventListener("click",addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

