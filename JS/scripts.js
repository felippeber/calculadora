const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // add digit para a tela da calculadora
    addDigit(digit) {  

        //Verifique se a operação atual já possui um ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    //Processar todas as operações da calculadora
    processOperation(operation){

        //Verifique se o valor está vazio
        if (this.currentOperationText.innerText === "" && operation != "C") {

            //Mudar a operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //Obter valor atual e anterior
        let operationValue;
        const previus = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previus + current
                this.updateScreen(operationValue, operation, current, previus)
                break;
            case "-":
                operationValue = previus - current
                this.updateScreen(operationValue, operation, current, previus)
                break;
            case "/":
                operationValue = previus / current
                this.updateScreen(operationValue, operation, current, previus)
                break;
            case "*":
                operationValue = previus * current
                this.updateScreen(operationValue, operation, current, previus)
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processEqualOperator();
                break    
            default:
                return;
        }
    }

    // Altera os valores da tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null,
        current = null, 
        previus = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {

            //Verifique se o valor é zero, se for apenas adicione o valor atual
            if (previus === 0) {
                operationValue = current
            }
            //Adicionar valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }        
    }
    
    //Mudar a operação matemática
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation
    }

    //Deletar o último digito
    processDelOperator() {
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1);
    }

    //Limpa operação atual
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    //Limpa todas as operações
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Processar uma operação
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText,currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});