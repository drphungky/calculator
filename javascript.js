// Globals
var body = document.querySelector("body");
var display = document.querySelector("#display")
var number1 = NaN;
var number2 = NaN;
var operator = "";
var clear_display_on_next_button_pushed = 0
const MAX_DIGITS_TO_DISPLAY = 9;

// Attach Number functions to buttons
var buttons = document.querySelectorAll("button")
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", (e) =>{
        button_push(e);
    });
}

document.addEventListener("keydown", (event) => {
    var valid_keys = ['1','2','3','4','5','6','7','8','9','0','Backspace','.'];
    var operators = ['+','-','*','/'];
    var equals = ["Enter",'='];
    var to_clear = ["Delete"];
    key = event.key;

    if (operators.includes(key)){
        switch(key){
            case "+":
                written_out_operator = "add";
                break;
            case "-":
                written_out_operator = "subtract";
                break;
            case "/":
                written_out_operator = "divide";
                break;
            case "*":
                written_out_operator = "multiply";
                break;
        }
        operator_pushed(written_out_operator);
    }
    else if (valid_keys.includes(key)){
        if (key == "Backspace"){
            backspace();
        }
        else if (key == "."){
            send_decimal_to_display();
        }
        else {
            send_additional_number_to_display(key);
        }
    }
    else if (equals.includes(key)){
        // Don't let enter click a previously selected button
        event.target.blur();
        equals_pushed();
    }
    else if (to_clear.includes(key)){
        clear();
    }
});



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
            if (num2 == 0){
                alert("Dividing by zero may lead to breaking reality...or at least this program.")
                return num1;
            }
            else{
                return divide(num1, num2);
            }
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
        clear();
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
        if (display.textContent.length < MAX_DIGITS_TO_DISPLAY){
            display.textContent += num;
        }
    }
}

function send_decimal_to_display(){
    if ((clear_display_on_next_button_pushed == 1)){
        clear_display();
    }
    if (display.textContent.search(/\./) == -1){
        display.textContent += ".";
    }
}

function clear(){
    clear_display();
    set_numbers_to_NaN();
}

function clear_display(){
    display.textContent = "";
}

function operator_pushed(pushed_operator){
    if ((!isNaN(number1)) && (clear_display_on_next_button_pushed == 0)){
        solve_math();
    }
    number1 = display.textContent;

    operator = pushed_operator;

    clear_display_on_next_button_pushed = 1;

}

function equals_pushed(){
    if (!isNaN(number1)){
        solve_math();
        clear_display_on_next_button_pushed = 1;
    }

}

function solve_math(){
    number2 = display.textContent;
    answer = operate(Number(number1), Number(number2), operator);
    answer = round_float(answer);
    display.textContent = answer;
    set_numbers_to_NaN();
}

function round_float(num){
    // Get number of non decimal digits
    as_string = String(Math.floor(num));
    digits = as_string.length;

    // Get number of spaces left for decimal (allow 1 extra for .)
    num_decimals_allowed = MAX_DIGITS_TO_DISPLAY - digits - 1;

    // Eliminate overflow decimals
    if (num_decimals_allowed>0){
        num = Number(num.toFixed(num_decimals_allowed));
    }

    // Switch to scientific notation if number too big
    else if (digits>9) {
        num = num.toExponential(3);
    }

    return num;
}


function set_numbers_to_NaN(){
    number1 = NaN;
    number2 = NaN;
}

function backspace(){
    display.textContent = display.textContent.slice(0,-1);
}