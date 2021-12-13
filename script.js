//////////////////////////////////////////////////////////////
////////////////////
'use strict';
// Element Selecting 
const btnGeneratePin = document.querySelector('.generate-btn');
const inputPin = document.querySelector('.form-control');
const inputNumber = document.querySelector('.inputNumber');
const numberPad = document.querySelector('.calc-body');
const lifeEl = document.querySelector('.action-left');
const btnSubmit = document.querySelector('.submit-btn')
const btndelAll = document.querySelector('.btn-clear');
const btndel = document.querySelector('.btn-delate');
const notify = document.querySelector('.notify');
class App {
    #life = 3;
    #secretNumber;
    #number = '';
    constructor() {
        lifeEl.textContent = '';
        btnGeneratePin.addEventListener('click', this._generatePin.bind(this));
        numberPad.addEventListener('click', this._numberPad.bind(this))
        btnSubmit.addEventListener('click', this._submitFunc.bind(this));
        btndelAll.addEventListener('click', this._delateAll.bind(this));
        btndel.addEventListener('click', this._delOnce.bind(this))
    }
    _inputFocus() {
        inputNumber.focus();
    }
    _displayMsg(message) {
        if (inputNumber.value == '') return;
        notify.classList.remove('hidden');
        notify.textContent = message;
    }
    _generatePin() {
        this.#secretNumber = Math.floor(1000 + Math.random() * 9000);
        inputPin.value = this.#secretNumber;
        this._inputFocus()
        this.#life = 3;
        lifeEl.textContent = '';
        notify.classList.add('hidden');
    }
    _numberPad(e) {
        if (inputPin.value == '') return alert('Please First Generate PIN 😔');
        const click = e.target.classList.contains('button');
        if (!click) return;
        this.#number += e.target.textContent;
        inputNumber.value = this.#number;
    }
    _submitFunc() {
        if (inputNumber.value === '') return;
        console.log(this.#number, this.#secretNumber);
        this.#secretNumber === +this.#number ? `${this._displayMsg('✅ Pin Matched... Secret door is opening for you')}` : `${this._displayMsg('❌ Pin Didn"t Match, Please try again')}`

        if (this.#secretNumber !== +this.#number) {
            lifeEl.classList.remove('hidden');
            this.#life--;
            lifeEl.textContent = `${this.#life} try left`;
            if (this.#life <= 0) {
                lifeEl.textContent = `gameOver please RELOAD Again`;
                this._resetApp();
            }
        } else {
            lifeEl.classList.add('hidden');
        }
        this.#number = '';
        inputNumber.value = this.#number;
    }
    _resetApp() {
        setTimeout(() => {
            this.#life = 3;
            this.#secretNumber;
            this.#number = '';
            inputPin.value = '';
        }, 1000);
    }
    _delateAll() {
        this.#number = '';
        inputNumber.value = '';
    }
    _delOnce() {
        this.#number = this.#number.slice(0, this.#number.length - 1);
        inputNumber.value = this.#number;
    }

};
const pinMatcherApp = new App();
