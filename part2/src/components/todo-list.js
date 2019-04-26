import { LitElement, html, css } from 'lit-element';

import './todo-input';
import './todo-item';

class TodoList extends LitElement {
    constructor() {
        super();

        // Change to load list from localstorage
        this.list = [
            { text: 'my initial todo', checked: false },
            { text: 'Learn about Web Components', checked: true }
        ];
    }

    static get properties() {
        return {
            list: {type:Array}
        }
    }

    // Implement functions to load and store the todo list using localstorage
    
    _onTodoInputSubmit(ev) {
        this.list = [...this.list, { text: ev.detail, checked: false, }];
        this.storeList();
    }
    
    static get styles() {
        return [css`
            :host {
                display: block;
            }
        `];
    }
    
    render() {
        return html`
            <div>
                <h1>Lit Todos</h1>
                <section>
                    <todo-input @submit=${this._onTodoInputSubmit}></todo-input>
                    <ul id="list-container">
                    ${html`Iterate over the array of TODO items and render them here - array size: ${this.list.length}`}
                    </ul>
                </section>
            </div>
        `;
    }
}
customElements.define("todo-list", TodoList);