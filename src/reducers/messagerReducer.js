import { CONNECT_TO_SOCKET, GET_NEXT_10_MESSAGES, GET_NEW_MESSAGE } from "../constants";

const initialState = {
    msgs: []
}

export const messagerReducer = (state = initialState, action) => {
    switch(action.type){
        case CONNECT_TO_SOCKET: return {...state, msgs: action.msgs}
        case GET_NEXT_10_MESSAGES: 
            let b = action.msgs
            b.concat([...state.msgs])
            return {...state, msgs: b.concat([...state.msgs])}
        case GET_NEW_MESSAGE: 
            let a =state.msgs
            a.push(action.msg)
            console.log(state.msgs)
            console.log(action.msg)
          //  a.push(action.msg)
            console.log(a)
            return {...state, msgs: a}
        default: return {...state}
    }
}