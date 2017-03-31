import C from '../../../src/constants';
import reducer from '../../../src/store/employee/employees'
import { setDefaultEmployee } from "../../../src/lib/employee/employeeHelper"

describe('employees reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual([])
    })

    it('should handle change state process', () => {
        const employee = setDefaultEmployee();
        employee.id = 1;
        const state = [employee];

        const expectedEmployee = setDefaultEmployee();
        expectedEmployee.id = 1;
        expectedEmployee.lastName = "Test";
        const expectedResult = [expectedEmployee];

        const action = {
            type : C.UPDATE_CURRENT_EMPLOYEE,
            employeeData: expectedEmployee,
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedResult)
    })
})