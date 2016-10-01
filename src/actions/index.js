import alt from '../alt';
import Firebase from 'firebase';

class Actions {
    constructor() {
        this.generateActions(
            'channelsReceived',
            'channelsFailed',
            'messagesReceived',
            'messagesFailed',
            'messagesLoading',
            'sendMessage',
            'messageSendSuccess',
            'messageSendError',
            'messageReceived'
        );
    }

    login(router) {
        return (dispatch) => {
            var firebaseRef = new Firebase('https://react-stack-89fd0.firebaseio.com');
            firebaseRef.authWithOAuthPopup("google", (error, user) => {
                if (error) {
                    return;
                }

                dispatch(user);

                router.transitionTo('/chat');
            });
        }
    }
}

export default alt.createActions(Actions);