// action type
const CHANGE_ISSIGNUP = 'login/CHANGE_ISSIGNUP';
const CHANGE_ERROR = 'login/CHANGE_ERROR';

const CHANGE_INPUT = 'login/CHANGE_INPUT'

const CHANGE_EMAIL = 'login/CHANGE_EMAIL';
const CHANGE_PASSWORD = 'login/CHANGE_PASSWORD';
const CHANGE_CONFIRM_PASSWORD = 'login/CHANGE_CONFIRM_PASSWORD';

// action function
export const changeIsSignup=()=>({type:CHANGE_ISSIGNUP});
export const chagneError=(message)=>({type:CHANGE_ERROR, message});

export const changeInput=(e)=>({type:CHANGE_INPUT, e});

export const changeEmail=(email)=>({type:CHANGE_EMAIL, email});
export const changePassword=(password)=>({type:CHANGE_PASSWORD, password});
export const changeConfirmPassword=(confirm_password)=>({type:CHANGE_CONFIRM_PASSWORD, confirm_password});

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
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.password
            }
        case CHANGE_CONFIRM_PASSWORD:
            return {
                ...state,
                confirm_password: action.confirm_password
            }
        default:
            return state;
    }
}

