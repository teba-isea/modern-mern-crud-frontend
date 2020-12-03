import React,{useReducer} from 'react'
import AlertContext from './AlertContext'
import alertReducer from './alertReducer'
import {
	SHOW_ALERT,
	HIDE_ALERT
} from '../../types'

const AlertState = props => {

	const initialState = {
		alert : null
	}

	const [state,dispatch] = useReducer(alertReducer,initialState)

	const showAlert = (msg,category,timeOut = 7000) =>{
		dispatch({
			type: SHOW_ALERT,
			payload: {msg,category}
		})

		setTimeout(()=>{
			dispatch({
				type: HIDE_ALERT
			})
		}, timeOut );
	}

	const hideAlert = () =>{
		dispatch({
				type: HIDE_ALERT
			})
	}


	return (
		<AlertContext.Provider
			value={{
				alert : state.alert,
				showAlert,
				hideAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	)

}

export default AlertState