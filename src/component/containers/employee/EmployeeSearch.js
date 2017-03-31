import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeSearch from "../../employee/EmployeeSearch"
import { changeOpenDialogValue, changePageDetailValue, loadEmployeeData } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    employees: state.employees,
    openDialog: state.openDialog,
    pageDetail: state.pageDetail,
})


const mapDispatchToProps = (dispatch) => ({
	handleOpenDialogChanged(type, value){
        dispatch(
            changeOpenDialogValue(type, value)
        )
    },
	changePageDetailValue(fieldName, value){
	    dispatch(
	        changePageDetailValue(fieldName, value)
        )
	},
	loadEmployees(pageDetail){
        dispatch(
            loadEmployeeData(pageDetail)
        )
	},
})

const employeeSearch = connect(mapStateToProps, mapDispatchToProps)(EmployeeSearch);
export default withRouter(employeeSearch)