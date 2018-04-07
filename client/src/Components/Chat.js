import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


import openSocket from 'socket.io-client';
import axios from 'axios';

import Plugins from './Plugins';
import UsernameModal from './UsernameModal';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            token: '',
            lang: 'en'
        }

        this.socket = openSocket('localhost:5000');

        this.socket.on('RECEIVE_MESSAGE', (data) => {
                
            if (this.state.token) {
                axios.post(`https://translation.googleapis.com/language/translate/v2`,
                        {
                            "q": data.message,
                            "target": this.state.lang
                        }
                    )
                    .then( (response) => {
                        console.log(response.data.data.translations);
                        data.message = response.data.data.translations[0].translatedText;
                        this.setState({messages: [...this.state.messages, data]});
                    });
            } else {
                this.setState({messages: [...this.state.messages, data]});
            }
        });
    }

    render() {

        const translation = this.state.token ? (
            <div>
                <DropDownMenu value={this.state.lang} onChange={this.handleLang}>
                    <MenuItem value={'en'} primaryText="English" />
                    <MenuItem value={'fr'} primaryText="French" />
                    <MenuItem value={'es'} primaryText="Spanish" />
                </DropDownMenu>
            </div>
        ) : (
            <Plugins setToken={this.setToken}/>
        )

        const userNameModal = !this.state.username ? (
            <UsernameModal username={this.state.username} setUserName={this.userNameHandler}/>
        ) : null

        return(
            <div>
                <div className="messages">
                    {this.state.messages.map(message => {
                        return (
                            <div key={message.message}>{message.author}: {message.message}</div>
                        )
                    })}
                </div>
                <br />
                <TextField
                    hintText="Write your message"
                    value={this.state.message}
                    onChange={this.messageChange}
                    onKeyPress={ (e) => {
                        if (e.key === 'Enter') {
                          this.send()
                        }
                    } }
                /><br />
                <RaisedButton label="Send" 
                    primary={true}
                    disabled={!this.state.username || !this.state.message}
                    onClick={this.send}
                />
                {translation}
                {userNameModal}
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

    userNameHandler = (e) => {
        this.setState({username: e})
    }

    messageChange = (e) => {
        this.setState({message: e.target.value});
    }

    setToken = (e) => {
        this.setState({token : e});
        axios.defaults.headers.common['Authorization'] = "Bearer " + e;
    }

    handleLang = (event, index, value) => this.setState({lang: value});
    
}