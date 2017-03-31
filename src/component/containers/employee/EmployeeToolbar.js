import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeToolbar from "../../employee/EmployeeToolbar"

const mapStateToProps = (state) => ({
    fetchingEmployee: state.fetchingEmployee
})

const employeeToolbar = connect(mapStateToProps)(EmployeeToolbar);
export default withRouter(employeeToolbar)