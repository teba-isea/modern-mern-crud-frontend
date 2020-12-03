import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	OBTAIN_USER,
	LOG_OUT
} from '../../types'

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload)
			return {
				...state,
				message: null
			}

		case REGISTER_ERROR:
			return {
				...state,
				token: null,
				message: action.payload,
				isLoading: false
			}

		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload)
			return {
				...state,
				message: null,
				token: action.payload,
				isLoading: false
			}

		case LOGIN_ERROR:
			localStorage.removeItem('token')
			return {
				...state,
				token:null,
				authenticated:false,
				message: action.payload,
				isLoading: false
			}

		case OBTAIN_USER:
			return{
				...state,
				user: action.payload,
				authenticated:true,
				isLoading: false
			}	

		case LOG_OUT:
			localStorage.removeItem('token')
			return{
				...state,
				token:null,
				authenticated:false,
				user:null,
			}
		default:
			return state
	}
}