import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabDetails from "../../employee/EmployeeTabDetails"
import { changeEditEmployees, changeNewEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    currentEmployee: props.currentEmployee,
    lookUpData : state.lookUpData,
    openValidationMessage: state.openValidationMessage,
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
	}
})

const employeeTabDetails = connect(mapStateToProps, mapDispatchToProps)(EmployeeTabDetails);
export default withRouter(employeeTabDetails)