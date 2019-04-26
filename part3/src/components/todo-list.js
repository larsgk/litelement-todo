import { LitElement, html, css } from 'lit-element';

import './todo-input';
import './todo-item';

class TodoList extends LitElement {
    constructor() {
        super();

        this.loadList();
    }

    static get properties() {
        return {
            list: {type:Array}
        }
    }

    loadList() {
        try {
            this.list = JSON.parse(localStorage.getItem('todolist') || undefined);
        } catch (error) {
            this.list = [
                { text: 'my initial todo', checked: false },
                { text: 'Learn about Web Components', checked: true }
            ];
            this.storeList();
        }
    }

    storeList() {
        localStorage.setItem('todolist', JSON.stringify(this.list));
    }
    
    _onTodoInputSubmit(ev) {
        this.list = [...this.list, { text: ev.detail, checked: false, }];
        this.storeList();
    }
    
    // Implement event handler functions to be called on 'removed' and 'checked' custom events
    
    static get styles() {
        return [css`
            :host {
                display: block;
            }
        `];
    }
    
    render() {
        // Add event handlers for 'removed' and 'checked' listening for custom events from todo-item
        return html`
            <div>
                <h1>Lit Todos</h1>
                <section>
                    <todo-input @submit=${this._onTodoInputSubmit}></todo-input>
                    <ul id="list-container">
                    ${ this.list.map((item, index) => html`
                        <todo-item 
                            .checked=${item.checked}
                            text=${item.text}
                            .index=${index}
                        ></todo-item>
                    `)}
                    </ul>
                </section>
            </div>
        `;
    }
}
customElements.define("todo-list", TodoList);