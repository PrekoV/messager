import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    RESET_PASSWORD,
    FORGOT_PASSWORD
} from "../../constants";
import API from "../../services/api";

const authSuccessAction = payload => {
    return {
        type: LOGIN_SUCCESS,
        isAuth: true,
        payload
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
        payload
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
        isAuth: false
    };
};

const resetPasswordAction = () => {
    return {
        type: RESET_PASSWORD,
        isAuth: false
    };
};

const forgotPasswordAction = (email, err) => {
    return {
        type: FORGOT_PASSWORD,
        isAuth: false,
        email,
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

export const resetPassword = (token, newPassword) => {
    return dispatch => {
        return API.post(
            "resetPasswordConfirm",
            { newPassword },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => {
                dispatch(resetPasswordAction());
            })
            .catch(e => {
                dispatch(registerFailedAction("Invalid values. Try again"));
                throw new Error(e);
            });
    };
};

export const forgotPassword = email => {
    return dispatch => {
        return API.post("resetPassword", { email })
            .then(res => {
                dispatch(forgotPasswordAction(email, ""));
            })
            .catch(e => {
                dispatch(forgotPasswordAction(null, ""));
                throw new Error(e);
            });
    };
};

export const confirmPassword = (code) => {
    return dispatch => {
        return API.post("confirm", { code })
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
        return API.post("user")
            .then(res => {
                console.log(res);
                dispatch(authSuccessAction(res.data.authData.user));
            })
            .catch(e => {
                localStorage.clear()
                console.log(e)
            });
    };
};
