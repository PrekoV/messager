import React, { Component } from "react";
import { forgotPassword } from "../../../actions/auth/auth";
import { emailPattern } from "../../../constants";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";

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
        email: state.authReducer.userdata.email,
        err: state.authReducer.userdata.err
    };
};

const mapDispatchToProps = dispatch => {
    return {
        forgotPassword: email => dispatch(forgotPassword(email))
    };
};

class ResetConfirm extends Component {
    state = {
        err: "",
        email: "",
        message: ""
    };

    componentDidMount = () => {
        if (localStorage.getItem("notAuthorizated"))
            this.props.history.push("/confirm");
    };

    setInput = e => {
        this.setState({ [e.target.name]: e.target.value, err: "" });
        if (emailPattern.test(e.target.value)) {
            this.setState({
                err: ""
            });
        } else
            this.setState({
                err: "Enter your e-mail"
            });
    };

    submit = e => {
        e.preventDefault();
        this.props
            .forgotPassword(this.state.email)
            .then(res => {
                //   this.props.history.push("/confirm");
                this.setState({
                    message: "Check your e-mail",
                    err: "",
                    email: ""
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({ message: "", err: "Wrong e-mail", email: "" });
            });
    };
    render() {
        // console.log(this.state);
        // let a = this.props.history.location.pathname
        // console.log(a)
        // a = a.split("/")
        // console.log(a)

        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>✎</Avatar>
                    <Typography component="h1" variant="h5">
                        Enter your e-mail
                    </Typography>
                    <div className="err">
                        {this.state.err ? this.state.err : ""}
                    </div>
                    <form className={classes.form}>
                        <div>{this.state.message}</div>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">E-mail</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={this.state.email}
                                onChange={e => this.setInput(e)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            disabled = {!(this.state.email)}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => this.submit(e)}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </main>
            // <div className="resetPassword">
            //     <div className="wrapper">
            //         <p className="title">Reset Password</p>
            //         <div className="err">
            //             {this.state.err || this.state.err}
            //         </div>
            //         <form>
            //             <div>{this.state.message}</div>
            //             <div>
            //                 <TextField
            //                     id="standard-name"
            //                     label="Email"
            //                     value={this.state.email}
            //                     onChange={e => this.setInput(e)}
            //                     margin="normal"
            //                     // InputProps={{
            //                     //     classes: {
            //                     //       root: this.props.cssOutlinedInput,
            //                     //       focused: this.props.cssFocused,
            //                     //       notchedOutline: this.props.notchedOutline,
            //                     //     },
            //                     //   }}
            //                     name="email"
            //                 />
            //             </div>
            //             <div className="line" />
            //             {this.state.email && this.state.err === "" ? (
            //                 <Button
            //                     variant="contained"
            //                     onClick={e => this.submit(e)}
            //                 >
            //                     Submit
            //                 </Button>
            //             ) : (
            //                 <Button
            //                     variant="contained"
            //                     color="secondary"
            //                     disabled
            //                 >
            //                     Submit
            //                 </Button>
            //             )}
            //         </form>
            //     </div>
            // </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ResetConfirm));
