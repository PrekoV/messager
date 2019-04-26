import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'

import SignUp from "./containers/forms/signUp/signUp";
import ConfirmPassword from "./containers/forms/confirmPassword/confirmPassword";
import ResetPassword from "./containers/forms/resetPassword/resetPassword";
import SignIn from "./containers/forms/signIn/signIn";
import App from "./App";

export const history = createHistory()


class RouterComponent extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/confirm" component={ConfirmPassword} />
                    <Route path="/resetPassword" component={ResetPassword} />
                </Switch>
            </Router>
        );
    }
}

export default RouterComponent;
