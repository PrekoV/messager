import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { emailPattern } from "../../../constants";
import {register} from '../../../actions/auth/auth'
import { connect } from 'react-redux'
import Button from "@material-ui/core/Button";
//import pink from '@material-ui/core/colors/pink';

// const styles = theme => ({
//     cssOutlinedInput: {
//         '&$cssFocused $notchedOutline': {
//           borderColor: pink[500],
//         },
//       },
//     })

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (name, password, email) => dispatch(register(name, password, email))
    }
}

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        repeatPassword: "",
        err: " ",
        name: ""
    };

    setInput = e => {
        this.setState({ [e.target.name]: e.target.value, err: "" });
    };

    submit = e => {
        console.log("ddddddddd");
        e.preventDefault();
        if (emailPattern.test(this.state.email)) {
            if (this.state.password === this.state.repeatPassword) {
                console.log("submit");
                this.setState({
                    email: "",
                    password: "",
                    err: "",
                    repeatPassword: ""
                });
                this.props.register(this.state.name, this.state.password, this.state.email).then(res => {
                    this.props.history.push("/confirm")
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
        } else
            this.setState({
                err: "Enter your e-mail",
                email: "",
                password: "",
                repeatPassword: ""
            });
    };
    render() {
        return (
            <div className="SignUp">
                <div className="wrapper">
                    <p className="title">Sign Up</p>
                    <div className="err">{this.state.err ? this.state.err : (this.props.auth.err ? this.props.auth.err : "") }</div>
                    <form>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Name"
                                // className={classes.textField}
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
                                id="standard-name"
                                label="Email"
                                // className={classes.textField}
                                value={this.state.email}
                                onChange={e => this.setInput(e)}
                                margin="normal"
                                // InputProps={{
                                //     classes: {
                                //       root: this.props.cssOutlinedInput,
                                //       focused: this.props.cssFocused,
                                //       notchedOutline: this.props.notchedOutline,
                                //     },
                                //   }}
                                name="email"
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
