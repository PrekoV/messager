import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { resetPassword } from "../../../actions/auth/auth";

import Button from "@material-ui/core/Button";

import { connect } from "react-redux";


const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: (name, newPassword) => dispatch(resetPassword(name, newPassword))
    };
};

class ResetPassword extends Component {
    state = {
        password: "",
        repeatPassword: "",
        err: "",
        name: ""
    };

    setInput = e => {
        this.setState({ [e.target.name]: e.target.value, err: "" });
    };

    submit = e => {
        console.log("ddddddddd");
        e.preventDefault();
        if (this.state.password === this.state.repeatPassword) {
            console.log("submit");
            this.setState({
                email: "",
                password: "",
                err: "",
                repeatPassword: ""
            });
            this.props.reset(this.state.name, this.state.password).then(res => {
                this.props.history.push("/signIn")
            }).catch(e => {
                console.log(e)
            })
            
        } else {
            this.setState({
                email: "",
                password: "",
                err: "Passwords do not match!",
                repeatPassword: ""
            });
        }
    };
    render() {
        console.log(this.state)
        return (
            <div className="resetPassword">
                <div className="wrapper">
                    <p className="title">Reset Password</p>
                    <div className="err">
                        {this.state.err ? this.state.err : (this.props.auth.err ? this.props.auth.err : "") }
                    </div>
                    <form>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Name"
                                value={this.state.name}
                                onChange={e => this.setInput(e)}
                                margin="normal"
                                // InputProps={{
                                //     classes: {
                                //       root: this.props.cssOutlinedInput,
                                //       focused: this.props.cssFocused,
                                //       notchedOutline: this.props.notchedOutline,
                                //     },
                                //   }}
                                name="name"
                            />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                value={this.state.password}
                                //className={classes.textField}
                                type="password"
                                onChange={e => this.setInput(e)}
                                name="password"
                                autoComplete="current-password"
                                margin="normal"
                            />
                            <TextField
                                id="standard-password-input"
                                label="Repeat Password"
                                value={this.state.repeatPassword}
                                //className={classes.textField}
                                type="password"
                                onChange={e => this.setInput(e)}
                                name="repeatPassword"
                                autoComplete="current-password"
                                margin="normal"
                            />
                        </div>
                        <div className="line" />
                        <Button
                            variant="contained"
                            onClick={e => this.submit(e)}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
