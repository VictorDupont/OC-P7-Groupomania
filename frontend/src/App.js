import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Login from './Login/Login';
import Register from "./Register/Register";
import Home from "./Home/Home";
import Logout from "./Logout/Logout";

class App extends React.Component {

    isAuthenticated() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);

        return parts.length === 2;
    }

    render() {
        const isAuthenticated = this.isAuthenticated();

        return (
            <Router>
                <Switch>
                    <Route exact path="/login">
                        { isAuthenticated ? <Redirect to="/" /> : <Login /> }
                    </Route>
                    <Route exact path="/register">
                        { isAuthenticated ? <Redirect to="/" /> : <Register /> }
                    </Route>
                    <Route exact path="/logout">
                        { isAuthenticated ? <Logout /> : <Redirect to="/login" />  }
                    </Route>
                    <Route path="/">
                        { isAuthenticated ? <Home /> : <Redirect to="/login" /> }
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
