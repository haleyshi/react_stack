import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';

var {Card, List} = mui;


class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // message: []
            messages: {}
        };

        this.firebaseRef = new Firebase('https://react-stack-89fd0.firebaseio.com/messages');
        // this.firebaseRef.once("value", ...)// receive this data only once but not again on changes
        // this.firebaseRef.on("value", ...)// Get full data in all changes
        //this.firebaseRef.on("value", (dataSnapshot)=> { 
        //    var messagesVal = dataSnapshot.val();
        //    var messages = _(messagesVal)
        //        .keys()
        //        .map((messageKey) => {
        //            var cloned = _.clone(messagesVal[messageKey]);
        //            cloned.key = messageKey;
        //            return cloned;
        //        })
        //        .value();
        //
        //    this.setState({
        //        messages: messages  // For Array
        //    });
        //}); 

        // "value", "child_added", "child_removed", "child_changed"

        this.firebaseRef.on("child_added", (msg)=> { // intersted in delta
            if (this.state.messages[msg.key()]) {
                return;
            }

            let msgVal = msg.val();
            msgVal.key = msg.key();           
            this.state.messages[msgVal.key] = msgVal;
            this.setState({
                messages: this.state.messages
            });
        }); 

        this.firebaseRef.on("child_removed", (msg)=> { // intersted in delta 
            var key = msg.key();           
            delete this.state.messages[key];
            this.setState({
                messages: this.state.messages
            });
        }); 
    }

    render() {
        // var messageNodes = this.state.messages.map((message) => {  // for Array
        var messageNodes = _.values(this.state.messages).map((message) => {
            return (
                <Message message={message.message} />
            );
        });

        return (
            <Card style={{
                flexGrow: 2,
                marginLeft: 30
            }}>
                <List>{messageNodes}</List>
            </Card>
        );
    }
}

export default MessageList;