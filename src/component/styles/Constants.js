import {indigo500, indigo400, grey50, grey600} from 'material-ui/styles/colors';

export default {
    themeIndigo500:{
        palette: {
            primary1Color: indigo500,
    		textColor: grey50
        },
		appBar: {
			height: 50,
		},
    },
    themeIndigo400:{
        palette: {
            primary1Color: indigo400
        },
        datePicker: {
            selectColor: indigo400,
        },
		tableHeaderColumn: {
            textColor: grey600,
        },
    },
    toolBarColor:{
        backgroundColor: indigo400
    },
	iconStyles: {
		paddingRight: 5,
		paddingleft: 5
	},
    mediumIcon: {
        width: 36,
        height: 36,
    },
    medium: {
        width: 50,
        height: 50,
        padding: 10,
    },
    smallIcon: {
        width: 20,
        height: 20,
    }
};