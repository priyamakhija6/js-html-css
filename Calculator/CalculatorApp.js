//Storing selectors in a variable
const erase = document.querySelector(".clear");
const num = document.querySelector(".number-key");
const ops = document.querySelector(".ops");
const equals = document.querySelector(".equals");
const period = document.querySelector(".period");
const userin = document.querySelector(".calc-input")

//Initialize variables
let calculation =[];
let previousNum = "";
let currentNum ="";
let operator = null;

const updateUser = e => {
    userin.value = num;
    alert(num);
}
num.addEventListener('click',updateUser)









