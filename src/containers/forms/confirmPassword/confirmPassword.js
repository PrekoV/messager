import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { confirmPassword } from "../../../actions/auth/auth";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        confirm: (name, password, email, code) => dispatch(confirmPassword(name, password, email, code))
    }
}

class ConfirmPassword extends Component {

    state = {
        code: ""
    }
    setChanges = e => {
        this.setState({code : e.target.value})
    }
    submit = e => {
        console.log("ddddddddd")
        e.preventDefault();
        this.props.confirm(this.props.user.name, this.props.user.password, this.props.user.email,this.state.code).then(res => {
            this.props.history.push("/signIn")
        }).catch ( e => {
            console.log(e)
        })
        
    };
    render() {
        console.log(this.props)
        return (
            <div className="ConfirmPassword">
             <div className="err">
                        {this.state.err ? this.state.err : (this.props.auth.err ? this.props.auth.err : "") }
                    </div>
                <div className="wrapper">
                    <TextField
                        id="standard-name"
                        label="Enter your code"
                        // className={classes.textField}
                        value={this.state.code}
                        onChange={e => this.setChanges(e)}
                        margin="normal"
                        // InputProps={{
                        //     classes: {
                        //       root: this.props.cssOutlinedInput,
                        //       focused: this.props.cssFocused,
                        //       notchedOutline: this.props.notchedOutline,
                        //     },
                        //   }}
                        name="code"
                    /> 
                     <div className="line"/>
                    <Button variant="contained" onClick={e => this.submit(e)}>Submit</Button>
                    <div className="line"/>
                </div>
               
            </div>
        );
    }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)( ConfirmPassword));
