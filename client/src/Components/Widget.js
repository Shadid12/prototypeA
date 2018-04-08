import React from 'react';
import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file';
import './css/widget.css';

export default class Widget extends React.Component {
    render() {
        const widget = this.props.gdrive ? (
            <div className="icon--container">
                <MdInsertDriveFile size={30}/>
            </div>
        ) : null
        return(
            <div>
                {widget}
            </div>
        )
    }
}