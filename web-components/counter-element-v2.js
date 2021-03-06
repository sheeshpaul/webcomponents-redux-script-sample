/**
 * Implements Two Class Model, where Presentation class has the UI logic and Container class has the Redux logic.
 */

class CounterElementV2 extends HTMLElement {
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

        this.shadowRoot.querySelectorAll('button')[0].addEventListener('click', () => { this.increment && this.increment(); });
        this.shadowRoot.querySelectorAll('button')[1].addEventListener('click', () => { this.decrement && this.decrement(); });
        this.countElement = this.shadowRoot.querySelector('span');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.isConnected) {
            return;
        }

        if (name === 'value' && newValue !== oldValue) {
            this.countElement.innerText = newValue;
        }
    }
}

class CounterElementV2Stateful extends CounterElementV2 {
    mapStateToProps(oldState, newState) {
        if (oldState === undefined) {
            super.attributeChangedCallback('value', null, newState.counter.count);
            return;
        }

        if (newState.counter.count !== oldState.counter.count) {
            super.attributeChangedCallback('value', oldState.counter.count, newState.counter.count);
        }
    }

    mapDispatchToProps(dispatch) {
        return {
            increment: () => dispatch({ type: 'INCREMENT' }),
            decrement: () => dispatch({ type: 'DECREMENT' })
        }
    }
}

WebComponentsRedux.connect(CounterElementV2Stateful, store);

customElements.define('counter-element-v2', CounterElementV2Stateful);
