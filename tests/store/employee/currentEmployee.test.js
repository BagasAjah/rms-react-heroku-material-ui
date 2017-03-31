import C from '../../../src/constants';
import reducer from '../../../src/store/employee/currentEmployee'
import { setDefaultEmployee } from "../../../src/lib/employee/employeeHelper"

describe('currentEmployee reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({})
    })

    it('should handle set employee process', () => {
        const state = setDefaultEmployee();
        const expectedResult = setDefaultEmployee();
        expectedResult.firstName = "testName";

        const action = {
            type : C.SET_EMPLOYEE,
            currentEmployee: expectedResult,
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedResult)
    })

    it('should handle edit employee process', () => {
        const state = setDefaultEmployee();
        const expectedResult = setDefaultEmployee();

        const action = {
            type : C.UPDATE_CURRENT_EMPLOYEE,
            employeeData: expectedResult
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedResult)
    })
})