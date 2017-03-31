import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeList from "../../employee/EmployeeList"
import { changePageDetailValue, loadEmployeeData } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    employees: state.employees,
    pageDetail: state.pageDetail
})
const mapDispatchToProps = (dispatch) => ({
	loadEmployeeData(pageDetail){
        dispatch(loadEmployeeData(pageDetail))
	},
	changePageDetailValue(fieldName, value){
	    dispatch(changePageDetailValue(fieldName, value))
	}
})
const employeeList = connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
export default withRouter(employeeList)