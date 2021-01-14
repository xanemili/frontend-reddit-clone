import {createStore, combineReducers, compose } from 'redux'
import users from './reducers/users'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Use the combine reducers to manage all of our slices of state
const reducer = combineReducers({
    users,

})


const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers()

    )
}

export default configureStore
