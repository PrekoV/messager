import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { emailPattern } from "../../../constants";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import  {login} from '../../../actions/auth/auth'
// import CustomButton from "../../../components/customComponents/CustomButton";
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
        login: (name, password, email, history) => dispatch(login(name, password, email, history))
    }
}

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        err: "",
        name: ""
    };

    setInput = e => {
        this.setState({ [e.target.name]: e.target.value, err: "" });
    };

    submit = e => {
        console.log("ddddddddd");
        e.preventDefault();
        if (emailPattern.test(this.state.email)) {
            console.log("submit");
            this.setState({ password: "", err: "" });
            this.props.login(this.state.name, this.state.password, this.state.email).then(res => {
                this.props.history.push("/")
            }).catch(e => {
                console.log(e)
            })
            console.log(this.props.history)
           // this.props.history.push("/")
        } else
            this.setState({
                err: "Enter your e-mail",
                email: "",
                password: ""
            });
    };
    render() {
        console.log(this.props)
        return (
            <div className="SignIn">
                <div className="wrapper">
                    <p className="title">Sign In</p>
                    <div className="err">
                        {this.state.err ? this.state.err : (this.props.auth.err ? this.props.auth.err : "") }
                    </div>
                    <form
                        style={{
                            display: "flex",
                            alignItems: "space-around",
                            flexDirection: "column"
                        }}
                    >
                        <div className="inputs">
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
                        </div>
                        <div className="line" />
                        <Button
                            variant="contained"
                            onClick={e => this.submit(e)}
                        >Submit
                            
                        </Button>
                        {/* <CustomButton>ssssss</CustomButton> */}
                        <div className="forgot">
                            <Link to="/resetPassword">
                                Forgot your password?
                            </Link>{" "}
                        </div>
                        <div className="line" />
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
