class CalcController {

    constructor() {

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

    _setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    _initButtonsEvents() {
        const buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach( (btn, index) => {

            btn.addEventListener('click', e => {
                console.log(btn.className.baseVal.replace('btn-',''));
            });
            
        });
    }

    _init() {
        this._setDisplayDateTime();
        setInterval(() => {
            this._setDisplayDateTime()
        }, 1000);
    }
}