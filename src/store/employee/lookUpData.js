import C from '../../constants';
import update from 'react-addons-update';

const lookUpData = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_LOOKUP_VALUE:
            var updatedLookup = state;
            updatedLookup = update(state, {
                [action.lookup[0].lookupType] : {
                    $push: action.lookup
                }
            });
            return updatedLookup;
        default:
            return state;
    }
}

export default lookUpData;