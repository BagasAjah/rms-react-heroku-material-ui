import C from '../../../src/constants';
import reducer from '../../../src/store/employee/currentTabLocation'
import { setDefaultEmployee } from "../../../src/lib/employee/employeeHelper"

describe('currentTabLocation reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({})
    })

    it('should handle change state process', () => {
        const state = false;
        const action = {
            type : C.CHANGE_PATH_VALUE,
            value : true
        }
        expect(
            reducer(state, action)
        ).toEqual(true)
    })
})