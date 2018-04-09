import React from 'react';
import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file';
import axios from 'axios';

import GoogleDrive from './services/google_drive';
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
        const widget = this.props.gdrive ? (
            <div className="icon--container" onClick={ () => this.setState({open_modal: true}) }>
                <MdInsertDriveFile size={30}/>
            </div>
        ) : null

        const docModal = this.state.open_modal ? (
            <div>
                <NewDocModal 
                    closeModal={() => this.setState({ open_modal: false})} 
                    create={this.createDoc}
                />
            </div>
        ) : null

        return(
            <div>
                {widget}
                {docModal}
            </div>
        )
    }

    createDoc = () => {
        axios.post("https://www.googleapis.com/upload/drive/v3/files", 
            {
                "name": this.state.name,
                "mimeType": "application/vnd.google-apps.document"
            }
        ).then(response => {
            console.log(response.data);
            this.setState({ open_modal: false });
        })
    }
}