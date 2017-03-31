import C from '../../constants';

const fetchingEmployee=(state={}, action) => {
    switch (action.type) {
        case C.FECTHING_EMPLOYEE:
            return action.value;
        default:
            return state;
    }
}

export default fetchingEmployee;