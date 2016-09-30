import alt from '../alt';
import Actions from '../actions';
import { decorate, bind, datasource } from 'alt/utils/decorators';

@decorate(alt)
class ChatStore {
    constructor() {
        this.state = {user: null};
    }


}

export default alt.createStore(ChatStore);