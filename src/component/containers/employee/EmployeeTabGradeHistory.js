import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabGradeHistory from "../../employee/EmployeeTabGradeHistory"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeOpenDialogValue, changeOpenValidationMessage } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    enableToggle: state.enableToggle,
    currentEmployee: props.currentEmployee,
    lookUpData : state.lookUpData,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    pageMode: props.pageMode,
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

const employeeTabGradeHistory = connect(mapStateToProps, mapDispatchToProps)(EmployeeTabGradeHistory);
export default withRouter(employeeTabGradeHistory)