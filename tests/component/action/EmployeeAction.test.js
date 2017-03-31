import C from '../../../src/constants'
import * as actions from '../../../src/component/action/EmployeeActions'
import { setDefaultEmployee } from "../../../src/lib/employee/employeeHelper"

/*describe('actions', () => {
  it('should create an action to change several employee value', () => {
    const currentEmployee = setDefaultEmployee()
    const expectedAction = {
      type: C.SET_EMPLOYEE,
      currentEmployee
    }
    expect(actions.setEmployees(setDefaultEmployee())).toEqual(expectedAction)
  })
})*/

describe('actions', () => {
  it('should create an action to change edit employee value', () => {
    const currentEmployee = setDefaultEmployee()
    const expectedAction = {
      type: C.CHANGE_EDIT_EMPLOYEE,
      currentEmployee
    }
    expect(actions.changeEditEmployees(setDefaultEmployee())).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to change new employee value', () => {
    const employeeData = setDefaultEmployee()
    const expectedAction = {
      type: C.CHANGE_NEW_EMPLOYEE,
      employeeData
    }
    expect(actions.changeNewEmployee(setDefaultEmployee())).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to change viewmode value', () => {
    const expectedAction = {
      type: C.CHANGE_VIEW_MODE_VALUE,
      value: true
    }
    expect(actions.changeViewModeValue(true)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to change openDialog value', () => {
    const expectedAction = {
      type: C.CHANGE_OPEN_DIALOG_VALUE,
      fieldName: 'gradeDialog',
      value: true
    }
    expect(actions.changeOpenDialogValue('gradeDialog', true)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to change path value', () => {
    const text = '/family'
    const expectedAction = {
      type: C.CHANGE_PATH_VALUE,
      value: text
    }
    expect(actions.changePathValue(text)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to change selected index value', () => {
    const index = 2
    const expectedAction = {
      type: C.CHANGE_SELECTED_INDEX,
      value: index
    }
    expect(actions.changeSelectecIndex(index)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to change selected jobdesc index value', () => {
    const index = 5
    const expectedAction = {
      type: C.CHANGE_SELECTED_JOBDESC_INDEX,
      value: index
    }
    expect(actions.changeSelectecJobDescIndex(index)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to change validator value', () => {
    const expectedAction = {
      type: C.CHANGE_VALIDATION,
      fieldName: 'locationValidation',
      value: false
    }
    expect(actions.changeOpenValidationMessage('locationValidation', false)).toEqual(expectedAction)
  })
})
/*
describe('actions', () => {
  it('should create an action to update current employee value', () => {
    const employeeData = setDefaultEmployee()
    const expectedAction = {
      type: C.UPDATE_CURRENT_EMPLOYEE,
      employeeData
    }
    expect(actions.updateCurrentEmployee(setDefaultEmployee())).toEqual(expectedAction)
  })
})*/