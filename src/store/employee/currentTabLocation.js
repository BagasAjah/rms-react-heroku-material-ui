import C from '../../constants';

const currentTabLocation=(state={}, action) => {
    switch (action.type) {
        case C.CHANGE_PATH_VALUE:
            return action.value;
        default:
            return state;
    }
}

export default currentTabLocation;