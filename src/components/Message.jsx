import React from 'react';
import mui from 'material-ui';

var {ListItem, Avatar} = mui;

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem leftAvatar={<Avatar src="https://avatars.githubusercontent.com/u/5800854?v=3" />}>
                {this.props.message}
            </ListItem>
        );
    }
}

export default Message;