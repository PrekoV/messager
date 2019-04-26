import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        width: "200px",
        margin: "auto",
        [theme.breakpoints.up("md")]: {
            backgroundColor: "red"
        }
    }
});

function CustomButton(props) {
    const { classes, children, className, ...other } = props;
    return (
        <Button className={classNames(classes.root, className)} {...other}>
            {children}
        </Button>
    );
}

CustomButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default withStyles(styles)(CustomButton);
