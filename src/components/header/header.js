import React, { Component } from "react";
import { Link } from "react-router-dom";
import {logout} from '../../actions/auth/auth'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
} 

class Header extends Component {
    render() {
        console.log(this.props);
        return (
            <header className="Header">
                <div className="wrapper-header">
                    {this.props.isAuth ? (
                        <ul>
                            <li onClick = {() => this.props.logout()}>
                                Logout
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <Link to="/signIn">SignIn</Link>
                            </li>
                            <li>
                                <Link to="/signUp">SignUp</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </header>
        );
    }
}

export default connect(null, mapDispatchToProps)(Header);
