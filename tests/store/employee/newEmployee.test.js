import C from '../../../src/constants';
import reducer from '../../../src/store/employee/newEmployee'
import { setDefaultEmployee } from "../../../src/lib/employee/employeeHelper"

describe('newEmployee reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({})
    })

    it('should handle change state process', () => {
        const state = setDefaultEmployee();
        const expectedState = setDefaultEmployee();
        expectedState.lastName = "Test"
        const action = {
            type : C.CHANGE_NEW_EMPLOYEE,
            employeeData: expectedState,
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedState)
    })
})