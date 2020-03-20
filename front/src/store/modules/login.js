// action type
const CHANGE_ISSIGNUP = 'login/CHANGE_ISSIGNUP';
const CHANGE_ERROR = 'login/CHANGE_ERROR';

const CHANGE_INPUT = 'login/CHANGE_INPUT';

const RESET_VALUE = 'login/RESET_VALUE'

// action function
export const changeIsSignup=()=>({type:CHANGE_ISSIGNUP});
export const chagneError=(message)=>({type:CHANGE_ERROR, message});

export const changeInput=(e)=>({type:CHANGE_INPUT, e});

export const resetValue=()=>({type:RESET_VALUE});

// initState
const initialState = {
    isSignUp: false,
    error: null,
    email: '',
    password: '',
    confirm_password: '',
}

// reducer
export default function login(state=initialState, action){
    switch (action.type){
        case CHANGE_ISSIGNUP:
            return {
                ...state,
                isSignUp: !state.isSignUp
            }
        case CHANGE_ERROR:
            return {
                ...state,
                error: action.message
            }
        case CHANGE_INPUT:
            return {
                ...state,
                [action.e.target.name]: action.e.target.value
            }
        case RESET_VALUE:
            return {
                ...state,
                isSignUp: false,
                error: null,
                email: '',
                password: '',
                confirm_password: '',
            }
        default:
            return state;
    }
}

