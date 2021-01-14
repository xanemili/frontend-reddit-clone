export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUpUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const removeUser = () => {
    return ({
        type: REMOVE_USER
    })
}
