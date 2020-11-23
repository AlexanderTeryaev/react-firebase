import { createStore, combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'

const initialState = {}

const reducer = combineReducers({
  toastr: toastrReducer
})

const store = createStore(reducer, initialState)

export default store
