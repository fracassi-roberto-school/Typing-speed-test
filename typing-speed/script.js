const textInput = document.querySelector("#test-area");
const textInputBorder = document.querySelector("#test-wrapper");
const textToMatch = document.querySelector("#origin-text");
var clockText = document.querySelector("#timer");
const resetButton = document.querySelector("#reset");
const customText = document.querySelector("#test-model");
const testAreaHeader = document.querySelector("#test-area-header");
const testSucces = document.querySelector("#test-area-header-succes");
testSucces.classList.add("hide"); // By default hide the success message
const initialText = textToMatch.innerHTML;
var stopClock;
var hasStarted = false;

// Start the clock 
function fireClock() {
    if (!hasStarted) {
        hasStarted = true;
        stopClock = setInterval(setClock(), 10);
    }
}

//interval function that shows the timer
function setClock() {
    var totalTime = 0;
    return function() {
        var textForClock = "";
        var minuteText = Math.floor(totalTime / 6000); //get the minutes and seconds value, transform them into string and adjust to two digits
        minuteText = minuteText + "";
        if (minuteText.length < 2) { minuteText = "0" + minuteText; }

        var secondsText = (Math.floor(totalTime / 100) % 60);
        secondsText = secondsText + "";
        if (secondsText.length < 2) { secondsText = "0" + secondsText; }

        var secondsCentsText = (totalTime % 100);
        secondsCentsText = secondsCentsText + "";
        if (secondsCentsText.length < 2) { secondsCentsText = "0" + secondsCentsText; }

        textForClock = minuteText + ":" + secondsText + ":" + secondsCentsText;
        clockText.innerHTML = textForClock

        totalTime++;
    }
}

//funcion that reset eveything on button hit
function resetEverything() {
    clearInterval(stopClock);
    hasStarted = false;
    clockText.innerHTML = "00:00:00";
    textInput.value = "";
    clockText.classList.remove("succes");
    textInput.classList.remove("succes");
    textInput.classList.remove("error");
    textInput.addEventListener("keydown", fireClock, false);
    textInput.addEventListener("keyup", controlText, false);
    testAreaHeader.classList.remove("hidden");
    testSucces.classList.add("hide");
}

function controlText() {
    //two variables that controls if the partial imputs match.
    let textEntered = textInput.value
    let temporaryTextMatch = textToMatch.innerHTML.substring(0, textEntered.length);
    //If text written matches the original, invoke the testFinished function, else check if text terporary insered matches with original test and change border color accordingly
    if (textEntered == textToMatch.innerHTML) {
        testFinished();
    } else {
        if (textEntered == temporaryTextMatch) {
            textInput.classList.remove("success");
            textInput.classList.remove("error");
        } //if matches, no border
        else {
            textInput.classList.add("error"); //If does not match, border error
        }
    }
}

function testFinished() {
    clearInterval(stopClock);
    clockText.classList.add("succes");
    textInput.classList.add("succes");
    hasStarted = false;
    let succesMessage = "You did it!";
    testAreaHeader.classList.add("hidden");
    textInput.removeEventListener("keydown", fireClock, false);
    textInput.removeEventListener("keyup", controlText, false);
    testSucces.classList.remove("hide");
}

//Function that take the custom text and copy it in the text to be matched box <p>
function updateText() {
    if (customText.value != "") { textToMatch.innerHTML = customText.value; } else { textToMatch.innerHTML = initialText; }
}
//every keyboard input, control if text is mached, first time start clock
textInput.addEventListener("keydown", fireClock, false);
textInput.addEventListener("keyup", controlText, false);

//stops clock and text control when reset button is pushed
resetButton.addEventListener("click", resetEverything, false);
customText.addEventListener("keyup", updateText, false);