import React, { Component } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Message from "./message";
import { connect } from "react-redux";
import {
    connectToSocket,
    getNext10,
    getNewMessage
} from "../../actions/messager/messager";
import API from "../../services/api";

const mapStateToProps = state => {
    return {
        msgs: state.messagerReducer.msgs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        connectToSocket: m => dispatch(connectToSocket(m)),
        getNext10: n => dispatch(getNext10(n)),
        getNewMessage: m => dispatch(getNewMessage(m))
    };
};

const url = "https://277a493d.ngrok.io";
let socket = null;
const styles = theme => ({
    textField: {
        width: "90%",
        margin: 0
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    button: {
        margin: theme.spacing.unit,
        [theme.breakpoints.down("xs")]: {
            fontSize: 14
        }
    },
    formwrapper: {
        width: "70%",
        margin: "0 auto"
    },
    chatWrapper: {
        overflow: "auto",
        height: "80vh",
        width: "70%",
        margin: "0 auto"
    }
});

class SocketConnection extends Component {
    state = {
        text: "",
        count: 1,
        msgs: []
    };

    componentWillMount() {
        socket = io.connect(url);
        this.initSocet(socket);
    }

    componentWillUnmount = () => {
        socket.emit("disconnectUser", { user: this.props.auth.userdata.name });
        //  window.removeEventListener('scroll', this.isScroll);
    };

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevProps.msgs.length !==0) {
    //         this.messagesEnd.scrollTop =this.messagesEnd.scrollHeight
    //     } else if(this.props.msgs.length - prevProps.msgs.length < 1) {
    //         this.messagesEnd.scrollIntoView({ block: 'end'});
    //     }else {
    //         this.messagesEnd.scrollIntoView({ block: 'end'});
    //     }

    // }

    initSocet = socket => {
        socket.emit("userConnected", { user: this.props.auth.userdata.name });
        socket.on("show message user", data => {
            console.log(data);
            this.setState({ msgs: data.result }, () => {
                this.messagesEnd.scrollIntoView({
                    behavior: "smooth"
                });
            });
            //this.props.connectToSocket(data.result);
        });
        socket.on("add message on page", data => {
            console.log(data);
            const newMassage = data.messageData;
            let a = this.state.msgs;
            a.push(newMassage);
            this.setState({ msgs: a }, () => {
                this.messagesEnd.scrollIntoView({ behavior: "smooth" });
            });
            // this.props.getNewMessage(newMassage);
        });

        //  socket.disconnect();
    };

    setInput = e => {
        this.setState({ text: e.target.value });
    };

    submit = e => {
        e.preventDefault();
        if (
            this.state.text &&
            this.state.text.length > 0 &&
            this.state.text.trim()
        ) {
            socket.emit("send message", {
                msg: this.state.text.trim(),
                senderName: this.props.auth.userdata.name
            });
            this.setState({ text: "" });
        }
    };

    loadMore = () => {
        let a = this.state.count;
        a++;
        // console.log(a)
        // this.setState({count: a})
        console.log("aa")
        // pagination?page=3&countMessage=1
        API.get("pagination?page="+a+"&countMessage="+(this.state.msgs.length)).then(res => {
            console.log(a);
            console.log(res);
            let m = [...res.data.result,...this.state.msgs];
            // m.concat(res.data.result);
            console.log(m);
            this.setState({ count: a, msgs: m }, () => {
                this.messagesEnd.scrollTop =this.messagesEnd.scrollHeight
            });
            //  this.props.getNext10(a)
        }).catch(e => {
            console.log("ffff")
        });
        //   this.setState({count: a})
        // this.props.getNext10(a)
    };

    render() {
        const { classes } = this.props;
        console.log(this.state, this.props);
        return (
            <div className="SocketConnection">
                <div className="chatWrapper">
                    <div className="chat">
                        <div className={classes.chatWrapper}>
                            <Button
                                color="secondary"
                                className={classes.button}
                                onClick={() => this.loadMore()}
                            >
                                Load more...
                            </Button>
                            {this.state.msgs.map(msg => {
                                return (
                                    <Message
                                        key={msg.id}
                                        isMe={
                                            msg.senderName ===
                                            this.props.auth.userdata.name
                                        }
                                        name={msg.senderName}
                                        text={msg.body}
                                    />
                                );
                            })}
                            <div
                                style={{ float: "left", clear: "both" }}
                                ref={el => {
                                    this.messagesEnd = el;
                                }}
                            />
                        </div>

                        <div className={classes.formwrapper}>
                            <form
                                className={classes.wrapper}
                                onSubmit={e => this.submit(e)}
                            >
                                <TextField
                                    id="outlined-textarea"
                                    label="Type message"
                                    placeholder="Enter text"
                                    multiline
                                    value={this.state.text}
                                    onChange={e => this.setInput(e)}
                                    helperText={this.props.auth.userdata.name}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.button}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SocketConnection));
