class CalcController {

    constructor() {
        this._lastOperator = '';
        this._lastNumber = 0;

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');

        this._currentDate;

        this._init();
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    get currentDate() {
        return new Date();
    }

    set displayCalc(val) {
        this._displayCalcEl.innerHTML = val;
    }

    set currentDate(val) {
        this._currentDate = val;
    }

    set displayTime(val) {
        this._timeEl.innerHTML = val;
    }

    set displayDate(val) {
        this._dateEl.innerHTML = val;
    }

    addEventListenerAll(el, events, fn) {

        events.split(' ').forEach(ev => {
            el.addEventListener(ev, fn, false);
        })

    }

    _execBtn(key) {

        switch (key) {
            case 'ac':
                this._clearAll();
                break;

            case 'ce':
                this._cancelEntry();
                break;

            case 'soma':
                this._addOperation('+');
                break;

            case 'subtracao':
                this._addOperation('-');
                break;

            case 'multiplicacao':
                this._addOperation('*');
                break;

            case 'divisao':
                this._addOperation('/');
                break;

            case 'porcento':
                this._addOperation('%');
                break;

            case 'igual':
                this._calc();
                break;

            case 'ponto':
                this._addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this._addOperation(parseInt(key));
                break;

            default:
                this._setError();
                break;
        }

    }

    _addDot() {

        let lastOperation = this._getLasOperation();

        if(typeof lastOperation === 'string' && lastOperation && lastOperation.split('').indexOf('.') > -1) return;

        if (this._isOperator(lastOperation) || !lastOperation) {
            this._pushOperation('0.');
        } else {
            this._setLastOperation(lastOperation.toString() + '.');
        }

        this._setLastNumberToDisplay();
    }

    _clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this._setLastNumberToDisplay();
    }

    _cancelEntry() {
        this._operation.pop();
        this._setLastNumberToDisplay();
    }

    _getLasOperation() {
        return this._operation[this._operation.length - 1];
    }

    _setLastOperation(val) {
        this._operation[this._operation.length -1] = val;
    }

    _pushOperation(val) {
        this._operation.push(val);

        if(this._operation.length > 3) {
            

            this._calc();
        }

    }

    _getResult() {
        return eval(this._operation.join(''));
    }

    _calc() {

        let last = '';

        this._lastOperator = this._getLastItem();

        if(this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        } 
        
        if(this._operation.length > 3) {

            last = this._operation.pop();            
            this._lastNumber = this._getResult();

        } else if(this._operation.length == 3) {

            this._lastNumber = this._getLastItem(false);

        }

        let result = this._getResult();

        switch (last) {
            case '%':
                result /= 100;
                this._operation = [result];
                break;
        
            default:
                this._operation = [result];

                if(last) this._operation.push(last);
                break;
        }

        this._setLastNumberToDisplay();
    }

    _getLastItem(isOperator = true) {
        let lastItem = '';

        for (let index = this._operation.length-1; index >= 0; index--) {
            
            if(this._isOperator(this._operation[index]) == isOperator) {
                lastItem = this._operation[index];
                break;  
            }    
        }

        if(!lastItem) lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        

        return lastItem;
    }

    _setLastNumberToDisplay() {

        let lastNumber = this._getLastItem(false);

        for (let index = this._operation.length-1; index >= 0; index--) {

            if(!this._isOperator(this._operation[index])) {
                lastNumber = this._operation[index];
                break;  
            }      
        }

        this.displayCalc = lastNumber;

    }

    _addOperation(val) {

        if (isNaN(this._getLasOperation())) {
            //não é um número

            if (this._isOperator(val)) {

                //trocar operador
                this._setLastOperation(val);

            } else {
                
                this._pushOperation(val);
                this._setLastNumberToDisplay();
            }

        } else {

            if(this._isOperator(val)) {

                this._pushOperation(val);
            } else {
                //é um número

                const newValue = this._getLasOperation().toString() + val.toString();
                this._setLastOperation(newValue);

                this._setLastNumberToDisplay();
            }
        }
    }

    _isOperator(key) {

        /**
         * O método indexOf procura o elemento (key) dentro do array informado
         * Se encontrar um valor, ele retorna o índice de onde o elemento está
         * Caso não encontre, o método retorna -1
         */

        return (['+', '-', '*', '/', '%'].indexOf(key) > -1);

    }

    _setError() {
        this.displayCalc = 'Error';
    }

    _initButtonsEvents() {
        const buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');

                this._execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseup mouseover mousedown', e => {
                btn.style.cursor = 'pointer';
            });

        });
    }

    _setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    _init() {
        this._setDisplayDateTime();
        setInterval(() => {
            this._setDisplayDateTime()
        }, 1000);
        this._initButtonsEvents();
    }
}