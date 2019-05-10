import React, { Component } from "react";
import { confirmPassword } from "../../../actions/auth/auth";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

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
        auth: state.authReducer,
        user: state.authReducer.userdata
    }
}

const mapDispatchToProps = dispatch => {
    return {
        confirm: (name, password, email, code) => dispatch(confirmPassword(name, password, email, code))
    }
}

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


class ConfirmPassword extends Component {

    state = {
        code: "",
        err: ""
    }
    
    setChanges = e => {
        this.setState({code : e.target.value})
    }
    submit = e => {
        e.preventDefault();
        this.props.confirm(this.state.code).then(res => {
            localStorage.removeItem("notAuthorizated")
            this.props.history.push("/signIn")
            this.setState({err: ""})
        }).catch ( e => {
            console.log(e)
            this.setState({err: "Invalid code!"})
        })
        
    };
    render() {

        const { classes } = this.props;
        console.log(this.props)
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>✎</Avatar>
                    <Typography component="h1" variant="h5">
                        Enter your code
                    </Typography>
                    <div className="err">
                        {this.state.err ? this.state.err : ""}
                    </div>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">Code</InputLabel>
                            <Input
                                id="text"
                                name="code"
                                // autoComplete="text"
                                autoFocus
                                value={this.state.email}
                                onChange={e => this.setChanges(e)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled = {!(this.state.code)}
                            color="primary"
                            className={classes.submit}
                            onClick={e => this.submit(e)}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

// export default  connect(mapStateToProps, mapDispatchToProps)( ConfirmPassword));
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ConfirmPassword)));
