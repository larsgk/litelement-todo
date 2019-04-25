import {LitElement, html} from 'lit-element';

export class SimpleItem extends LitElement {
    static get properties() {
        return {
            text: {type:String},
            color: {type:String}
        };
    }

    render() {
        return html`
            <style>
                span {
                    color: ${this.color};
                }
            </style>
            <span>${this.text}</span>
        `;
    }
}
customElements.define('simple-item', SimpleItem);