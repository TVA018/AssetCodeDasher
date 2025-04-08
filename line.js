class LineNumber {
    constructor(lineNum){
        this.HTML = document.createElement("h1")
        this.HTML.innerText = lineNum + 1;
        this.HTML.style.order = lineNum;
    }
}

class LineList {
    constructor(container, readOnly){
        // creating elements
        this.container = container;
        this.lineNumbersContainer = document.createElement("div");
        this.lineNumbersContainer.classList.add("line-numbers-container");
        this.textContainer = document.createElement("div");
        this.textContainer.classList.add("line-text-container");
        this.textArea = document.createElement("textarea");
        this.textArea.readOnly = readOnly;

        // appending elements
        this.container.appendChild(this.lineNumbersContainer);
        this.container.appendChild(this.textArea);
        // this.container.appendChild(this.textContainer);

        this.textArea.oninput = (event) => {
            const numLines = event.target.value.split("\n").length;
            console.log(numLines);
            this.reRenderLineNumbers(numLines);
        }

        this.lineNumbers = [];
        this.readOnly = readOnly;
        this.appendLineNumber("");
    }

    reRenderLineNumbers(numLines){
        // Remove extra lines
        while(this.lineNumbers.length > numLines){
            this.lineNumbersContainer.removeChild(this.lineNumbers[numLines].HTML);
            this.lineNumbers.splice(numLines, 1);
        }

        // Add missing lines
        while(this.lineNumbers.length < numLines){
            this.appendLineNumber();
        }
    }

    appendLineNumber(){
        const position = this.lineNumbers.length;
        const lineNumber = new LineNumber(position);
        
        // Insert the line
        this.lineNumbers.push(lineNumber);
        this.lineNumbersContainer.appendChild(lineNumber.HTML);

        return lineNumber;
    }

    clear(){
        this.lines[0].HTML.text.value = "";

        while(this.lines.length > 1){
            this.removeLine(1);
        }
    }

    toList(){
        return this.lines.map((line) => line.HTML.text.value);
    }

    toString(){
        return this.toList().join("\n");
    }
}