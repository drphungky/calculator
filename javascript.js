// Globals
var body = document.querySelector("body");
var display = document.querySelector("#display")
var number1 = NaN;
var number2 = NaN;
var operator = "add";
var clear_display_on_next_button_pushed = 0

// Attach Number functions to buttons
var buttons = document.querySelectorAll("button")
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", (e) =>{
        button_push(e);
    });
}



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
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
    }
}

function button_push(event){
    // Parent divs that hold the buttons actually have the info
    parent_classes = event.target.parentElement.classList;
    parent_id = event.target.parentElement.id;

    // If it's a number button
    if (parent_classes.contains("number")){
        send_additional_number_to_display(event.target.textContent);
    }
    //If it's .
    else if (parent_id == "period"){
        send_decimal_to_display();
    }
    //If it's clear
    else if (parent_id == "clear"){
        clear_display();
    }
    else if (parent_classes.contains("operator")){
        operator_pushed(parent_id);
    }

    else if (parent_id == "equals"){
        equals_pushed();
    }

    
}


function send_additional_number_to_display(num){
    if ((display.textContent=="0") || (clear_display_on_next_button_pushed == 1)) {
        display.textContent = num;
        clear_display_on_next_button_pushed = 0;
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

function operator_pushed(pushed_operator){
    if (isNaN(number1)){
        number1 = display.textContent;
    }

    operator = pushed_operator;

    clear_display_on_next_button_pushed = 1;

}

function equals_pushed(){
    number2 = display.textContent;
    display.textContent = operate(Number(number1), Number(number2), operator);
}

function set_numbers_to_NaN(){
    number1 = NaN;
    number2 = NaN;
}