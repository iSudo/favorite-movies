class AlertStore {
    constructor(initialState) {
        this.state = initialState;

        this.listeners = [];
    }

    setState(state) {
        this.state = state;
        for (const listener of this.listeners) {
            listener(state);
        }
    }

    addAlert(message, severity, duration) {
        this.setState({
            alerts: [
                ...this.state.alerts,
                {message, severity, duration}
            ]
        })
    }

    popAlert() {
        return this.state.alerts.pop();
    }

    alerts() {
        return this.state.alerts;
    }

    addListener (listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => listener !== l);
        };
    }

    getState () {
        return this.state;
    }
}

const alertStore = new AlertStore({alerts: []});
export default alertStore;