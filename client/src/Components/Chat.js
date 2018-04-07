import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import openSocket from 'socket.io-client';
import axios from 'axios';

import Plugins from './Plugins';
import UsernameModal from './UsernameModal';

import './css/chat.css';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            token: '',
            lang: 'en',
            selectedIndex: 1,
            open: false
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


        const userNameModal = !this.state.username ? (
            <UsernameModal username={this.state.username} setUserName={this.userNameHandler}/>
        ) : null

        return(
            <div className="main--wraper">
                <AppBar
                    title="Chit-Chat"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onClick={() => {this.setState({open: true})}}
                />
                <div className="messages">
                    {this.state.messages.map(message => {
                        return (
                            <div key={message.message} className="message--list">{message.author}: {message.message}</div>
                        )
                    })}
                </div>
                <br />
                <div className="input">
                    <TextField
                        hintText="Write your message"
                        value={this.state.message}
                        onChange={this.messageChange}
                        onKeyPress={ (e) => {
                            if (e.key === 'Enter') {
                            this.send()
                            }
                        } }
                    />
                </div>
                <RaisedButton label="Send" 
                    primary={true}
                    disabled={!this.state.username || !this.state.message}
                    onClick={this.send}
                />
                {userNameModal}
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <div>
                        <GoogleLogin
                            clientId="1043178444240-fit0566r45gcbvog4tei1pour1ba436t.apps.googleusercontent.com"
                            buttonText="Enable Google Translation"
                            scope="https://www.googleapis.com/auth/cloud-translation"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogleFail}
                        />
                    </div>
                </Drawer>
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

    select = (index) => this.setState({selectedIndex: index});

    responseGoogle = (response) => {
        if (response.accessToken) {
            this.setState({token : response.accessToken, open: false});
        }
        else {
            console.log('Could not authorize');
        }
    }
    
}