// @ts-check
import { LitElement, html, css, supportsAdoptingStyleSheets } from "lit-element";

import './components/todo-list';

import { ServiceWorkerReg } from './reg-sw';

export class MainApp extends LitElement {
  static get properties() {
    return {
      updateAvailable: {type:Boolean}
    };
  }

  static get styles() { 
    return [
      css`
        .content {
          margin: auto;
          position: relative;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.4em;
          background: #f5f5f5;
          color: #4d4d4d;
          width: 95%;
          max-width: 550px;
          font-weight: 300;
        }
        
        .refresh {
          position: fixed;
          left: 20px;
          bottom: 20px;
          background: black;
        }

        a {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 14px;
          font-weight: bold;
          line-height: 40px;
          color: white;
          margin: 20px;
        }

        a:hover {
          color: purple;
          cursor: pointer;
        }
    `];
  }

  constructor() {
    super();

    this.updateAvailable = false;
    this.updateIsAvailable = this.updateIsAvailable.bind(this);    
  }

  connectedCallback() {
    super.connectedCallback();
    ServiceWorkerReg.addEventListener('update-available', this.updateIsAvailable);
    ServiceWorkerReg.register();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    ServiceWorkerReg.removeEventListener('update-available', this.updateIsAvailable);
  }

  updateIsAvailable() {
    this.updateAvailable = true;
  }

  render() {
    return html`
      <div class="content">
        <todo-list></todo-list>
      </div>
      ${this.updateAvailable ? 
        html`<div class="refresh"><a @click=${this.refresh}>REFRESH APP</a></div>` : ''}
    `;
  }

  refresh() {
    window.location.reload();    
  }
}
customElements.define("main-app", MainApp);
