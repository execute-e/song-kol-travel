export default class Form {
    selectors = {
        root: "[data-js-form]",
        textarea: "[data-js-form-textarea]",
        textareaError: "[data-js-form-textarea-error]",
        input: "[data-js-form=input]",
        inputError: "[data-js-form-input-error]",
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.textareaElement = this.rootElement.querySelector(this.selectors.textarea);
        this.textareaErrorElement = this.rootElement.querySelector(this.selectors.textareaError);
        this.inputElement = this.rootElement.querySelector(this.selectors.input);
        this.inputErrorElement = this.rootElement.querySelector(this.selectors.inputError);

        this.bindEvents();
    }

    bindEvents = () => {
        this.rootElement.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.textareaElement.value) {
                this.textareaErrorElement.textContent = "Please fill this field";
                return;
            }

            this.textareaErrorElement.textContent = "";

            if (!this.inputElement.value) {
                this.inputErrorElement.textContent = "Please fill this field";
                return;
            } else if (!this.inputElement.validity.valid) {
                this.inputErrorElement.textContent = "Invalid email";
                return;
            }

            this.inputErrorElement.textContent = "";

            // обращение к серверу...
        })
    }
}