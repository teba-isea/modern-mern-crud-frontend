import React, { useReducer, useContext } from 'react'
import TasksReducer from './TasksReducer'
import TasksContext from './TasksContext'
import clientApi from '../../config/clientApi'
import AlertContext from '../alerts/AlertContext'
import {
	OBTAIN_TASKS,
	ADD_NEW_TASK,
	DELETE_TASK,
	SELECT_TASK,
	CLEAN_TASKS,
	EDIT_TASK
} from '../../types'

const TasksState = props => {
	const initialState = {
		projectTasks: [],
		selectedTask: {}
	}

	const { showAlert } = useContext(AlertContext)

	const [state, dispatch] = useReducer(TasksReducer, initialState)

	const obtainProjectTasks = async project => {
		try {
			const response = await clientApi.get(`/tasks/${project}`)
			dispatch({
				type: OBTAIN_TASKS,
				payload: response.data
			})
		} catch (e) {
			console.log(e.response)
		}


	}

	const addNewTask = async task => {
		console.log(task)
		try {
			const response = await clientApi.post('/tasks', task)
			dispatch({
				type: ADD_NEW_TASK,
				payload: task
			})
			showAlert(response.data.msg, "success")
		} catch (e) {
			showAlert("houston... Please Check your connection","gray")
		}
	}
	const deleteTask = async (taskId,project) => {
		console.log(taskId)
		console.log(project)

		try{
			await clientApi.delete(`/tasks/${taskId}`,{params: {project}})
			showAlert("task deleted successfully", "success")
			dispatch({
				type: DELETE_TASK,
				payload: taskId
			})
		}catch(e){
			showAlert("houston... Please Check your connection","gray")
		}
	}

	const changeIsComplete = task => {

		task.status ? (task.status = false) : task.status = true

		editTask(task)
	}

	const editTask = async task => {

		try{
			await clientApi.put(`/tasks/${task._id}`, task)
			dispatch({
				type: EDIT_TASK,
				payload: task
			})
			showAlert("task updated successfully","success")
		}catch(e){
			showAlert("houston... Please Check your connection","gray")
		}

		
	}

	const selectTask = task => {
		dispatch({
			type: SELECT_TASK,
			payload: task
		})
	}

	const cleanTasks = ()=>{
		dispatch({
			type: CLEAN_TASKS
		})
	}

	return (
		<TasksContext.Provider
			value={{
				tasks: state.tasks,
				projectTasks: state.projectTasks,
				selectedTask: state.selectedTask,
				obtainProjectTasks,
				changeIsComplete,
				deleteTask,
				addNewTask,
				selectTask,
				editTask,
				cleanTasks
			}}>
			{props.children}
		</TasksContext.Provider>
	)

}

export default TasksState