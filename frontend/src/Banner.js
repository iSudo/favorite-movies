import React from 'react';
import {Alert} from "@material-ui/lab";
import { Snackbar} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import alertStore from "./store/AlertStore";

const styles = theme => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    });

class Banner extends React.Component {
    state = {
        open: false,
    }

    componentDidMount() {
        this.removeListener = alertStore.addListener((state) => {
            this.setState(state)
        });
        this.setState(alertStore.getState())
    }

    componentWillUnmount() {
        this.removeListener();
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        const alert = alertStore.popAlert();
        return (
            <>
                {alert && <div className={classes.root}>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open
                        autoHideDuration={alert.duration} onClose={this.handleClose}
                    >
                        <Alert onClose={this.handleClose} severity={alert.severity}>{alert.message}</Alert>
                    </Snackbar>
                </div>
                }
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Banner);