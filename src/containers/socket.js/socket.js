import React, { Component } from 'react';
import io from 'socket.io-client'

const url = ""

class SocketConnection extends Component {
    state = {
        socket: null
    }
componentWillMount() {
    this.initSocet()
}

    initSocet = () => {
        const socket = io(url)
        socket.on('send message', () =>
            console.log("ss")
        )
        this.setState({socket})
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default SocketConnection;
