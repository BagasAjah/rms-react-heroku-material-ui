import appReducer from './employeeReducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default (initialState={}) => {
	return applyMiddleware(thunk)(createStore)(appReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}