import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";

const styles = theme => ({
    textWrapperSender: {
        borderRadius: '5px',
        overflow: 'hidden',
        border: '1px solid rgba(245, 0, 87, 0.5)',
        padding: 10,
        maxWidth: '100%',
        marginRight: 20,
        wordWrap: 'break-word'
    },
    sender:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    receiver: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start' 
    },
    textWrapperReceiver: {
        borderRadius: '5px',
        border: '1px solid #3f51b5',
        padding: 10,
        maxWidth: '80%',
        marginLeft: 20,
        wordWrap: 'break-word'
    },
    messageWrapper: {
        margin: '10px 0',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'flex-end'
    },
    name: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '0.75rem',
        padding: 10
    },
    text: {
        fontSize: 14,
        wordWrap: 'break-word',
        color: '#2D2B2B'
    },
    messagesender:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    messagereceiver:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    online:{
        color:'rgba(0, 100, 0, 0.7)'
    }
});

class Message extends Component {

    componentDidMount = () =>{
        
    }
    render() {
        const { classes } = this.props;
        const { name, text, isMe, date } = this.props;
        return (
            <div className={isMe ? classes.messagesender : classes.messagereceiver}>
                <div className={classes.messageWrapper}>
                    <Zoom
                        in={true}
                        style={{
                            transition: "500ms"
                        }}
                    >
                        <div className={isMe ? classes.sender : classes.receiver}>
                            <div className={classes.name}>{date && date.substring(0,10) +" in "+ date.substring(11,19)} </div>
                            <div className={isMe ? classes.textWrapperSender : classes.textWrapperReceiver}>
                                <div className={classes.text}>{text}</div>
                            </div>
                            <div className={classes.name}>{name} {
                                this.props.onlineUsers.map(user =>{
                                    return(
                                        <span className={classes.online} key={user.user}>{user.user===name ? 'online': ''}</span>
                                    )
                                })
                            } </div>
                        </div>
                    </Zoom>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)( Message);
