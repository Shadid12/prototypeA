import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import data from '../data.json';

export default class Plugins extends React.Component {
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
                <GoogleLogin
                    clientId={data.keys}
                    buttonText="Enable Google Translation"
                    scope="https://www.googleapis.com/auth/cloud-translation"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogleFail}
                />
            </div>
        )
    }

    responseGoogle = (response) => {
        if(response.accessToken) {
            this.props.setToken(response.accessToken);
        }
        else {
            console.log('Could not authorize');
        }
    }
}