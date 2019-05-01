import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth/auth";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

const styles = theme => ({
    layout: {
        backgroundColor: "#3f51b5",
        textAlign: "center",
        [theme.breakpoints.up(2000)]: {
            width: "100%"
        }
    },
    toolbarMain: {
        borderBottom: `1px solid #fff`
    },
    toolbarTitle: {
        flex: 1,
        color: "#ffffff"
    },
    // toolbarSecondary: {
    //     justifyContent: "space-between"
    // },
    buttonMargin: {
        //   margin: "0 20px",
        borderColor: "#ffffff",
        color: "#ffffff"
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        width: 150
    }
});

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

class Header extends Component {
    render() {
        console.log(this.props);
        const { classes } = this.props;
        return (
            <header className="Header">
                <CssBaseline />
                <div className={classes.layout}>
                    <Toolbar className={classes.toolbarMain}>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            CHATauri
                        </Typography>
                        {this.props.isAuth ? (
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.buttonMargin}
                                onClick={() => this.props.logout()}
                            >
                                LogOut
                            </Button>
                        ) : (
                            <div className={classes.wrapper}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.buttonMargin}
                                >
                                    <Link
                                        to="/signIn"
                                        style={{ color: "#ffffff" }}
                                    >
                                        Sign In
                                    </Link>
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.buttonMargin}
                                >
                                    <Link
                                        to="/signUp"
                                        style={{ color: "#ffffff" }}
                                    >
                                        Sign Up
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </Toolbar>
                </div>

                {/* <div className="wrapper-header">
                    {this.props.isAuth ? (
                        <ul>
                            <li onClick={() => this.props.logout()}>Logout</li>
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
                </div> */}
            </header>
        );
    }
}

export default withStyles(styles)(
    connect(
        null,
        mapDispatchToProps
    )(Header)
);
