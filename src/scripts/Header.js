export default class Header {
    selectors = {
        root: '[data-js-header]',
        burgerButton: '[data-js-header-burger-button]',
        burgerMenu: '[data-js-burger-menu]',
        burgerMenuButton: '[data-js-burger-menu-button]',
    }

    IGNORED_TAGS = ['SCRIPT', 'LINK', 'STYLE', 'TEMPLATE', 'NOSCRIPT'];

    stateClasses = {
        isActive: 'active',
        isLock: 'locked',
    }

    stateAttributes = {
        ariaHidden: 'aria-hidden',
        ariaExpanded: 'aria-expanded',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
        this.burgerMenuElement = document.querySelector(this.selectors.burgerMenu);
        this.burgerMenuButtonElement = document.querySelector(this.selectors.burgerMenuButton);
        this.bodyElementsToInert = Array.from(document.body.children).filter(el => {
            return el !== this.burgerMenuElement &&
                !this.IGNORED_TAGS.includes(el.tagName)
        })

        this.bindEvents();
    }

    handleClick = () => {
        this.burgerMenuElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    }

    bindEvents = () => {
        this.burgerButtonElement.addEventListener('click', () => {
            this.handleClick();

            if ('inert' in HTMLElement.prototype) {
                this.bodyElementsToInert.forEach(el => {
                    el.inert = true;
                    el.setAttribute(this.stateAttributes.ariaHidden, 'true');
                })
            }
            this.burgerMenuElement.removeAttribute(this.stateAttributes.ariaHidden);
            this.burgerButtonElement.setAttribute(this.stateAttributes.ariaExpanded, 'true');
        });

        this.burgerMenuButtonElement.addEventListener('click', () => {
            this.handleClick();

            this.bodyElementsToInert.forEach(el => {
                el.inert = false;
                el.removeAttribute('aria-hidden');
            });

            this.burgerMenuElement.setAttribute(this.stateAttributes.ariaHidden, 'true');
            this.burgerButtonElement.setAttribute(this.stateAttributes.ariaExpanded, 'false');
        });
    }
}