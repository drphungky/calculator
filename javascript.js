// Globals
var body = document.querySelector("body");
var display = document.querySelector("#display")

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

function button_push(event){
    // Parent divs that hold the buttons actually have the info
    parent_classes = event.target.parentElement.classList;
    console.log(event.target.parentElement.classList);
    console.log(event.target.parentElement.id);
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
}


function send_additional_number_to_display(num){
    if (display.textContent=="0") {
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