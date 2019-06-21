class CalcController {

    constructor() {

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

                break;

            case 'subtracao':

                break;

            case 'multiplicacao':

                break;

            case 'divisao':

                break;

            case 'porcento':

                break;

            case 'igual':

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

    _clearAll() {
        this._operation = [];
    }

    _cancelEntry() {
        this._operation.pop();
    }

    _addOperation(val) {
        this._operation.push(val);
        console.table(this._operation);
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