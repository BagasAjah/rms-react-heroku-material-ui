import C from '../../constants';

const selectedJobDescIndex = (state = null, action) => {
    switch (action.type) {
        case C.CHANGE_SELECTED_JOBDESC_INDEX:
            return action.value;
        default:
            return state;
    }
}

export default selectedJobDescIndex;