class App extends React.Component {
    render() {
        return <CounterComponentStateful value='1' startValue='100'></CounterComponentStateful>;
    }
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('root')
);
