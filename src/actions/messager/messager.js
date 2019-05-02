import { CONNECT_TO_SOCKET, GET_NEXT_10_MESSAGES, GET_NEW_MESSAGE } from "../../constants";
import API from "../../services/api";

const connectToSocketAction = msgs => {
    return {
        type: CONNECT_TO_SOCKET,
        msgs
    };
};

const getNext10Action = msgs => {
    return {
        type: GET_NEXT_10_MESSAGES,
        msgs
    };
};

const getNewMessageAction = msg => {
    return {
        type: GET_NEW_MESSAGE,
        msg
    }
}

export const connectToSocket = msgs => {
    return dispatch => {
        return dispatch(connectToSocketAction(msgs));
    };
};

export const getNext10 = n => {
    return dispatch => {
        return API.get("pagination/" + n).then(res => {
            console.log(res)
            dispatch(getNext10Action(res.data.result))
        })
    };
};

export const getNewMessage = msg => {
    return dispatch => {
        console.log(msg)
        return dispatch(getNewMessageAction(msg))
    }
}
