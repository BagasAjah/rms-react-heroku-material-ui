import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeGradeDialog from "../../employee/EmployeeGradeDialog"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeToggleValue } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    enableToggle : state.enableToggle,
    currentEmployee: props.currentEmployee,
    lookUpData : state.lookUpData,
    newEmployee: state.newEmployee,
    openValidationMessage: state.openValidationMessage,
    pageMode: props.pageMode
})

const mapDispatchToProps = (dispatch) => ({
	setSavedEmployee(employeesData, pageMode){
        if (pageMode === 'EDIT'){
            dispatch(
                changeEditEmployees(employeesData)
            )
        } else {
            dispatch(
                changeNewEmployee(employeesData)
            )
        }
	},
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    },
    handleToggleChanged(fieldName, value){
        dispatch(
            changeToggleValue(fieldName, value)
        )
    }
})

const employeeGradeDialog = connect(mapStateToProps, mapDispatchToProps)(EmployeeGradeDialog);
export default withRouter(employeeGradeDialog)