import {LitElement, html} from 'lit-element';

import './simple-list';

export class MainApp extends LitElement {
    render() {
        return html`
            <h1>A simple LitElement App</h1>
            <simple-list></simple-list>
        `;
    }
}
customElements.define('main-app', MainApp);