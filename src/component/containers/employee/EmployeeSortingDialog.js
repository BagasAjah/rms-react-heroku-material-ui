import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeSortingDialog from "../../employee/EmployeeSortingDialog"
import { changePageDetailValue } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    pageDetail: state.pageDetail,
})

const mapDispatchToProps = (dispatch) => ({
	changePageDetailValue(fieldName, value){
	    dispatch(
	        changePageDetailValue(fieldName, value)
        )
	}
})
const employeeSortingDialog = connect(mapStateToProps, mapDispatchToProps)(EmployeeSortingDialog);
export default withRouter(employeeSortingDialog)