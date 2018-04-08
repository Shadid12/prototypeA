import React from 'react';
import IconButton from 'material-ui/IconButton';

export default class Widget extends React.Component {
    render() {
        const widget = this.props.gdrive ? (
            <div>
                <IconButton
                    iconClassName="muidocs-icon-custom-github" tooltip="bottom-right"
                    tooltipPosition="bottom-right"
                />
            </div>
        ) : (
            <div>Hello worlds</div>
        )
        return(
            <div>
                {widget}
            </div>
        )
    }
}