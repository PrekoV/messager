import React from "react";
import "./style/App.css";
import { authorizated } from "./actions/auth/auth";
import { connect } from "react-redux";

import Header from "./components/header/header";
// import RouterComponent from "./Router";
import SocketConnection from "./containers/socket.js/socket";

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
      //  console.log(this.props.auth);
        this.props.authorizated();
        if (localStorage.getItem("notAuthorizated"))
            this.props.history.push("/confirm");
    };
    render() {
      //  console.log(this.props.auth);
        return (
            <div>
                <Header isAuth={this.props.auth.isAuth} />
                {this.props.auth.isAuth ? (
                    <SocketConnection auth={this.props.auth} />
                ) : (
                    <div className='not-auth'> 
                        You have to sign in (sign up) to message
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
