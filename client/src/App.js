import React from 'react';
import openSocket from 'socket.io-client';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';


import data from './data.json';

const socket = openSocket('localhost:5000');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = {
            toke: ''
        }

        socket.on('connection', () => {
            console.log('Mounted the Socket');
        });
    }

    render() {
        return(
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

