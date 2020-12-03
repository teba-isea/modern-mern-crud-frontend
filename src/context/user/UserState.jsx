import React, { useReducer, useContext } from 'react'
import userReducer from './userReducer'
import UserContext from './UserContext'
import clientApi from '../../config/clientApi'
import setAuthToken from '../../config/setAuthToken'
import ProjectsContext from '../projects/ProjectsContext'
import TasksContext from '../tasks/TasksContext'
import AlertContext from '../alerts/AlertContext'

import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	OBTAIN_USER,
	LOG_OUT
} from '../../types'


const UserState = props => {

	const initialState = {
		token: localStorage.getItem('token'),
		authenticated: null,
		user: null,
		message: null,
		isLoading: true
	}

	const {showAlert} = useContext(AlertContext)
	const {cleanTasks} = useContext(TasksContext)
	const {cleanProjects} = useContext(ProjectsContext)

	const [state, dispatch] = useReducer(userReducer, initialState)

	const registerUser = async data => {
		try {
			const response = await clientApi.post('/users', data)

			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.data
			})
			obtainUser()
			showAlert("User registered. Welcome!","info")
		} catch (e) {
			dispatch({
				type: REGISTER_ERROR,
				payload: e.response.data.msg
			})
		}
	}

	const obtainUser = async () => {
		const token = localStorage.getItem('token')

		if (token) {
			setAuthToken(token)
		}else{
			dispatch({
				type: LOGIN_ERROR,
				payload: "token not found, please login"
			})
		}

		try{
			const response = await clientApi.get('/login')
			dispatch({
				type: OBTAIN_USER,
				payload: response.data
			})

		} catch (e) {
			dispatch({
				type: LOGIN_ERROR,
				payload: e.response.data.msg
			})
		}

	}

	const signIn = async userData => {
		try {
			const response = await clientApi.post('/login', userData)
			console.log(response.data)

			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data
			})
			await obtainUser()
			showAlert("Welcome!","info")

		} catch (e) {
			dispatch({
				type: LOGIN_ERROR,
				payload: e.response.data.msg
			})
			showAlert("houston... Please Check your connection","gray")
		}


	}

	const logout = () => {
		cleanProjects()
		cleanTasks()
		dispatch({
			type: LOG_OUT
		})
		showAlert("see you soon!","info")

	}

	return (
		<UserContext.Provider
			value={{
				token: state.token,
				authenticated: state.authenticated,
				user : state.user,
				message: state.message,
				isLoading : state.isLoading,
				registerUser,
				obtainUser,
				signIn,
				logout,
			}}
		>
		{props.children}	
		</UserContext.Provider>
	)
}

export default UserState