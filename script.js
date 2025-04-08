const inputArea = document.getElementById("input");
const outputArea = document.getElementById("output");
const formatButton = document.getElementById("format-button");
const clearButton = document.getElementById("clear-button");
const statusMsg = document.getElementById("status");

const prefixCode = /\b230/;
const removeWhiteSpace = /[\s-]/;
const inputLines = new LineList(document.getElementById("input-lines-list"));
const outputLines = new LineList(document.getElementById("output-lines-list"), true);

statusMsg.style.color = "transparent";

function addDashes(){
    const inputs = inputLines.textArea.value.split("\n");
    const outputs = inputs.map((inputVal) => {
        if(inputVal.search(prefixCode) == -1){
            //not a 230-style asset code
            return inputVal;
        }

        let outputVal = inputVal.replace(removeWhiteSpace, "");
        outputVal = outputVal.slice(0, 3) + "-" + outputVal.slice(3);

        return outputVal;
    });

    statusMsg.classList.add("fading-out");
    setTimeout(() => statusMsg.classList.remove("fading-out"), 2000);

    outputLines.clear();
    outputLines.setText(outputs.join("\n"));

    outputLines.removeLine(0);
    
    navigator.clipboard.writeText(outputs.join("\n"));
}

formatButton.onclick = addDashes;
clearButton.onclick = () => inputLines.clear();