import C from '../../constants';

const newEmployee=(state={}, action) => {
    switch (action.type) {
        case C.CHANGE_NEW_EMPLOYEE:
            return action.employeeData;
        default:
            return state;
    }
}

export default newEmployee;