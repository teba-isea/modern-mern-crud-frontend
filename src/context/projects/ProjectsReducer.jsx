import {
	NEW_PROJECT_FORM, 
	OBTAIN_PROJECTS, 
	ADD_NEW_PROJECT,
	DELETE_PROJECT, 
	IS_ERROR, 
	SELECT_PROJECT,
	CLEAN_PROJECTS
} from '../../types'

export default (state,action) => {
	
	switch(action.type){

		case NEW_PROJECT_FORM:
			return {
				...state,
				newProjectForm: action.value
			}
		case OBTAIN_PROJECTS:
			console.log(action.payload)
			return {
				...state,
				projectsList: action.payload
			}
		case ADD_NEW_PROJECT:
			return{
				...state,
				newProjectForm: true
			}	
		case IS_ERROR:
			return{
				...state,
				isError: action.payload
			}	
		case SELECT_PROJECT:
			return{
				...state,
				selectedProject: state.projectsList.filter(project => project._id === action.payload)[0]
			}
		case DELETE_PROJECT:
			return{
				...state,
				projectsList: state.projectsList.filter(project => project._id !== action.payload),
				selectedProject: null
			}	
		case CLEAN_PROJECTS:
			return{
				...state,
				projectsList : [],
				newProjectForm : true,
				selectedProject: null
			}
		default:
			return state
	}
}