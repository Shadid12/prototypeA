import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import openSocket from 'socket.io-client';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: []
        }

        this.socket = openSocket('localhost:5000');

        this.socket.on('RECEIVE_MESSAGE', (data) => {
            this.setState({messages: [...this.state.messages, data]});
        });
    }

    render() {
        return(
            <div>
                <div className="messages">
                    {this.state.messages.map(message => {
                        return (
                            <div>{message.author}: {message.message}</div>
                        )
                    })}
                </div>
                <TextField
                    hintText="username"
                    value={this.state.username}
                    onChange={this.usernameChange}
                /><br />
                <br />
                <TextField
                    hintText="Write your message"
                    value={this.state.message}
                    onChange={this.messageChange}
                /><br />
                <RaisedButton label="Send" 
                    primary={true}
                    disabled={!this.state.username || !this.state.message}
                    onClick={this.send}
                />
            </div>
        )
    }

    send = () => {
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({message: ''});
    }

    messageChange = (e) => {
        this.setState({message: e.target.value});
    }

    usernameChange = (e) => {
        this.setState({username: e.target.value});
    }
    
}