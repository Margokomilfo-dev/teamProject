import {PassRecType, API} from '../api/api'
import {Dispatch} from 'redux'

enum ACTION_TYPE {
	SET_OK = 'forgotReducer/SET_OK'
}

const initialState = {
	answer: false,
	html: false,
	info: '',
	success: true
}

type InitialStateType = typeof initialState

export const forgotReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
	switch (action.type) {
		case ACTION_TYPE.SET_OK:
			return {...state, info: action.info, answer: true, html: true}
		default:
			return state
	}
}

export const setOkPassRecAC = (info: string) => ({type: ACTION_TYPE.SET_OK, info} as const)

export const passRecTC = (data: PassRecType) => (dispatch: Dispatch<ActionType>) => {
	API.passRec(data.email, data.from, data.message).then(res => {
		dispatch(setOkPassRecAC(res.info))
	})
}

type ActionType = ReturnType<typeof setOkPassRecAC>
