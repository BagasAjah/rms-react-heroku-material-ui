import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import NewEmployeeDialog from "../../employee/NewEmployeeDialog"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { addEmployee, changeOpenDialogValue, changeOpenValidationMessage } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    enableToggle: state.enableToggle,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    pageMode: props.pageMode
})

const mapDispatchToProps = (dispatch) => ({
	addCurrentEmployee(employeesData){
	    dispatch(
            addEmployee(employeesData)
        )
	},
	handleOpenDialogChanged(type, value){
        dispatch(
            changeOpenDialogValue(type, value)
        )
    },
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    },
    handleOpenValidationMessage(type, value) {
        dispatch(
            changeOpenValidationMessage(type, value)
        )
    }
})
const newEmployeeDialog = connect(mapStateToProps, mapDispatchToProps)(NewEmployeeDialog);
export default withRouter(newEmployeeDialog)