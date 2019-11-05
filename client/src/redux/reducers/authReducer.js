import { LOGIN_USER, REGISTER_USER, SET_CURRENT_USER } from '../types';
import isEmpty from "../../utils/isEmpty";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }

        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }

        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }

        default:
            return state
    }
}