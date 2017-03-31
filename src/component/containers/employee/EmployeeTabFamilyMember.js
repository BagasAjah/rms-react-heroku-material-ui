import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabFamilyMember from "../../employee/EmployeeTabFamilyMember"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeOpenValidationMessage } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    enableToggle: state.enableToggle,
    currentEmployee: props.currentEmployee,
    lookUpData : state.lookUpData,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    openValidationMessage: state.openValidationMessage,
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

const employeeTabFamilyMember = connect(mapStateToProps, mapDispatchToProps)(EmployeeTabFamilyMember);
export default withRouter(employeeTabFamilyMember)