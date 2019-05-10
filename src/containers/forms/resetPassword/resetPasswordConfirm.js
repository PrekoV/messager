import React, { Component } from "react";
import { resetPassword } from "../../../actions/auth/auth";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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

class ResetPasswordConfirm extends Component {
    state = {
        password: "",
        repeatPassword: "",
        err: "",
        token: ""
    };

    componentDidMount = () => {
        if (localStorage.getItem("notAuthorizated"))
            this.props.history.push("/confirm");
        let a = this.props.history.location.pathname.split("/");
        this.setState({ token: a[a.length - 1] });
    };

    setInput = e => {
        this.setState({ [e.target.name]: e.target.value, err: "" });

        switch (e.target.name) {
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
            default:
                this.setState({
                    password: "",
                    repeatPassword: "",
                    err: "",
                    token: ""
                });
        }
    };

    submit = e => {
        console.log("ddddddddd");
        e.preventDefault();

        if (this.state.password === this.state.repeatPassword) {
            console.log("submit");
            this.setState({
                password: "",
                err: "",
                repeatPassword: ""
            });
            this.props
                .reset(this.state.token, this.state.password)
                .then(res => {
                    this.props.history.push("/signIn");
                    this.setState({ err: "" });
                })
                .catch(e => {
                    console.log(e);
                    this.setState({ err: "" });
                });
        } else {
            this.setState({
                password: "",
                err: "Passwords do not match!",
                repeatPassword: ""
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>✎</Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <div className="err">
                         {this.state.err
                            ? this.state.err
                            : ""}
                    </div>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">
                                New Password
                            </InputLabel>
                            <Input
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                autoFocus
                                value={this.state.password}
                                onChange={(e)=>this.setInput(e)}
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
                                onChange={(e)=>this.setInput(e)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled = {!(this.state.repeatPassword && this.state.password && !this.state.err)}
                            className={classes.submit}
                            onClick={(e) => this.submit(e)}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ResetPasswordConfirm));





// const mapStateToProps = state => {
//     return {
//         auth: state.authReducer
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         reset: (name, newPassword) => dispatch(resetPassword(name, newPassword))
//     };
// };

// class ResetPasswordConfirm extends Component {
//     state = {
//         password: "",
//         repeatPassword: "",
//         err: "",
//         token: ""
//     };

//     componentDidMount = () => {
//         if (localStorage.getItem("notAuthorizated"))
//             this.props.history.push("/confirm");
//         let a = this.props.history.location.pathname.split("/");
//         this.setState({ token: a[a.length - 1] });
//     };

//     setInput = e => {
//         this.setState({ [e.target.name]: e.target.value, err: "" });

//         switch (e.target.name) {
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
//             default:
//                 this.setState({
//                     password: "",
//                     repeatPassword: "",
//                     err: "",
//                     token: ""
//                 });
//         }
//     };

//     submit = e => {
//         console.log("ddddddddd");
//         e.preventDefault();

//         if (this.state.password === this.state.repeatPassword) {
//             console.log("submit");
//             this.setState({
//                 password: "",
//                 err: "",
//                 repeatPassword: ""
//             });
//             this.props
//                 .reset(this.state.token, this.state.password)
//                 .then(res => {
//                     this.props.history.push("/signIn");
//                     this.setState({ err: "" });
//                 })
//                 .catch(e => {
//                     console.log(e);
//                     this.setState({ err: "" });
//                 });
//         } else {
//             this.setState({
//                 password: "",
//                 err: "Passwords do not match!",
//                 repeatPassword: ""
//             });
//         }
//     };
//     render() {
//         console.log(this.state);
//         return (
//             <div className="resetPassword">
//                 <div className="wrapper">
//                     <p className="title">Reset Password</p>
//                     <div className="err">
//                         {this.state.err
//                             ? this.state.err
//                             : this.props.auth.err
//                             ? this.props.auth.err
//                             : ""}
//                     </div>
//                     <form>
//                         <div>
//                             <TextField
//                                 id="standard-password-input"
//                                 label="New Password"
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
//                         <Button
//                             variant="contained"
//                             onClick={e => this.submit(e)}
//                         >
//                             Submit
//                         </Button>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ResetPasswordConfirm);
