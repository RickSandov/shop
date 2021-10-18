import { types } from "../types/types";


export const uiStopToast = () => ({
    type: types.uiStopToast
})

export const uiActiveToast = (msg = 'El producto se ha agregado a la bolsa') => ({
    type: types.uiActiveToast,
    payload: msg
})

export const uiTempToast = (msg) => {

    return (dispatch) => {
        dispatch(uiActiveToast(msg));
        setTimeout(() => {
            dispatch(uiStopToast())
        }, 4000);
    }
}