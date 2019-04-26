import { LitElement, html, css } from 'lit-element';

export class TodoItem extends LitElement {
    static get properties() {
        return {
            checked: { type: Boolean },
            text: { type: String },
            index: { type: Number }
        }
    }
    
    handleOnRemoved() {
        this.dispatchEvent(new CustomEvent("removed", { detail: this.index }));
    }

    handleOnChecked() {
        this.dispatchEvent(new CustomEvent("checked", { detail: this.index }))
    }
    
    static get styles() {
        // Add styles
        return [css`
            :host {
                display: block;
                user-select: none;
            }
        `];
    }
    
    render() {
        return html`
            <li class=${this.checked ? 'completed' : ''}>
                <input id="check" type="checkbox" ?checked=${this.checked} @change=${this.handleOnChecked}/>
                <label for="check">${this.text}</label>
                <button @click=${this.handleOnRemoved}>x</button>
            </li>
        `;
    }
}
customElements.define('todo-item', TodoItem);
