import C from '../../constants';
import { setDefaultEmployee } from "../../lib/employee/employeeHelper";

const editedEmployee=(state={}, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return action.currentEmployee;
        case C.CHANGE_EDIT_EMPLOYEE:
            return action.currentEmployee;
        case C.LOAD_AND_SET_EMLOYEE_DATA:
            return action.employees.length > 0 ? action.employees[0] : setDefaultEmployee();
        default:
            return state;
    }
}

export default editedEmployee;