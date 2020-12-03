import {
	OBTAIN_TASKS,
	ADD_NEW_TASK,
	DELETE_TASK,
	EDIT_TASK,
	SELECT_TASK,
	CLEAN_TASKS
} from '../../types'

export default (state,action) =>{
	switch(action.type){
		
		case OBTAIN_TASKS:
			return {
				...state,
				projectTasks: action.payload
			}
		case ADD_NEW_TASK:
			return {
				...state
			}
		case DELETE_TASK:
			return {
				...state,
				projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
			}
		case EDIT_TASK:
			return{
				...state,
				selectedTask: {}
			}
		case SELECT_TASK:
			return{
				...state,
				selectedTask: action.payload
			}
		case CLEAN_TASKS:
			return{
				...state,
				projectTasks: [],
				selectedTask: {}
			}
		default:
			return state
	}
}