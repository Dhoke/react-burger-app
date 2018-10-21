import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    }
}

export const authFailure = error => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiryTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB3JD7UGVy5cJ7Bh-kfiyW37BCBPqrOHoI'
    if (!isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB3JD7UGVy5cJ7Bh-kfiyW37BCBPqrOHoI'
    }

    return dispatch => {
        dispatch(authInit())
        axios.post(url,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(response => {

                console.log(response);

                const expiryDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expiryDate', expiryDate)
                localStorage.setItem('userId', response.data.localId)

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailure(err.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT,
        path: path,
    }
}

export const authCheckState = () => {
    return dispatch => {

        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'));
            if (expiryDate > new Date()) {
                dispatch(authSuccess(token, localStorage.getItem('userId')))
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
        }


    }
}