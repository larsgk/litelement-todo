import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

import {ListService} from'./list-service';

import './simple-item';

const _texts = ['Nice item', 'Awesome item', 'Cool item'];
const _colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'purple']; 

export class SimpleList extends LitElement {
    static get styles() {
        return [css`
            h2,li {
                cursor: pointer;
            }
            li {
                font-weight: bold;
            }
        `];
    }

    render() {
        return html`
            <h2 @click=${this.addRandomItem}>A simple list (click here to add)</h2>
            <span>Item count: ${ListService.list.length}</span>
            <ul>
                ${repeat(ListService.list, i => i.id, (item, index) => html`
                    <li @click=${() => {ListService.removeItem(item.id)}}><simple-item text=${item.text} color=${item.color}></simple-item>[click to remove]</li>
                `)}
            </ul>
        `;
    }

    addRandomItem() {
        ListService.addItem(
            _texts[Math.floor(_texts.length * Math.random())],
            _colors[Math.floor(_colors.length * Math.random())],
        );
    }

    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.requestUpdate();
    }

    connectedCallback() {
        super.connectedCallback();
        ListService.addEventListener('change', this.onChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        ListService.removeEventListener('change', this.onChange);
    }
}
customElements.define('simple-list', SimpleList);