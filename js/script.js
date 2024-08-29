const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Adiciona dígitos à tela da calculadora
    addDigit(digit) {
        // Checa se a operação atual já tem um ponto
        if (digit === "." && this.currentOperation.includes(".")) {
            return;
        }
        this.currentOperation += digit; // Concatenar o dígito ao valor existente
        this.updateScreen();
    }

    // Processa todas as operações
    processOperation(operation) {
        // Checa se o valor atual está vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.previousOperationText.innerText !== "") {
                // Se entrar no if, muda a operação
                this.changeOperation(operation);
            }
            return;
        }

        // Pega os valores anterior e atual
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText; // Convertendo para número

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator()  
                break;
            case "CE":
                this.processCeOperator()  
                break;
            case "C":
                this.processCOperator()  
                break;
            case "=":
                this.processEqualperator()  
                break;
            default:
                return;
        }
    }

    // Muda os valores da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if (operationValue === null) {
            this.currentOperationText.innerText = this.currentOperation; // Define o valor diretamente
        } else {
            // Checa se o valor anterior é zero
            if (previous === 0) {
                operationValue = current;
            }
            // Adiciona o valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
            this.currentOperation = "";
        }
    }

    // Muda a operação matemática
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //deleta o ultimo numero
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    } 
    processCeOperator() {
        this.currentOperationText.innerText= ""
    }
    processCOperator() {
        this.currentOperationText.innerText= ""
        this.previousOperationText.innerText= ""
        this.currentOperation = "";
    }
    processEqualperator(){
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", function(e) {
        const value = e.target.innerText;

        if (!isNaN(value) || value === ".") { // Verifica se é um número ou um ponto decimal
            calc.addDigit(value);  // Adiciona o dígito à operação
        } else {
            calc.processOperation(value); // Processa a operação matemática
        }
    });
});
