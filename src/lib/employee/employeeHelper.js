import update from 'react-addons-update';
import moment from 'moment';
import {
        changeViewModeValue, changePathValue, changeNewEmployee,
        changeSelectecIndex, changeSelectecJobDescIndex
       } from "../../component/action/EmployeeActions";

export const setDefaultEmployee=() => ({
    employeeGuid: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: null,
    nationality: '',
    maritalStatus: '',
    phone: '',
    subDivision: '',
    status: '',
    suspendDate: null,
    hireDate: null,
    grade: '',
    division: '',
    email: '',
    office: '',
    history:[{
        historyStartDate: null,
        historyEndDate: null,
        company: '',
        position: '',
        jobDescList: [{
            jebDescName: ''
        }]
    }],
    gradeHistory: [{
        ds: '',
        grade: '',
        startDate: null,
        endDate: null
    }],
    familyMember: [{
        familyName: '',
        familyGender: '',
        familyDob: null,
        familyType: '',
        isActive: false
    }],
    location: [{
        officeStartDate: null,
        officeEndDate: null,
        officeLocation: '',
        officeAddress: ''
    }]
})

export const setNewEmployee=() => ({
    employeeGuid: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: null,
    nationality: '',
    maritalStatus: '',
    phone: '',
    subDivision: '',
    status: '',
    suspendDate: null,
    hireDate: null,
    grade: '',
    division: '',
    email: '',
    office: '',
    history:[],
    gradeHistory: [],
    familyMember: [],
    location: []
})

export const handleEmployeeDetailsInfo=(type, field, value, employee) => {
    var updatedEmployee=update(employee, {
        [type]: {
            0: {
                [field]:  {$set: value}
            }
        }
    });
    return updatedEmployee;
}

export const handleStateChanged=(type, value) => {
    if (type === 'viewMode') {
        return changeViewModeValue(value);
    } else if (type === 'currentTabLocation') {
        return changePathValue(value);
    } else if (type === 'selectedIndex') {
        return changeSelectecIndex(value);
    } else if (type === 'selectedJobDescIndex') {
        return changeSelectecJobDescIndex(value);
    } else if (type === 'newEmployee') {
        return changeNewEmployee(value);
    }
}

export const isEmpty=data => {
    if (data === '' || data == null) {
        return true;
    }
    return false;
}

export const parseStringToDate=dateStr => (
    dateStr !== null ? new Date(moment(dateStr).format("YYYY-MM-DD").toString()) : null
)

export const isJobDescEmpty=jobDesc => {
    if (jobDesc && jobDesc.length > 0) {
        for (var i=0; i < jobDesc.length; i++) {
            if(!isEmpty(jobDesc[i])){
                return false;
            }
        }
    }
    return true;
}

export const handleDataBeforeSaveOrUpdate=employeeData => {
    let grade=employeeData.gradeHistory;
    for (var i=0; i < grade.length; i++) {
        if (isEmpty(grade[i].ds) && isEmpty(grade[i].grade) && isEmpty(grade[i].startDate) && isEmpty(grade[i].endDate)) {
            employeeData.gradeHistory.splice(i,1);
        }
    }

    let history=employeeData.history;
    for (var j=0; j < history.length; j++) {
        let jobdesc=history[j].jobDesc;
        let isJobdescEmpty=isJobDescEmpty(jobdesc);
        if (isEmpty(history[j].historyStartDate) && isEmpty(history[j].historyEndDate) && isEmpty(history[j].company)
            && isEmpty(history[j].position) && isJobdescEmpty) {
            employeeData.history.splice(j,1);
        }
    }

    let familyMember=employeeData.familyMember;
    for (var k=0; k < familyMember.length; k++) {
        if (isEmpty(familyMember[k].familyName) && isEmpty(familyMember[k].familyGender) && isEmpty(familyMember[k].familyDob) && isEmpty(familyMember[k].familyType)) {
            employeeData.familyMember.splice(k,1);
        }
    }

    let location=employeeData.location;
    for (var l=0; l < location.length; l++) {
        if (isEmpty(location[l].officeStartDate) && isEmpty(location[l].officeEndDate) && isEmpty(location[l].officeLocation) && isEmpty(location[l].officeAddress)) {
            employeeData.location.splice(l,1);
        }
    }

    return employeeData;
}

