import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class UsernameModal extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            username: ''
        }

    }
    
    render() {
        const actions = [
            <FlatButton
              label="Submit"
              secondary={true}
              onClick={ () => { this.props.setUserName(this.state.username) } }
              disabled={!this.state.username}
            />,
        ];

        return(
            <Dialog
                title="Pick a user Nick Name"
                actions={actions}
                modal={false}
                open={!this.props.username}
                onRequestClose={this.handleClose}
            >
            
                <TextField
                    hintText="username"
                    value={this.state.username}
                    onChange={this.usernameChange}
                />

            </Dialog>
        )
    }

    usernameChange = (e) => {
        this.setState({username: e.target.value});
    }
}