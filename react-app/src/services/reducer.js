
export const subscriptionReducer = (state, action) => {
    switch (action.type) {
        case 'REMOVE':
            const subscriptions = state.filter(sub => sub !== action.name)
            console.log(subscriptions)
            return subscriptions;
        case 'ADD':
            const newState = [...state]
            let new_arr = newState.concat(action.subscriptions)
            return new_arr
        default:
            throw new Error();
    }
}