export const validateEmployeeDetails=employee => {
    if (isEmpty(employee.firstName) || isEmpty(employee.gender) || isEmpty(employee.dob) || isEmpty(employee.hireDate)){
        return true;
    }
    return false;
}

export const validateEmployeeHistory=history => {
    if (isEmpty(history.historyStartDate) || isEmpty(history.company) || isEmpty(history.position)){
        return true;
    }
    return false;
}

export const validateEmployeeGrade=grade => {
    if (isEmpty(grade.ds) || isEmpty(grade.grade) || isEmpty(grade.startDate)){
        return true;
    }
    return false;
}

export const validateEmployeeFamily=family => {
    if (isEmpty(family.familyName) || isEmpty(family.familyType)){
        return true;
    }
    return false;
}

export const validateEmployeeLocation=location => {
    if (isEmpty(location.officeAddress) || isEmpty(location.officeLocation) || isEmpty(location.officeStartDate)){
        return true;
    }
    return false;
}

export const showErrorMessage=(validator, fieldValue, toggle) => {
    if (validator && isEmpty(fieldValue) && toggle) {
        return "This field is required!";
    } else {
        return '';
    }
}

export const generateSearchCriteria=searchText => {
     if (isEmpty(searchText)) {
         return '';
     }
     var applyFilter=[];
     applyFilter.push({field: "name", operator: "icontains", value: searchText});
     applyFilter={filters: applyFilter};
     return encodeURI(JSON.stringify(applyFilter));
 }

 export const generateFilterCriteria=filteringProps => {
    var byGrade=filteringProps.byGrade;
    var byGender=filteringProps.byGender;
    if (isEmpty(byGrade) || byGrade.length === 0 || isEmpty(byGender) || byGender.length === 0) {
        return '';
    }
    var applyFilter=[];

    var applyGradeFilter=[];
    for (var i=0; i<byGrade.length;i++) {
        if (byGrade[i].isChecked) {
            applyGradeFilter.push({field: "grade", operator: "eq", value: byGrade[i].lookupCode});
        }
    }
    if (applyGradeFilter.length > 0) {
        applyGradeFilter={logic: "or", filters: applyGradeFilter};
        applyFilter.push(applyGradeFilter);
    }

    var applyGenderFilter=[];
    for (var j=0; j<byGender.length;j++) {
        if (byGender[j].isChecked) {
            applyGenderFilter.push({field: "gender", operator: "eq", value: byGender[j].lookupCode});
        }
    }
    if (applyGenderFilter.length > 0) {
        applyGenderFilter={logic: "or", filters: applyGenderFilter};
        applyFilter.push(applyGenderFilter);
    }

    applyFilter={filters: applyFilter};
    return encodeURI(JSON.stringify(applyFilter));
 }

export const generateSortCriteria=sortCriteria => {
    var sortStr='';
    for(var i=0; i<sortCriteria.length; i++){
        var tempSortStr='&sort=' + sortCriteria[i];
        sortStr+=tempSortStr;
    }
    if (sortStr ==='') {
        sortStr= "firstName,asc";
    }
    return sortStr;
}

export const generatePageDetailParam=pageDetail => {
    let result='';
    let pageStr='&page=';
    let searchStr='&search=';
    let filterStr='&filter=';
    let sortStr='&sort=';
    let sizeStr='&size=';
    if (pageDetail !== null) {
        pageStr+=(pageDetail.currentPage - 1);
        searchStr+=generateSearchCriteria(pageDetail.searchText);
        filterStr+=generateFilterCriteria(pageDetail.filteringProps);
        sortStr+=generateSortCriteria(pageDetail.sortCriteria);
        sizeStr+=pageDetail.pageSize;
    } else {
        sortStr+="firstName,asc";
        sizeStr+=7;
    }
    result=result + pageStr + searchStr + filterStr + sortStr + sizeStr;
    return result;
}