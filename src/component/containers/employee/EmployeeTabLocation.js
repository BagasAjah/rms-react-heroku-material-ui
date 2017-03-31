import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabLocation from "../../employee/EmployeeTabLocation"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeOpenDialogValue, changeOpenValidationMessage } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    enableToggle: state.enableToggle,
    currentEmployee: props.currentEmployee,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    pageMode: props.pageMode,
    selectedIndex: state.selectedIndex,
    viewMode: props.viewMode
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
	handleOpenDialogChanged(type, value){
        dispatch(
            changeOpenDialogValue(type, value)
        )
    },
    handleOpenValidationMessage(type, value) {
        dispatch(
            changeOpenValidationMessage(type, value)
        )
    },
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    }
})

const employeeTabLocation = connect(mapStateToProps, mapDispatchToProps)(EmployeeTabLocation);
export default withRouter(employeeTabLocation)