import C from '../../../src/constants';
import reducer from '../../../src/store/employee/selectedIndex'

describe('selectedIndex reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(null)
    })

    it('should return true during set employee process', () => {
        const state = 0;
        const action = {
            type : C.SET_EMPLOYEE,
            value : 1
        }
        expect(
            reducer(state, action)
        ).toEqual(null)
    })

    it('should handle change state process', () => {
        const state = 1;
        const action = {
            type : C.CHANGE_SELECTED_INDEX,
            value : 2
        }
        expect(
            reducer(state, action)
        ).toEqual(2)
    })
})