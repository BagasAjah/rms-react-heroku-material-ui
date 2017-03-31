import C from '../../constants';
import update from 'react-addons-update';

const pageDetail = (state = true, action) => {
    switch (action.type) {
        case C.CHANGE_PAGE_DETAIL_VALUE:
            var nextState = update(state, {
                [action.typeState] : {$set: action.value}
            });
            return nextState;
        default:
            return state;
    }
}

export default pageDetail;