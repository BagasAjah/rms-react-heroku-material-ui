import C from '../../constants';
import update from 'react-addons-update';

const employees=(state=[], action) => {
    switch (action.type) {
        case C.UPDATE_CURRENT_EMPLOYEE:
            const index=state.findIndex(s => s.id === action.employeeData.id);
            const updatedState=update(state, {
                [index] : {$set: action.employeeData}
            });
            return updatedState;
        case C.LOAD_EMLOYEE_DATA:
        case C.LOAD_AND_SET_EMLOYEE_DATA:
            return action.employees;
        default:
            return state;
    }
}

export default employees;