class CalculadoraController {

    constructor() {

        this._displayCalc = "0";
        this._dataAtual;
    }

    get displayCalc() {
        return this._displayCalc;
    }

    set displayCalc(val) {
        this._displayCalc = val;
    }

    get dataAtual() { 
        return this._dataAtual;
    }

    set dataAtual(val) {
        this._dataAtual = val;
    }
}