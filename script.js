const inputArea = document.getElementById("input");
const outputArea = document.getElementById("output");
const verifyButton = document.getElementById("verify-button");
const formatButton = document.getElementById("format-button");
const removeDashesButton = document.getElementById("remove-dashes-button");
const clearButton = document.getElementById("clear-button");
const statusMsg = document.getElementById("status");

const prefixCode = /\b230/;
const removeWhiteSpace = /[\s-]/;
const inputLines = new LineList(document.getElementById("input-lines-list"));
const outputLines = new LineList(document.getElementById("output-lines-list"), true);

const catchErrorsCheck = document.getElementById("error-catch-check");

statusMsg.style.color = "transparent";

function checkErrors(){
    // Checks if there is a non-230 code
    const inputs = inputLines.textArea.value.split("\n");

    const badCodes = [];
    
    for(let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const isBad = input.replace(removeWhiteSpace, "") != "" && (input.search(prefixCode) == -1);
        const lineNumberLabel = inputLines.lineNumbers[index].HTML;

        if(isBad){
            lineNumberLabel.classList.add("error-line");
            badCodes.push(index);
        } else {
            lineNumberLabel.classList.remove("error-line");
        }
    }

    if(badCodes.length > 0){
        alert("ERROR: Some codes in the input list (highlighted in red) are not valid 230 codes.");
    }

    return badCodes;
}

function addDashes(){
    // If is catching errors and there is a non-230-styled code
    if(catchErrorsCheck.checked && checkErrors().length > 0){
        return;
    }

    const inputs = inputLines.textArea.value.split("\n");

    const outputs = [...inputs.keys()].map((lineNumber) => {
        const inputVal = inputs[lineNumber];

        if(inputVal.search(prefixCode) == -1){
            return inputVal;
        }

        let outputVal = inputVal.replace(removeWhiteSpace, "");
        outputVal = outputVal.slice(0, 3) + "-" + outputVal.slice(3);

        return outputVal;
    });

    statusMsg.classList.add("fading-out");
    setTimeout(() => statusMsg.classList.remove("fading-out"), 2000);
    outputLines.setText(outputs.join("\n"));
    
    navigator.clipboard.writeText(outputs.join("\n"));
}

function removeDashes(){
    // If is catching errors and there is a non-230-styled code
    if(catchErrorsCheck.checked && checkErrors().length > 0){
        return;
    }

    const inputs = inputLines.textArea.value.split("\n");

    const outputs = [...inputs.keys()].map((lineNumber) => {
        const inputVal = inputs[lineNumber];

        if(inputVal.search(prefixCode) == -1){
            return inputVal;
        }

        let outputVal = inputVal.replace(removeWhiteSpace, "");

        return outputVal;
    });

    statusMsg.classList.add("fading-out");
    setTimeout(() => statusMsg.classList.remove("fading-out"), 2000);
    outputLines.setText(outputs.join("\n"));
    
    navigator.clipboard.writeText(outputs.join("\n"));
}

verifyButton.onclick = () => {
    const badLines = checkErrors();

    if(badLines.length == 0){
        alert("ALL CODES ARE VALID 230-STYLED CODES");
    }
}

formatButton.onclick = addDashes;
removeDashesButton.onclick = removeDashes;
clearButton.onclick = () => inputLines.clear();