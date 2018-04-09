import React from 'react';
import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import NewDocModal from './NewDocModal';

import './css/widget.css';

export default class Widget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open_modal: false,
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
              onClick={ () => {this.setState({ open_modal: false })} }
            />,
        ];

        const widget = this.props.gdrive ? (
            <div className="icon--container" onClick={ () => this.setState({open_modal: true}) }>
                <MdInsertDriveFile size={30}/>
            </div>
        ) : null

        const docModal = this.state.open_modal ? (
            <div>
                <Dialog
                    title="Create a new document now"
                    actions={actions}
                    modal={false}
                    open={this.state.open_modal}
                >
            
                    <TextField
                        hintText="name"
                        value={this.state.name}
                        onChange={this.nameChange}
                    />

                </Dialog>
            </div>
        ) : null

        return(
            <div>
                {widget}
                {docModal}
            </div>
        )
    }


    nameChange = (e) => {
        this.setState({name: e.target.value});
    }

    create = () => {
        let name = this.state.name;
        axios.post("https://www.googleapis.com/drive/v3/files", 
        {
            "mimeType": "application/vnd.google-apps.document",
            "name": name
          }
        ).then(response => {
            console.log(response.data);
            this.setState({ open_modal: false });
        })
    }
}