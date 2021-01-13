function userReducer(state, action) {
    let {type, user} = action;
    let userState = {...state}
    if(type === 'add_user'){
        return{ ...userState, ...user}
    }
    return state;
}

export default userReducer
