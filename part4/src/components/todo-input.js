import { LitElement, html, css } from 'lit-element';

export class TodoInput extends LitElement {
    constructor() {
        super();
        this.value = '';
    }
    
    handleInputChange(ev) {
        this.value = ev.target.value;
    }
    
    handleOnSubmit(ev) {
        ev.preventDefault();
        if (!this.value) return;
        this.dispatchEvent(new CustomEvent("submit", { detail: this.value }));
        this.value = '';
        this.requestUpdate();
    }
    
    static get styles() {
        // Add styles
        return [css`
            :host {
                display: block;
            }
        `];
    }
    
    render() {
        return html`
            <form @submit=${this.handleOnSubmit}>
                <input value=${this.value} type="text" placeholder="What needs to be done?" @input=${this.handleInputChange}>
            </form>
        `;
    }
    
}
customElements.define("todo-input", TodoInput);
