import C from '../../constants';
import update from 'react-addons-update';

const openValidationMessage = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_VALIDATION:
            var nextState = update(state, {
                [action.fieldName] : {$set: action.value}
            });
            return nextState;
        default:
            return state;
    }
}

export default openValidationMessage;