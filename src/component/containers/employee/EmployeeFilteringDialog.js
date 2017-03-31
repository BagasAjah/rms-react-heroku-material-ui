import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeFilteringDialog from "../../employee/EmployeeFilteringDialog"
import { changePageDetailValue } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    pageDetail: state.pageDetail,
    lookUpData : state.lookUpData,
})

const mapDispatchToProps = (dispatch) => ({
	changePageDetailValue(fieldName, value){
	    dispatch(
	        changePageDetailValue(fieldName, value)
        )
	}
})
const employeeFilteringDialog = connect(mapStateToProps, mapDispatchToProps)(EmployeeFilteringDialog);
export default withRouter(employeeFilteringDialog)