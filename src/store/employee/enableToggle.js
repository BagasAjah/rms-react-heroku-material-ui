import C from '../../constants';
import update from 'react-addons-update';

const enableToggle=(state={}, action) => {
    switch (action.type) {
        case C.CHANGE_TOGGLE_VALUE:
            var nextState=update(state, {
                [action.fieldName] : {$set: action.value}
            });
            return nextState;
        default:
            return state;
    }
}

export default enableToggle;