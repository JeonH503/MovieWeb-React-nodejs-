const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = 'LOGOUT';

export function loginsucess (vId,vNickname) {
    return {
        type : LOGIN_SUCCESS,
        vId : vId,
        vNickname : vNickname,
        isLogin : true
    }
}

export function logout () {
    return {
        type : LOGOUT,
        vId : null,
        vNickname : null,
        isLogin : false
    }
}

export function loginfailed () {
    return {
        type : LOGIN_FAILED,
        isLogin : false
    }
}

export default function loginReducer(state,action) {

    let newState = {};

    if(state === undefined) {
        return {
            isLogin : false
        }
    }
    
    if(action.type === LOGIN_SUCCESS){
        newState = Object.assign({}, state, {isLogin:action.isLogin,vId:action.vId,vNickname:action.vNickname})
    }

    if(action.type === LOGIN_FAILED){
        newState = Object.assign({}, state, {isLogin:action.isLogin})
    }

    if(action.type === LOGOUT){
        newState = Object.assign({}, state, {isLogin:action.isLogin,vId:action.vId,vNickname:action.vNickname})
    }

    return newState;

}