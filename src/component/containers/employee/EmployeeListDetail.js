import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeListDetail from "../../employee/EmployeeListDetail"
import { setEmployees } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    key: props.key,
    index: props.index,
    employee: props.employee,
    lookUpData : state.lookUpData
})

const mapDispatchToProps = (dispatch) => ({
	setCurrentEmployee(employeeID){
        dispatch(
            setEmployees(employeeID)
        )
	}
})

const employeeListDetail = connect(mapStateToProps, mapDispatchToProps)(EmployeeListDetail);
export default withRouter(employeeListDetail)