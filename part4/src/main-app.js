// @ts-check
import { LitElement, html, css, supportsAdoptingStyleSheets } from "lit-element";

import './components/todo-list';

export class MainApp extends LitElement {
  static get properties() {
    // Add a property to reflect if a new update (new service worker) is available
    return {
    };
  }

  static get styles() { 
    // Add styles
    return [
      css`
    `];
  }

  constructor() {
    super();

    // Initialize properties here
  }

  render() {
    // Add a clickable element to reload the app, shown when an update is available
    return html`
      <div class="content">
        <todo-list></todo-list>
      </div>
    `;
  }
}
customElements.define("main-app", MainApp);
