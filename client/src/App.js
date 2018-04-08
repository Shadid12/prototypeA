import React from 'react';
import openSocket from 'socket.io-client';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

import Chat from './Components/Chat';


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

        return(
            <div>
                <MuiThemeProvider>
                    <Chat />
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

