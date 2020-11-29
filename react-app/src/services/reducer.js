
export const subscriptionReducer = (state, action) => {
    switch (action.type) {
        case 'REMOVE':
            const subscriptions = state.filter(sub => sub !== action.name)
            console.log(subscriptions)
            return subscriptions;
        case 'ADD':
            const newState = [...state]
<<<<<<< HEAD
            let new_arr = newState.concat(action.subscriptions)
            return new_arr
=======
            newState.concat(action.subscriptions)
            console.log(newState, action.subscriptions)
            return newState.concat(action.subscriptions)
>>>>>>> subscriptions redcuer put in place
        default:
            throw new Error();
    }
}
