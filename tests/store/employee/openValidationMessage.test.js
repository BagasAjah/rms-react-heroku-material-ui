import C from '../../../src/constants';
import reducer from '../../../src/store/employee/openValidationMessage'

describe('openValidationMessage reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({})
    })

    it('should handle change state process', () => {
        const state = {
            "gradeValidation": false,
            "locationValidation": false
        }
        const expectedState = {
            "gradeValidation": true,
            "locationValidation": false
        }
        const action = {
            type : C.CHANGE_VALIDATION,
            fieldName: "gradeValidation",
            value : true
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedState)
    })
})