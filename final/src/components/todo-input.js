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
        return [css`
            :host {
                display: block;
            }
            
            form {
                position: relative;
                font-size: 24px;
                border-bottom: 1px solid #ededed;
            }
            
            input {
                padding: 16px 16px 16px 60px;
                border: none;
                background: rgba(0, 0, 0, 0.003);
                position: relative;
                margin: 0;
                width: 100%;
                font-size: 24px;
                font-family: inherit;
                font-weight: inherit;
                line-height: 1.4em;
                border: 0;
                outline: none;
                color: inherit;
                padding: 6px;
                border: 1px solid #CCC;
                box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
                box-sizing: border-box;
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
