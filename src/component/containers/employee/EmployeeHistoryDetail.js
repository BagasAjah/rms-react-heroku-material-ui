import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeHistoryDetail from "../../employee/EmployeeHistoryDetail"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeNewEmployee, changeEditEmployees} from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    key: props.key,
    index: props.index,
    history: props.history,
    currentEmployee: props.currentEmployee,
    pageMode: props.pageMode,
    selectedIndex: state.selectedIndex,
    selectedJobDescIndex: state.selectedJobDescIndex,
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

const employeeHistoryDetail = connect(mapStateToProps, mapDispatchToProps)(EmployeeHistoryDetail);
export default withRouter(employeeHistoryDetail)