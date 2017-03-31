import C from '../../../src/constants';
import reducer from '../../../src/store/employee/openDialog'

describe('openDialog reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({})
    })

    it('should handle change state process', () => {
        const state = {
            "gradeDialog": false,
            "historyDialog": false,
            "locationDialog": false,
            "newEmployeeDialog": false
        }
        const expectedState = {
            "gradeDialog": false,
            "historyDialog": true,
            "locationDialog": false,
            "newEmployeeDialog": false
        }
        const action = {
            type : C.CHANGE_OPEN_DIALOG_VALUE,
            fieldName: "historyDialog",
            value : true
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedState)
    })
})