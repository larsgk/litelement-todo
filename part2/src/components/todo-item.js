import { LitElement, html, css } from 'lit-element';

export class TodoItem extends LitElement {
    static get properties() {
        return {
            checked: { type: Boolean },
            text: { type: String },
            index: { type: Number }
        }
    }
    
    // Implement handler functions to dispatch toggle state and remove custom events
    
    static get styles() {
        return [css`
            :host {
                display: block;
                user-select: none;
            }
        `];
    }
    
    render() {
        // Add event handler to toggle done/not-done state (on checkbox)
        // Add a button with an event handler to remove an item
        return html`
            <li class=${this.checked ? 'completed' : ''}>
                <input id="check" type="checkbox" ?checked=${this.checked} />
                <label for="check">${this.text}</label>
            </li>
        `;
    }
}
customElements.define('todo-item', TodoItem);
