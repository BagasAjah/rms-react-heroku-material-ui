import { setDefaultEmployee } from "./lib/employee/employeeHelper"

const initialState = {
    "employees" : [],
    "currentTabLocation": '',
    "editedEmployee": null,
    "fetchingEmployee": false,
    "lookUpData": {
        "gender": [],
        "statusMarital": [],
        "status":[],
        "grade": [],
        "division": [],
        "familyType": [],
        "location": []
    },
    "newEmployee": setDefaultEmployee(),
    "openDialog": {
        "filteringDialog": false,
        "gradeDialog": false,
        "historyDialog": false,
        "locationDialog": false,
        "newEmployeeDialog": false,
        "sortingDialog": false,
    },
    "openValidationMessage": {
        "detailValidation": false,
        "historyValidation": false,
        "gradeValidation": false,
        "familyValidation": false,
        "locationValidation": false,
    },
    "enableToggle" : {
        "enableHistoryToggle": true,
        "enableGradeToggle": true,
        "enableLocationToggle": true,
    },
    "pageDetail": {
        "searchText": "",
        "totalEmployees": 1,
        "currentPage": 1,
        "sortCriteria": [],
        "pageSize": 7,
        "filteringProps": {
            "byGender": [],
            "byGrade" : [],
        },
        "filteringCriteria": [],
    },
    "selectedJobDescIndex": null,
    "selectedIndex": null,
    "viewMode": true
}
export default initialState