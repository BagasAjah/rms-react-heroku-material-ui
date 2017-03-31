import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeLocationDetail from "../../employee/EmployeeLocationDetail"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    key: props.key,
    index: props.locationIndex,
    currentEmployee: props.currentEmployee,
    location: props.locationList,
    lookUpData : state.lookUpData,
    selectedIndex: state.selectedIndex,
    pageMode: props.pageMode,
    viewMode: state.viewMode
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
    }
})

const employeeLocationDetail = connect(mapStateToProps, mapDispatchToProps)(EmployeeLocationDetail);
export default withRouter(employeeLocationDetail)