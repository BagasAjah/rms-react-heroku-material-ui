import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeLocationDetailDialog from "../../employee/EmployeeLocationDetailDialog"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeToggleValue } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    enableToggle : state.enableToggle,
    lookUpData : state.lookUpData,
    openValidationMessage: state.openValidationMessage,
    newEmployee: state.newEmployee,
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

const employeeLocationDetailDialog = connect(mapStateToProps, mapDispatchToProps)(EmployeeLocationDetailDialog);
export default withRouter(employeeLocationDetailDialog)