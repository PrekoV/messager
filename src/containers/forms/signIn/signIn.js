
import React from "react";

import { emailPattern } from "../../../constants";
import { login } from "../../../actions/auth/auth";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// import React, { Component } from "react";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

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
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
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
        login: (name, password, email, history) =>
            dispatch(login(name, password, email, history))
    };
};

class SignIn extends React.Component {
    state = {
        email: "",
        password: "",
        err: "",
        name: ""
    };

    componentDidMount = () => {
        if (localStorage.getItem("notAuthorizated"))
            this.props.history.push("/confirm");
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
            case "password":
                if (e.target.value.length < 5) {
                    this.setState({
                        err: "Password too short!"
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
        if (emailPattern.test(this.state.email)) {
            console.log("submit");
            this.setState({ password: "", err: "" });
            this.props
                .login(this.state.name, this.state.password, this.state.email)
                .then(res => {
                    // this.setState({ err: "" });
                    this.props.history.push("/");
                    
                })
                .catch(e => {
                    console.log(e);
                    this.setState({ err: "Wrong name or password" });
                });
        } else
            this.setState({
                err: "Enter your e-mail",
                email: "",
                password: ""
            });
    };
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */} ♔
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div className="err">
                        {this.state.err ? this.state.err : ""}
                    </div>
                    <form className={classes.form} onSubmit={this.submit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">Name</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={this.state.name}
                                onChange={e => this.setInput(e)}
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
                                // autoFocus
                                value={this.state.email}
                                onChange={e => this.setInput(e)}
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
                                onChange={e => this.setInput(e)}
                            />
                        </FormControl>
                        <div className="forgot">
                            <Link to="/resetPassword">
                                Forgot your password?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            // onClick={e => this.submit(e)}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

// SignIn.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(SignIn))
);









// // import CustomButton from "../../../components/customComponents/CustomButton";
// //import pink from '@material-ui/core/colors/pink';

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
//         login: (name, password, email, history) =>
//             dispatch(login(name, password, email, history))
//     };
// };

// class SignIn extends Component {
//     state = {
//         email: "",
//         password: "",
//         err: "",
//         name: ""
//     };

//     componentDidMount = () => {
//         if(localStorage.getItem("notAuthorizated")) this.props.history.push("/confirm")
//     }

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
//             case "password":
//                 if (e.target.value.length < 5) {
//                     this.setState({
//                         err: "Password too short!"
//                     });
//                 } else {
//                     this.setState({
//                         err: ""
//                     });
//                 }
//                 break;
//             default:
//             this.setState({
//                 err: ""
//             });
//         }
//     };

//     submit = e => {
//         console.log("ddddddddd");
//         e.preventDefault();

//         if (emailPattern.test(this.state.email)) {
//             console.log("submit");
//             this.setState({ password: "", err: "" });
//             this.props
//                 .login(this.state.name, this.state.password, this.state.email)
//                 .then(res => {
//                     this.props.history.push("/");
//                     this.setState({err: ""})
//                 })
//                 .catch(e => {
//                     console.log(e);
//                     this.setState({err: "Wrong name or password"})
//                 });
//         } else
//             this.setState({
//                 err: "Enter your e-mail",
//                 email: "",
//                 password: ""
//             });

//     };
//     render() {
//         console.log(this.props);
//         return (
//             <div className="SignIn">
//                 <div className="wrapper">
//                     <p className="title">Sign In</p>
//                     <div className="err">
//                         {this.state.err
//                             ? this.state.err
//                             : ""}
//                     </div>
//                     <form
//                         style={{
//                             display: "flex",
//                             alignItems: "space-around",
//                             flexDirection: "column"
//                         }}
//                     >
//                         <div className="inputs">
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
//                         </div>
//                         <div className="line" />
//                         {this.state.name &&
//                         this.state.password &&
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

//                         {/* <CustomButton>ssssss</CustomButton> */}
//                         <div className="forgot">
//                             <Link to="/resetPassword">
//                                 Forgot your password?
//                             </Link>{" "}
//                         </div>
//                         <div className="line" />
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
//     )(SignIn)
// );