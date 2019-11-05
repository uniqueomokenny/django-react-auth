import axios from 'axios';
import { GET_ERRORS, LOGOUT_USER, LOGIN_USER, SET_CURRENT_USER } from '../types';
import setAuthToken from "../../utils/setAuthToken";
import { message } from 'antd';


// Signup USERS
export const registerUser = (userData, history) => dispatch => {
    axios
      .post('/users/', userData)
      .then(res => {
        message.success("You have successfully sign up, please log in.")
        history.push('/login')
      })
      .catch(err => {
        message.error("Oops! Please fill in all the required fields.")
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}


export const loginUser = (user) => dispatch => {
    axios
        .post('/users/login/', user)
        .then(res => {
            const { token, username, user_id } = res.data
            const user = {
                token,
                expirationTime: new Date(new Date().getTime() + 3600 * 1000),
                userId: user_id,
                username
            }
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token)
            dispatch(setCurrentUser(user))
            message.success("Welcome back, you have successfully logged in.")
            return {
                type: LOGIN_USER,
                payload: user
            }
        })
        .catch(err => {
          message.error("Invalid credentials")
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        });
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