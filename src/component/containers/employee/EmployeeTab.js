import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTab from "../../employee/EmployeeTab"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeOpenValidationMessage, deleteCurrentEmployee, updateCurrentEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    currentEmployee: state.currentEmployee,
    currentTabLocation: state.currentTabLocation,
    editedEmployee: state.editedEmployee,
    viewMode: state.viewMode
})


const mapDispatchToProps = (dispatch) => ({
	handleStateChanged(fieldName, value){
        dispatch(
            handleStateChanged(fieldName, value)
        )
	},
	updateCurrentEmployee(employeeData){
        dispatch(
            updateCurrentEmployee(employeeData)
        )
	},
	deleteCurrentEmployee(employeeGuid){
        dispatch(
            deleteCurrentEmployee(employeeGuid)
        )
	},
    handleOpenValidationMessage(type, value) {
        dispatch(
            changeOpenValidationMessage(type, value)
        )
    },
})

const employeeTab = connect(mapStateToProps, mapDispatchToProps)(EmployeeTab);
export default withRouter(employeeTab)