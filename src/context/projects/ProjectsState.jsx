import React,{useReducer,useContext} from 'react'

import projectsContext from './ProjectsContext'

import projectsReducer from './ProjectsReducer'

import AlertContext from '../alerts/AlertContext'

import clientApi from '../../config/clientApi'

import {NEW_PROJECT_FORM, 
		OBTAIN_PROJECTS, 
		ADD_NEW_PROJECT,
		SELECT_PROJECT,
		DELETE_PROJECT,
		CLEAN_PROJECTS
		} from '../../types'

const ProjectsState = props => {

	const initialState = {
		projectsList : [],
		newProjectForm : true,
		selectedProject: null
	}

	const {showAlert} = useContext(AlertContext)

	const [state,dispatch] = useReducer(projectsReducer, initialState)

	const ChangeNewProjectForm = () => {

		const newValue = state.newProjectForm?false:true

		dispatch({
			type : NEW_PROJECT_FORM,
			value: newValue
		})
	}

	const obtainProjects = async () =>{
		try{
			const response = await clientApi.get('/projects')	
			dispatch({
				type: OBTAIN_PROJECTS,
				payload: response.data
			})

		}catch(e){
			showAlert("houston, we have a problem. Please contact with me","dark")
		}	
	}

	const addNewProject = async project => {

		try{
			const response = await clientApi.post('/projects',project)
			console.log(response.data)
			
			dispatch({
				type: ADD_NEW_PROJECT,
				payload: project
			})
		}catch(e){
			showAlert(e.message,"danger")
		}
	}

	const setIsError =  error => {
		showAlert(error.message,"danger")
	}

	const selectProject = project => {
		dispatch({
			type: SELECT_PROJECT,
			payload: project._id
		})
	}

	const deleteProject = async project => {
		try{
			const response = await clientApi.delete(`/projects/${project._id}`)
			showAlert(response.data.msg,"success")
			dispatch({
				type: DELETE_PROJECT,
				payload: project._id
			})
		}catch(e){
			showAlert("houston, we have a problem. Please contact with me","dark")
		}
	}

	const cleanProjects = ()=>{
		dispatch({
			type: CLEAN_PROJECTS
		})
	}

	return (
		<projectsContext.Provider
		value={{
			projectsList : state.projectsList,
			newProjectForm : state.newProjectForm,
			selectedProject: state.selectedProject,
			setIsError,
			ChangeNewProjectForm,
			obtainProjects,
			addNewProject,
			selectProject,
			deleteProject,
			cleanProjects
		}}
		>
			{props.children}
		</projectsContext.Provider>
	)

}

export default ProjectsState