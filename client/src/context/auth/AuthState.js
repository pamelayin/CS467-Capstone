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
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER,
    CLEAR_ERRORS
} from '../types';

// Creat custom hook to use auth context
export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext);
    return [state, dispatch];
};

var AUTH_ROUTE = '';
var EMPLOYER_ROUTE = '';
if(process.env.NODE_ENV === 'production') {
    AUTH_ROUTE = '/api/auth';
    EMPLOYER_ROUTE = '/api/employer'
} else {
    AUTH_ROUTE = 'http://localhost:7000/api/auth';
    EMPLOYER_ROUTE = 'http://localhost:7000/api/employer';
}

//Load User
export const loadUser = async(dispatch) => {
    //Load token into global headers. Private Route.
    setAuthToken(localStorage.token);

    try {
        const res = await axios.get(AUTH_ROUTE);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.msg || err.response.data.errors[0].msg
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
        const res = await axios.post(EMPLOYER_ROUTE, formData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        loadUser(dispatch);

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg || err.response.data.errors[0].msg
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
        const res = await axios.post(AUTH_ROUTE, formData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        loadUser(dispatch);

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg || err.response.data.errors[0].msg
        })
    }
}
//Logout User
export const logout = (dispatch) => dispatch({ type: LOGOUT });

//update user info
export const updateUser = () => async (dispatch, formData, _id) => {

    try {
		const res = await axios.put(AUTH_ROUTE + `/${_id}`, formData);

		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: res.data,
        });

	} catch (err) {
		dispatch({
			type: UPDATE_USER_FAIL,
			payload: err.response.data.msg || err.response.data.errors[0].msg
		});
	}
};

//delete user
export const deleteUser = async (dispatch, _id) => {
    try {
		await axios.delete(AUTH_ROUTE + `/${_id}`);

		dispatch({
			type: DELETE_USER,
			payload: _id,
        });
        
        logout(dispatch);

	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

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