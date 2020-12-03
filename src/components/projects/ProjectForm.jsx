import React,{useContext,useState,useEffect} from 'react'
import {FormGroup, Input, Button, Row, Col} from 'reactstrap'
import ProjectContext from '../../context/projects/ProjectsContext'
import TasksContext from '../../context/tasks/TasksContext'


const ProjectForm = () => {
	const {selectedProject,setIsError} = useContext(ProjectContext)

	const {obtainProjectTasks,addNewTask,selectedTask,editTask} = useContext(TasksContext)

	const [newTask,setNewTask] = useState({
		name: ''
	})

	const isEditMode = Object.keys(selectedTask).length !== 0

	useEffect(() => {
		if (isEditMode) {
			setNewTask(selectedTask)
		}
	}, [selectedTask,isEditMode])

	const handleForm = e =>{
		setNewTask({
			...newTask,
			[e.target.name]: e.target.value
		})
	}

	const upNewTask = e => {
		e.preventDefault()
		if(newTask.name === '') return setIsError({message:' Task name is empty'})

		newTask.project = selectedProject._id
		isEditMode?editTask(newTask):addNewTask(newTask)

		obtainProjectTasks(selectedProject._id)
		setNewTask({name: ''})
	}


	if(!selectedProject) return <h2 className="text-center my-5">Select a Project</h2>
	
	return (
		<Row className="m-0 bg-dark justify-content-center p-5">
			<Col md="6">
				<form onSubmit={e => upNewTask(e)}>
					<FormGroup>
						<Input 
							type="text" 
							name="name" 
							placeholder="Task name" 
							value={newTask.name} 
							onChange={e => handleForm(e)}
						/>
					</FormGroup>

					<FormGroup>
						<Button 
							className="btn-block" 
							type="submit" 
							color="secondary"
							> {isEditMode?"Edit Task":"Create Task"}</Button>
					</FormGroup>
				</form>
			</Col>
		</Row>
	)
}

export default ProjectForm