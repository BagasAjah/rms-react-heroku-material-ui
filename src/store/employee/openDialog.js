import C from '../../constants';
import update from 'react-addons-update';

const openDialog = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_OPEN_DIALOG_VALUE:
            var updatedOpenDialog = update(state, {
                [action.fieldName] : {$set: action.value}
            });
            return updatedOpenDialog;
        default:
            return state;
    }
}

export default openDialog;