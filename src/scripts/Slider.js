const rootSelector = "[data-js-hero-slider]";

export default class Slider {
    selectors = {
        root: rootSelector,
        leftButton: "[data-js-hero-slider-left-button]",
        rightButton: "[data-js-hero-slider-right-button]",
        content: "[data-js-hero-slider-content]",
    };

    values = {
        cardWidth: 297,
        paddingWidth: 30,
    }

    stateAttributes = {
        ariaDisabled: 'aria-disabled'
    };

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.leftButtonElement = this.rootElement.querySelector(this.selectors.leftButton);
        this.rightButtonElement = this.rootElement.querySelector(this.selectors.rightButton);
        this.contentElement = this.rootElement.querySelector(this.selectors.content);

        this.state = this.getProxyState({
            currentOffset: 0,
        });

        this.offsetLimit = -(this.contentElement.children.length - 2) * this.values.cardWidth + this.values.paddingWidth;

        this.bindEvents();
    }

    getProxyState = (initialState) => {
        return new Proxy(initialState, {
            get: (target, prop) => target[prop],
            set: (target, prop, value) => {
                target[prop] = value;

                this.updateUI();
                return true;
            }
        })
    };

    bindEvents = () => {
        this.leftButtonElement.addEventListener('click', () => {
            this.state.currentOffset += this.values.cardWidth + this.values.paddingWidth;
        });

        this.rightButtonElement.addEventListener('click', () => {
            this.state.currentOffset -= this.values.cardWidth + this.values.paddingWidth;
        })

        this.updateUI();
    }

    updateUI = () => {
        const offsetOverflow = this.state.currentOffset <= this.offsetLimit;
        const offsetUnderflow = this.state.currentOffset >= 0;
        
        this.rightButtonElement.disabled = offsetOverflow;
        this.rightButtonElement.setAttribute(this.stateAttributes.ariaDisabled, String(offsetOverflow))

        this.leftButtonElement.disabled = offsetUnderflow;
        this.leftButtonElement.setAttribute(this.stateAttributes.ariaDisabled, String(offsetUnderflow))
        this.contentElement.style.transform = `translateX(${this.state.currentOffset}px)`;
    }
}