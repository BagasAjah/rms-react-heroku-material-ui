import C from '../../../src/constants';
import reducer from '../../../src/store/employee/selectedJobDescIndex'

describe('selectedJobDescIndex reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(null)
    })

    it('should handle change state process', () => {
        const state = 1;
        const action = {
            type : C.CHANGE_SELECTED_JOBDESC_INDEX,
            value : 2
        }
        expect(
            reducer(state, action)
        ).toEqual(2)
    })
})