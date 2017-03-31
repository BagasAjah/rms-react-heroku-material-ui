import C from '../../../src/constants';
import reducer from '../../../src/store/employee/viewMode'

describe('viewMode reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(true)
    })

    it('should return true during set employee process', () => {
        const state = false;
        const action = {
            type : C.SET_EMPLOYEE,
            value : false
        }
        expect(
            reducer(state, action)
        ).toEqual(true)
    })

    it('should handle change state process', () => {
        const state = false;
        const action = {
            type : C.CHANGE_VIEW_MODE_VALUE,
            value : true
        }
        expect(
            reducer(state, action)
        ).toEqual(true)
    })
})