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
    
    _onTodoItemChecked(ev) {
        const item = this.list[ev.detail];
        this.list[ev.detail] = Object.assign({}, item, { checked: !item.checked });
        this.storeList();
        this.requestUpdate();
    }
    
    _onTodoItemRemoved(ev) {
        this.list = [...this.list.slice(0, ev.detail), ...this.list.slice(ev.detail + 1)];
        this.storeList();
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
                            @removed=${this._onTodoItemRemoved}
                            @checked=${this._onTodoItemChecked}
                        ></todo-item>
                    `)}
                    </ul>
                </section>
            </div>
        `;
    }
}
customElements.define("todo-list", TodoList);