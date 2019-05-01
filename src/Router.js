import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./containers/forms/signUp/signUp";
import ConfirmPassword from "./containers/forms/confirmPassword/confirmPassword";

import SignIn from "./containers/forms/signIn/signIn";
import App from "./App";

import NotFound from "./components/notFound";
import resetPassword from "./containers/forms/resetPassword/resetPassword";
import resetPasswordConfirm from "./containers/forms/resetPassword/resetPasswordConfirm";

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/confirm" component={ConfirmPassword} />
                        <Route
                            path="/resetPassword"
                            component={resetPassword}
                        />
                        <Route
                            path="/resetPasswordConfrim"
                            component={resetPasswordConfirm}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default RouterComponent;
