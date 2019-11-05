import axios from 'axios';
import { GET_ERRORS, LOGOUT_USER, LOGIN_USER, SET_CURRENT_USER } from '../types';
import setAuthToken from "../../utils/setAuthToken";


// Signup USERS
export const registerUser = (userData, history) => dispatch => {
    return axios
        .post('/users/', userData)
}


export const loginUser = (user) => dispatch => {
    axios
        .post('/users/login/', user)
        .then(res => {
            const { token, username, user_id } = res.data
            console.log(res.data)
            const user = {
                token,
                expirationTime: new Date(new Date().getTime() + 3600 * 1000),
                userId: user_id,
                username
            }
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token)
            dispatch(setCurrentUser(user))
            return {
                type: LOGIN_USER,
                payload: user
            }
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}


export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}


export const logoutUser = () => dispatch => {
  //  remove user token
  localStorage.removeItem("user");
  // remove auth header
    setAuthToken(false);
  //  setCurrentUser to {}
    dispatch(setCurrentUser({}));
  return {
    type: LOGOUT_USER
  };
};