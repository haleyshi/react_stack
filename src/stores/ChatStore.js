import alt from '../alt';
import Actions from '../actions';
import { decorate, bind, datasource } from 'alt/utils/decorators';
import ChannelSource from '../sources/ChannelSource';
import MessageSource from '../sources/MessageSource';
import _ from 'lodash';

@datasource(ChannelSource, MessageSource)
@decorate(alt)
class ChatStore {
    constructor() {
        // FIXME: Firebase2.x does not support Auth anymore, so hardcode one for test
        let user = {
            google: {
                displayName: "Shi Guohuang",
                profileImageURL: "https://avatars.githubusercontent.com/u/5800854?v=3"
            },
            uid: "sgh1982"
        };
        this.state = {
            user: user,
            messages: null,
            messagesLoading: true
        };
    }

    @bind(Actions.channelsReceived)
    receivedChannels(channels) {
        let selectedChannel;
        _(channels)
            .keys()
            .each((key, index) => {
                channels[key].key = key;
                if (index === 0) {
                    channels[key].selected = true;
                    selectedChannel = channels[key];
                }
            })
            .value();

        this.setState({
            channels,
            selectedChannel
        });

        setTimeout(this.getInstance().getMessages, 100);
    }

    @bind(Actions.messagesReceived)
    receivedMessages(messages) {
        _(messages)
            .keys()
            .each((key) => {
                messages[key].key = key;
            })
            .value();

        this.setState({
            messages,
            messagesLoading: false
        });
    }

    @bind(Actions.messageReceived)
    messageReceived(message) {
        if (this.state.messages[message.key]) {
            return;
        }

        this.state.messages[message.key] = message;

        this.setState({
            messages: this.state.messages
        });
    }

    @bind(Actions.channelOpened)
    channelOpened(selectedChannel) {
        _(this.state.channels)
            .values()
            .each((channel) => {
                channel.selected = false;
            })
            .value();

        selectedChannel.selected = true;

        this.setState({
            selectedChannel,
            channels: this.state.channels
        });

        setTimeout(this.getInstance().getMessages, 100);
    }

    @bind(Actions.messagesLoading)
    messagesLoading() {
        this.setState({
            messagesLoading: true
        });
    }

    @bind(Actions.sendMessage)
    sendMessage(message) {
        this.state.message = message;
        setTimeout(this.getInstance().sendMessage, 10);
    }

    @bind(Actions.login)
    login(user) {
        this.setState({ user: user });
    }
}

export default alt.createStore(ChatStore);