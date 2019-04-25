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
        return [css`
            :host {
                display: block;
                user-select: none;
            }
            
            li {
                font-size: 24px;
                display: block;
                position: relative;
                border-bottom: 1px solid #ededed;
            }
            
            li input {
                text-align: center;
                width: 40px;
                /* auto, since non-WebKit browsers doesn't support input styling */
                height: auto;
                position: absolute;
                top: 9px;
                bottom: 0;
                margin: auto 0;
                border: none;
                /* Mobile Safari */
                -webkit-appearance: none;
                appearance: none;
            }
            
           
            li label {
                white-space: pre;
                word-break: break-word;
                padding: 15px 60px 15px 15px;
                margin-left: 45px;
                display: block;
                line-height: 1.2;
                transition: color 0.4s;
            }
            
            li.completed label {
                color: #d9d9d9;
                text-decoration: line-through;
            }

            input[type=checkbox] + label {
                display: block;
                margin: 0.2em;
                cursor: pointer;
                padding: 0.2em;
            }
            
            input[type=checkbox] {
                display: none;
            }
            
            input[type=checkbox] + label:before {
                content: '\u2714';
                border: none;
                /* border: 0.1em solid #000; */
                border-radius: 0.2em;
                display: inline-block;
                width: 1em;
                height: 1em;
                padding-left: 0.2em;
                padding-bottom: 0.3em;
                margin-right: 0.2em;
                vertical-align: bottom;
                color: transparent;
                transition: .2s;
            }

            input[type=checkbox] + label:active:before {
                transform: scale(0);
            }

            input[type=checkbox]:checked + label:before {
                /* background-color: MediumSeaGreen;
                border-color: MediumSeaGreen; */
                color: #fff;
            }

            li button {
                margin: 0;
                padding: 0;
                border: 0;
                background: none;
                font-size: 100%;
                vertical-align: baseline;
                font-family: inherit;
                font-weight: inherit;
                color: inherit;
                -webkit-appearance: none;
                appearance: none;
                -webkit-font-smoothing: antialiased;
                -moz-font-smoothing: antialiased;
                font-smoothing: antialiased;
                outline: none;
            }
            
            li button {
                position: absolute;
                top: 0;
                right: 10px;
                bottom: 0;
                width: 40px;
                height: 40px;
                margin: auto 0;
                font-size: 30px;
                color: #cc9a9a;
                margin-bottom: 11px;
                transition: color 0.2s ease-out;
            }
            
            li button:hover {
                color: #af5b5e;
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
