import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import setAuthToken from '../../components/utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

// Creat custom hook to use auth context
export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext);
    return [state, dispatch];
};

var route1 = '';
var route2 = '';
if(process.env.NODE_ENV === 'production') {
    route1 = '/api/auth';
    route2 = '/api/employer'
} else {
    route1 = 'http://localhost:7000/api/auth';
    route2 = 'http://localhost:7000/api/employer';
}

//Load User
export const loadUser = async(dispatch) => {
    //Load token into global headers. Private Route.
    setAuthToken(localStorage.token);

    try {
        const res = await axios.get(route1);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

//Register User
export const registerUser = async(dispatch, formData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(route2, formData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        loadUser(dispatch);

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        });
    }
};


//Login User
export const loginUser = async(dispatch, formData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(route1, formData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        loadUser(dispatch);

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        })
    }
}
//Logout User
export const logout = (dispatch) => dispatch({ type: LOGOUT });

//Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Set auth token on initial startup
    setAuthToken(state.token);

    // Load user on refresh
    if(state.loading) {
        loadUser(dispatch);
    }

    //Set headers and local storage on any changes made
    useEffect(() => {
        setAuthToken(state.token);
    }, [state.token]);

    return (
        <AuthContext.Provider
            value={{ 
                state: 
                    state, 
                    dispatch 
            }}
        >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthState;