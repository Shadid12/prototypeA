import React from 'react';
import openSocket from 'socket.io-client';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

import Chat from './Components/Chat';

import data from './data.json';

import './app.css';



export default class App extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = {
            toke: ''
        }
    }

    render() {

        const activeState = this.state.token ? (
            <div>
                Chat State
            </div>
        ) : (
            <div>
                <GoogleLogin
                    clientId={data.key}
                    buttonText="Authorize"
                    scope="https://www.googleapis.com/auth/cloud-translation"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogleFail}
                />
            </div>
        )
        return(
            <div>
                <MuiThemeProvider>
                    <Chat socket={this.socket}/>
                </MuiThemeProvider>
            </div>
        )
    }

    /**
    * Gets response from google and sets the auth token
    * 
    */
    responseGoogle = (response) => {
        if(response.accessToken) {
            this.setState({token : response.accessToken});
            axios.defaults.headers.common['Authorization'] = "Bearer " + response.accessToken;
            // TODO
            // save and retrive from local storage
        }
        else {
            console.log('Could not authorize');
        }
    }

    /**
     * on Google Login Failure
     */
    responseGoogleFail = () => {
        console.log('Error happend during login');
    }

}

