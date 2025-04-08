class Line {
    constructor(lineList, lineNum, text){
        this.lineNum = lineNum;
        this.text = text;
        this.HTML = {
            lineNumber: document.createElement("h1"),
            text: document.createElement("input"),
        };

        this.HTML.lineNumber.innerText = this.lineNum;
        this.HTML.text.type = "text";
        this.HTML.text.value = this.text;
        this.HTML.text.style.cursor = "text";

        this.HTML.lineNumber.style.gridRow = this.lineNum;
        this.HTML.text.style.gridRow = this.lineNum;

        this.HTML.text.style.order = this.lineNum;
        this.HTML.lineNumber.style.order = this.lineNum;

        this.HTML.text.onkeydown = (event) => {
            if(event.key == "Enter"){
                const newLine = lineList.insertLine("", this.lineNum);
                newLine.HTML.text.focus();
            } else if((event.key == "Backspace") && this.HTML.text.value.length <= 0 && lineList.lines.length > 1){
                event.preventDefault(); // Somehow prevents the first character of the line of text before from getting deleted,
                                        // No idea why, don't touch
                lineList.removeLine(this.lineNum - 1);
            }
        }

        this.HTML.text.addEventListener("paste", (event) => {
            event.preventDefault();
            const linesToPaste = event.clipboardData.getData("Text").split("\n");

            this.HTML.text.value += linesToPaste[0];
            
            for(let offset = 0; offset < linesToPaste.length - 1; offset++){
                if(lineList.lines[this.lineNum + offset]){ // a line already exists
                    lineList.lines[this.lineNum + offset].HTML.text.value = linesToPaste[offset + 1];
                } else {
                    lineList.insertLine(linesToPaste[offset + 1], this.lineNum + offset);
                }
            }

            lineList.lines[this.lineNum + linesToPaste.length - 2].HTML.text.focus();
        })
    }

    appendTo(parentElement){
        const linesContainer = parentElement.querySelector(".line-numbers-container");
        const textContainer = parentElement.querySelector(".input-text-container");

        linesContainer.appendChild(this.HTML.lineNumber);
        textContainer.appendChild(this.HTML.text);
    }

    setLineNumber(newLineNum){
        this.lineNum = newLineNum;
        this.HTML.lineNumber.innerText = this.lineNum;

        this.HTML.lineNumber.style.gridRow = this.lineNum;
        this.HTML.text.style.gridRow = this.lineNum;

        this.HTML.text.style.order = this.lineNum;
        this.HTML.lineNumber.style.order = this.lineNum;
    }

    setText(newText){
        this.text = newText;
        this.HTML.text.value = this.text;
    }
}

class LineList {
    constructor(container){
        this.container = container;
        this.lines = [];
        this.insertLine("");
    }

    insertLine(text, position){
        position = position || this.lines.length;
        const line = new Line(this, position + 1, text);

        for(let lineToCheck = position; lineToCheck < this.lines.length; lineToCheck++){
            const targetLine = this.lines[lineToCheck];
            targetLine.setLineNumber(targetLine.lineNum + 1);
        }

        // Insert the line
        this.lines = [...this.lines.slice(0, position), line, ...this.lines.slice(position)];
        line.appendTo(this.container);

        return line;
    }

    removeLine(position){
        this.container.querySelector(".line-numbers-container").removeChild(this.lines[position].HTML.lineNumber);
        this.container.querySelector(".input-text-container").removeChild(this.lines[position].HTML.text);

        for(let lineToCheck = position + 1; lineToCheck < this.lines.length; lineToCheck++){
            const targetLine = this.lines[lineToCheck];
            targetLine.setLineNumber(targetLine.lineNum - 1);
        }

        this.lines.splice(position, 1);
        this.lines[position - 1].HTML.text.focus();
    }

    toString(){
        return this.lines.map((line) => line.HTML.text.value).join("\n");
    }
}