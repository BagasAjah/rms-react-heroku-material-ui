import C from '../../constants';

const viewMode = (state = true, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return true;
        case C.CHANGE_VIEW_MODE_VALUE:
            return action.value;
        default:
            return state;
    }
}

export default viewMode;