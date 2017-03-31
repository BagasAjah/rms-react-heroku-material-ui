import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeDetails from "../../../layout/EmployeeDetails"
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../action/EmployeeActions';

const mapStateToProps = (state) => ({
    fetchingEmployee: state.fetchingEmployee,
    pageDetail: state.pageDetail
})

const mapDispatchToProps = (dispatch) => (
	bindActionCreators(actionCreators, dispatch)
)

const employeeDetails = connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
export default withRouter(employeeDetails)