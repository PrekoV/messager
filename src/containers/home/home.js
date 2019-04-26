import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <div className="wrapper-header">
                    <ul>
                        <li>SignIn</li>
                        <li>SignUp</li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;