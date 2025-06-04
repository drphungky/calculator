// Globals
var body = document.querySelector("body");
var display = document.querySelector("#display")


function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(num1, num2, operator){
    switch (operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}



function update_display(user_input){
    if (typeof(user_input) == "number") {
        send_additional_number_to_display(user_input)
    }
    else if (user_input == "."){
        send_decimal_to_display();
    }
}

function send_additional_number_to_display(num){
    if (display.textContent==0) {
        display.textContent = num;
    }
    else {
        if (display.textContent.length < 9){
            display.textContent += num;
        }
    }
}

function send_decimal_to_display(){
    if (display.textContent.search(/\./) == -1){
        display.textContent += ".";
    }
}

function clear_display(){
    display.textContent = "";
}