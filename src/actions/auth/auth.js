import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    RESET_PASSWORD,
    CONFIRM_PASSWORD
} from "../../constants";
import API from "../../services/api";

const authSuccessAction = payload => {
    return {
        type: LOGIN_SUCCESS,
        isAuth: true,
        payload,
        err: ""
    };
};

const authFailedAction = err => {
    return {
        type: LOGIN_FAILED,
        isAuth: false,
        err
    };
};

const registerSuccessAction = payload => {
    return {
        type: REGISTER_SUCCESS,
        isAuth: false,
        payload,
        err: ""
    };
};

const registerFailedAction = err => {
    return {
        type: REGISTER_FAILED,
        isAuth: false,
        err
    };
};

const logoutAction = () => {
    return {
        type: LOGOUT,
        isAuth: false,
        err: ""
    };
};

const resetPasswordAction = () => {
    return {
        type: RESET_PASSWORD,
        isAuth: false,
        err: ""
    };
};

const confirmPasswordAction = err => {
    return {
        type: CONFIRM_PASSWORD,
        isAuth: false,
        err
    };
};

export const login = (name, password, email) => {
    return dispatch => {
        return API.post("login", { name, password, email })
            .then(res => {
                dispatch(authSuccessAction({ name, password, email }));
            })
            .catch(err => {
                dispatch(authFailedAction("Wrong name or password"));
                throw new Error(err.message);
            });
    };
};

export const register = (name, password, email) => {
    return dispatch => {
        return API.post("signUp", { name, password, email })
            .then(res => {
                dispatch(registerSuccessAction({ name, password, email }));
            })
            .catch(e => {
                dispatch(registerFailedAction("Invalid values. Try again"));
                throw new Error(e);
            });
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        return dispatch(logoutAction());
    };
};

export const resetPassword = (name, newPassword) => {
    return dispatch => {
        return API.post("resetPassword", { name, newPassword })
            .then(res => {
                dispatch(resetPasswordAction());
            })
            .catch(e => {
                dispatch(registerFailedAction("Invalid values. Try again"));
                throw new Error(e);
            });
    };
};

export const confirmPassword = (name, password, email, code) => {
    return dispatch => {
        return API.post("confirm", { code, name, password, email })
            .then(res => {
                console.log(res);
                return dispatch(registerSuccessAction({}));
            })
            .catch(e => {
                dispatch(registerFailedAction("Invalid values. Try again"));
                throw new Error(e);
            });
    };
};

export const authorizated = () => {
    return dispatch => {
        API.post("user").then(
            res => {
                console.log(res);
                return dispatch(authSuccessAction(res.data.authData.user[0]));
            },
            rej => {
                localStorage.clear();
                //  return dispatch(authFailedAction(rej.message));
            }
        );
    };
};
