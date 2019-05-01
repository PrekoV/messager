import React from "react";
import "./style/App.css";
import { authorizated } from "./actions/auth/auth";
import { connect } from "react-redux";

import Header from "./components/header/header";
import RouterComponent from "./Router";

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authorizated: () => dispatch(authorizated())
    };
};

class App extends React.Component {
    componentDidMount = () => {
        console.log(this.props.auth);
        this.props.authorizated();
        if(localStorage.getItem("notAuthorizated")) this.props.history.push("/confirm")
    };
    render() {
        console.log(this.props.auth);
        return (
            <div>
                {/* <RouterComponent/> */}
                <Header isAuth={this.props.auth.isAuth} />
                {this.props.auth.isAuth && <div> you are in system now</div>}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
