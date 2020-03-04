class CounterComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div>
                <div>Value is {this.props.value}</div>
                <button onClick={this.props.increment}>Increment</button>
                <button onClick={this.props.decrement}>Decrement</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.counter.count
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      increment: () => dispatch({ type: "INCREMENT" }),
      decrement: () => dispatch({ type: "DECREMENT" })
    }
  }

let CounterComponentStateful = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
