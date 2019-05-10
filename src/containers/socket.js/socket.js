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

const url = "http://843a7ecc.ngrok.io";
let socket = null;
const styles = theme => ({
    textField: {
        width: "90%",
        margin: 0,
        color: "#2D2B2B"
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
        height: "76vh",
        width: "100%",
        margin: "0 auto"
    },
    history: {
        width: "70%",
        margin: "0 auto"
    },
    name: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "0.75rem",
        paddingLeft: 10,
        height: "20px"
        // transition: '.3s'
        // position: 'absolute'
    }
});

var timeout = undefined;

class SocketConnection extends Component {
    state = {
        text: "",
        count: 1,
        msgs: [],
        typing: false,
        typingUser: "",
        onlineUsers: [],
        symbols: 900
    };

    componentWillMount() {
        socket = io.connect(url);
        this.initSocet(socket);
    }

    componentWillUnmount = () => {
        socket.emit("disconnectUser", { user: this.props.auth.userdata.name });
        socket.disconnect();
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
        socket.on("disconnectUser", data => {
            console.log("disconnect");
            // console.log("disconnectUser",data)
            // this.setState({ onlineUsers: data.onlineUser })
        });
        socket.on("show message user", data => {
            this.setState(
                { msgs: data.result, onlineUsers: data.onlineUser },
                () => {
                    //  console.log(data);
                    this.messagesEnd.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            );
            //this.props.connectToSocket(data.result);
        });
        socket.on("add message on page", data => {
            const newMassage = data.messageData;
            let a = this.state.msgs;
            a.push(newMassage);
            this.setState({ msgs: a, typing: false, typingUser: "" }, () => {
                // if(this.chat.scroll)
                //  console.log(this.chat.scrollHeight-this.chat.scrollTop)
                //if(this.chat.scrollTop >=0 && this.chat.scrollTop <= 200){
                this.messagesEnd.scrollIntoView({ behavior: "smooth" });
                // }
            });
            // this.props.getNewMessage(newMassage);
        });
        socket.on("typing", data => {
            if (!this.state.typing) {
                this.setState({ typing: true, typingUser: data.user }, () => {
                    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
                });
            }
            clearTimeout(timeout);
            timeout = setTimeout(() => this.setState({ typing: false }), 1000);
        });
        
    };

    setInput = e => {
        socket.emit("typing", { user: this.props.auth.userdata.name });
        this.setState({ text: e.target.value, symbols: this.state.symbols-1 });
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
        API.get("pagination/" + this.state.msgs.length)
            .then(res => {
                let m = [...res.data.result, ...this.state.msgs];
                this.setState({ count: a, msgs: m }, () => {
                    if (this.chat.clientHeight !== 759) {
                        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
                    }
                });
                //  this.props.getNext10(a)
            })
            .catch(e => {
                console.log(e);
            });
    };

    onKeyDown = event => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            this.submit(event);
        }
    };

    render() {
        const { classes } = this.props;
        //console.log(this.state);
        return (
            <div className="SocketConnection">
                <div className="chatWrapper">
                    <div className="chat">
                        <div
                            ref={r => {
                                this.chat = r;
                            }}
                            className={classes.chatWrapper}
                            id="a"
                        >
                            <div className={classes.history}>
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
                                            onlineUsers={this.state.onlineUsers}
                                            date={msg.createdAt}
                                        />
                                    );
                                })}
                                <div
                                    style={{ float: "left", clear: "both" }}
                                    ref={el => {
                                        this.messagesEnd = el;
                                    }}
                                />
                                {/* <div style={{position: 'relative'}}> */}

                                <div className={classes.name}>
                                    {this.state.typing &&
                                        this.state.typingUser + " is typing..."}
                                </div>

                                {/* </div> */}
                            </div>
                        </div>

                        <div className={classes.formwrapper}>
                            <form
                                className={classes.wrapper}
                                onSubmit={e => this.submit(e)}
                            >
                                <TextField
                                    id="outlined-with-placeholder"
                                    label="Type message"
                                    placeholder="Enter text"
                                    onKeyDown={this.onKeyDown}
                                    multiline
                                    value={this.state.text}
                                    onChange={e => this.setInput(e)}
                                    rowsMax="2"
                                    helperText={this.props.auth.userdata.name + " "+this.state.symbols}
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
