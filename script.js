const inputArea = document.getElementById("input");
const outputArea = document.getElementById("output");
const formatButton = document.getElementById("format-button");
const clearButton = document.getElementById("clear-button");
const statusMsg = document.getElementById("status");

const prefixCode = /\b230/;
const removeWhiteSpace = /[\s-]/;
const inputLines = new LineList(document.getElementById("input-lines-list"));
const outputLines = new LineList(document.getElementById("output-lines-list"), true);

const catchErrorsCheck = document.getElementById("error-catch-check");

statusMsg.style.color = "transparent";

function addDashes(){
    let invalidCodeLines = [];

    const inputs = inputLines.textArea.value.split("\n");
    const outputs = [...inputs.keys()].map((lineNumber) => {
        const inputVal = inputs[lineNumber];

        if(inputVal.search(prefixCode) == -1){
            //not a 230-style asset code
            if(catchErrorsCheck.checked){
                invalidCodeLines.push(lineNumber);
            }

            return inputVal;
        }

        let outputVal = inputVal.replace(removeWhiteSpace, "");
        outputVal = outputVal.slice(0, 3) + "-" + outputVal.slice(3);

        return outputVal;
    });

    for(let i = 0; i < inputs.length; i++){
        const lineNumberLabel = inputLines.lineNumbers[i].HTML;
        
        if(invalidCodeLines.includes(i)){
            lineNumberLabel.classList.add("error-line");
        } else {
            lineNumberLabel.classList.remove("error-line");
        }
    }

    if(invalidCodeLines.length > 0){
        alert("ERROR: Some codes in the input list (highlighted in red) are not valid 230 codes.");
        return;
    }

    statusMsg.classList.add("fading-out");
    setTimeout(() => statusMsg.classList.remove("fading-out"), 2000);
    outputLines.setText(outputs.join("\n"));
    
    navigator.clipboard.writeText(outputs.join("\n"));
}

formatButton.onclick = addDashes;
clearButton.onclick = () => inputLines.clear();