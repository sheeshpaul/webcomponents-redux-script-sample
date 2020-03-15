/**
 * Implements Single class Model, where one class has both UI and Redux logic.
 */

class CounterElementV1 extends HTMLElement {
    constructor() {
        super();

        this.countElement = null;

        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['value'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div>
                <div>Value is <span>${this.getAttribute('value')}</span></div>
                <button>Increment</button>
                <button>Decrement</button>
            </div>`;

        this.shadowRoot.querySelectorAll('button')[0].addEventListener('click', () => { this.increment(); });
        this.shadowRoot.querySelectorAll('button')[1].addEventListener('click', () => { this.decrement(); });
        this.countElement = this.shadowRoot.querySelector('span');
    }

    disconnectedCallback() {
        // noop
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.isConnected) {
            return;
        }

        if (name === 'value' && newValue !== oldValue) {
            this.countElement.innerText = newValue;
        }
    }

    mapStateToProps(oldState, newState) {
        if (oldState === undefined) {
            this.attributeChangedCallback('value', null, newState.counter.count);
            return;
        }

        if (newState.counter.count !== oldState.counter.count) {
            this.attributeChangedCallback('value', oldState.counter.count, newState.counter.count);
        }
    }

    mapDispatchToProps(dispatch) {
        return {
            increment: () => dispatch({ type: 'INCREMENT' }),
            decrement: () => dispatch({ type: 'DECREMENT' })
        }
    }
}

WebComponentsRedux.connect(CounterElementV1, store);

customElements.define('counter-element-v1', CounterElementV1);
