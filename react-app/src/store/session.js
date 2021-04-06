const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

export const login = (user) => async (dispatch) => {
    const { credentials, password } = user;
    const res = await fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credentials,
            password,
        })
    })
    dispatch(setUser(res.data.user));
    return res;
}

export const restoreUser = () => async (dispatch) => {
    const res = await fetch('/api/session');
    dispatch(setUser(res.data.user));
    return res;
}

export const signup = (user) => async (dispatch) => {
    const { userName, firstName, password, email} = user;
    const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            userName,
            firstName,
            email,
            password
        })
    })
    dispatch(setUser(res.data.user));
    return res;
}

