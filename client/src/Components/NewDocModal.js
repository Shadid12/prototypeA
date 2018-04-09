import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import GoogleDrive from './services/google_drive';

export default class UsernameModal extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            name: ''
        }
        
    }
    
    render() {
        const actions = [
            <FlatButton
              label="Submit"
              secondary={true}
              onClick={ this.create }
              disabled={!this.state.name}
            />,
            <FlatButton
              label="Cancel"
              secondary={true}
              onClick={ this.closeModal }
            />,
        ];

        return(
            <Dialog
                title="Create a new document now"
                actions={actions}
                modal={false}
                open={!this.props.name}
                onRequestClose={this.handleClose}
            >
            
                <TextField
                    hintText="name"
                    value={this.state.name}
                    onChange={this.nameChange}
                />

            </Dialog>
        )
    }

    create = (e) => {
        this.props.create(this.state.name);
    }

    closeModal = () => {
        this.props.closeModal()
    }

    nameChange = (e) => {
        this.setState({name: e.target.value});
    }
}