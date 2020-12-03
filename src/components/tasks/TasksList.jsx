import React,{Fragment,useContext} from 'react'
import {ListGroup,Button} from 'reactstrap'
import TaskItem from './TaskItem'
import ProjectContext from '../../context/projects/ProjectsContext'
import TasksContext from '../../context/tasks/TasksContext'
import {TransitionGroup,CSSTransition} from 'react-transition-group'



const TasksList = () => {

	const {selectedProject,deleteProject} = useContext(ProjectContext)
	const {projectTasks} = useContext(TasksContext)

	if(!selectedProject) return null

	return (
			<Fragment>
				<h2 className="text-center my-3">{selectedProject.name}</h2>
						
		      				{projectTasks.length === 0

		      					? (<h5 className="text-center my-3">don't have tasks</h5>)

		      					: 
		      					<TransitionGroup>
		      						{projectTasks.map(task => (
		      							<CSSTransition
		        							key={task._id}
		        							timeout={200}
		        							classNames="task"
		        							>
					<ListGroup className="px-5">
		      								<TaskItem task={task} />
		    		</ListGroup>
		      							</CSSTransition>
		      						))}
		      					</TransitionGroup>
		      				}
	    				
				<Button className="m-2 position-absolute" size="md" type="button" color="danger" onClick={()=> deleteProject(selectedProject)}> Delete Project</Button>
			
			</Fragment>
	)
}

export default TasksList