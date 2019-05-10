import React, { Component } from "react";
import { emailPattern } from "../../../constants";
import { register } from "../../../actions/auth/auth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: (name, password, email) =>
            dispatch(register(name, password, email))
    };
};

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        repeatPassword: "",
        err: "",
        name: ""
    };

    componentWillUnmount() {
        document.removeEventListener("click", this.submit);
        document.removeEventListener("change", this.setInput);
    }

    setInput = e => {
        this.setState({ [e.target.name]: e.target.value, err: "" });

        switch (e.target.name) {
            case "email":
                if (emailPattern.test(e.target.value)) {
                    this.setState({
                        err: ""
                    });
                } else
                    this.setState({
                        err: "Enter your e-mail"
                    });
                break;
            case "repeatPassword":
                if (e.target.value === this.state.password) {
                    this.setState({
                        err: ""
                    });
                } else {
                    this.setState({
                        err: "Passwords do not match!"
                    });
                }
                break;
            case "password":
                if (e.target.value.length < 5) {
                    this.setState({
                        err: "Password is too short"
                    });
                } else {
                    this.setState({
                        err: ""
                    });
                }
                break;
            case "name":
                if (e.target.value.length < 5) {
                    this.setState({
                        err: "Name is too short"
                    });
                } else {
                    this.setState({
                        err: ""
                    });
                }
                break;
            default:
                this.setState({
                    err: ""
                });
        }
    };

    submit = e => {
        e.preventDefault();
        this.props
            .register(this.state.name, this.state.password, this.state.email)
            .then(res => {
                localStorage.setItem("notAuthorizated", true);
                // this.setState({ err: "" });
                this.props.history.push("/confirm");
                
            })
            .catch(e => {
                console.log(e);
                this.setState({ err: "Invalid values",  email: "",
                password: "",
                repeatPassword: "",
                name: "" });
            });
    };
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */}♚
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <div className="err">
                         {this.state.err
                            ? this.state.err
                            : ""}
                    </div>
                    <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Name
                            </InputLabel>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={this.state.name}
                                onChange={(e) => this.setInput(e)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={(e) => this.setInput(e)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={(e) => this.setInput(e)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Repeat Password</InputLabel>
                            <Input
                                name="repeatPassword"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.repeatPassword}
                                onChange={(e) => this.setInput(e)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled = {!(this.state.name && this.state.email && this.state.password && this.state.repeatPassword && !this.state.err)}
                            className={classes.submit}
                            onClick={(e)=>this.submit(e)}
                        >
                            Sign up
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(SignUp))
);







// // const styles = theme => ({
// //     cssOutlinedInput: {
// //         '&$cssFocused $notchedOutline': {
// //           borderColor: pink[500],
// //         },
// //       },
// //     })

// const mapStateToProps = state => {
//     return {
//         auth: state.authReducer
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         register: (name, password, email) =>
//             dispatch(register(name, password, email))
//     };
// };

// class SignUp extends Component {
//     state = {
//         email: "",
//         password: "",
//         repeatPassword: "",
//         err: "",
//         name: ""
//     };

//     setInput = e => {
//         this.setState({ [e.target.name]: e.target.value, err: "" });

//         switch (e.target.name) {
//             case "email":
//                 if (emailPattern.test(e.target.value)) {
//                     this.setState({
//                         err: ""
//                     });
//                 } else
//                     this.setState({
//                         err: "Enter your e-mail"
//                     });
//                 break;
//             case "repeatPassword":
//                 if (e.target.value === this.state.password) {
//                     this.setState({
//                         err: ""
//                     });
//                 } else {
//                     this.setState({
//                         err: "Passwords do not match!"
//                     });
//                 }
//                 break;
//             case "password":
//                 if (e.target.value.length < 5) {
//                     this.setState({
//                         err: "Password is too short"
//                     });
//                 } else {
//                     this.setState({
//                         err: ""
//                     });
//                 }
//                 break;
//             default:
//                 this.setState({
//                     err: ""
//                 });
//         }
//     };

//     submit = e => {
//         e.preventDefault();
//         this.props
//             .register(this.state.name, this.state.password, this.state.email)
//             .then(res => {
//                 this.props.history.push("/confirm");
//                 localStorage.setItem("notAuthorizated", true)
//                 this.setState({err: ""})
//             })
//             .catch(e => {
//                 console.log(e);
//                 this.setState({err: "Invalid values"})
//             });
//     };
//     render() {
//         return (
//             <div className="SignUp">
//                 <div className="wrapper">
//                     <p className="title">Sign Up</p>
//                     <div className="err">
//                         {this.state.err
//                             ? this.state.err
//                             : ""}
//                     </div>
//                     <form onSubmit={e => this.submit(e)}>
//                         <div>
//                             <TextField
//                                 id="standard-name"
//                                 label="Name"
//                                 // className={classes.textField}
//                                 value={this.state.name}
//                                 onChange={e => this.setInput(e)}
//                                 margin="normal"
//                                 // InputProps={{
//                                 //     classes: {
//                                 //       root: this.props.cssOutlinedInput,
//                                 //       focused: this.props.cssFocused,
//                                 //       notchedOutline: this.props.notchedOutline,
//                                 //     },
//                                 //   }}
//                                 name="name"
//                             />
//                             <TextField
//                                 id="standard-name"
//                                 label="Email"
//                                 // className={classes.textField}
//                                 value={this.state.email}
//                                 onChange={e => this.setInput(e)}
//                                 margin="normal"
//                                 // InputProps={{
//                                 //     classes: {
//                                 //       root: this.props.cssOutlinedInput,
//                                 //       focused: this.props.cssFocused,
//                                 //       notchedOutline: this.props.notchedOutline,
//                                 //     },
//                                 //   }}
//                                 name="email"
//                             />
//                             <TextField
//                                 id="standard-password-input"
//                                 label="Password"
//                                 value={this.state.password}
//                                 //className={classes.textField}
//                                 type="password"
//                                 onChange={e => this.setInput(e)}
//                                 name="password"
//                                 autoComplete="current-password"
//                                 margin="normal"
//                             />
//                             <TextField
//                                 id="standard-password-input"
//                                 label="Repeat Password"
//                                 value={this.state.repeatPassword}
//                                 //className={classes.textField}
//                                 type="password"
//                                 onChange={e => this.setInput(e)}
//                                 name="repeatPassword"
//                                 autoComplete="current-password"
//                                 margin="normal"
//                             />
//                         </div>
//                         <div className="line" />
//                         {this.state.name &&
//                         (this.state.password === this.state.repeatPassword &&
//                             (this.state.password !== null &&
//                                 this.state.repeatPassword !== null)) &&
//                         this.state.email &&
//                         this.state.err === "" ? (
//                             <Button
//                                 variant="contained"
//                                 onClick={e => this.submit(e)}
//                             >
//                                 Submit
//                             </Button>
//                         ) : (
//                             <Button
//                                 variant="contained"
//                                 color="secondary"
//                                 disabled
//                             >
//                                 Submit
//                             </Button>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// export default withRouter(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(SignUp)
// );