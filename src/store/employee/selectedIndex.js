import C from '../../constants';

const selectedIndex = (state = null, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return null;
        case C.CHANGE_SELECTED_INDEX:
            return action.value;
        default:
            return state;
    }
}

export default selectedIndex;
