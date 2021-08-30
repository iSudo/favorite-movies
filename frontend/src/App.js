import './App.css';
import React from "react";
import Search from "./Search";
import {Link, Route, Switch} from "react-router-dom";
import {Tab, Tabs} from "@material-ui/core";
import Banner from "./Banner";
import Favorites from "./Favorites";

class App extends React.Component {
    state = {
        value: '',
        alert: undefined,
    };

    componentDidMount() {
    }

    a11yProps = (index) => {
        return {
            id: `nav-tab-${index}`,
            'aria-controls': `nav-tabpanel-${index}`,
        };
    }

    render() {
        return (
            <main>
                <Route
                    path="/"
                    render={({ location }) => (
                        <React.Fragment>
                            <Tabs value={location.pathname}>
                                <Tab label="Search movies" value="/" component={Link} to="/" />
                                <Tab label="My favorites" value="/my-favorites" component={Link} to="/my-favorites" />
                            </Tabs>
                            <Banner  />
                            <Switch>
                                <Route path='/' component={Search} exact/>
                                <Route path='/my-favorites' component={Favorites}/>
                            </Switch>
                        </React.Fragment>
                    )}
                />
            </main>
        );
    }
}

export default App;
