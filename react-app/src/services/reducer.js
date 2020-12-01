
export const subscriptionReducer = (state, action) => {
    switch (action.type) {
        case 'REMOVE':
            const subscriptions = state.filter(sub => {
                return sub !== action.name
            })
            return subscriptions;
        case 'ADD':
            const newState = [...state]
            let new_arr = newState.concat(action.subscriptions)
            return new_arr
        default:
            throw new Error();
    }
}
