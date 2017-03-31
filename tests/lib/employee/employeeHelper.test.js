import C from '../../../src/constants';
import { handleEmployeeDetailsInfo, handleStateChanged, setDefaultEmployee } from '../../../src/lib/employee/employeeHelper'

describe('test employeeHelper class', () => {

    it('should handle edit employee process', () => {
        const employee = setDefaultEmployee();
        employee.history[0].company = 'PT. Mitrais';

        expect(
            handleEmployeeDetailsInfo('history', 'company', 'PT. Mitrais', setDefaultEmployee())
        ).toEqual(employee)
    })

    it('should handle change state process', () => {
        const expectedAction = {
          type: C.CHANGE_VIEW_MODE_VALUE,
          value: true
        }
        expect(
            handleStateChanged('viewMode', true)
        ).toEqual(expectedAction)
    })
})