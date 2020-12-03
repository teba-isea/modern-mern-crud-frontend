import React,{useContext} from 'react'
import {Button, Row, Col, Badge, ButtonGroup} from 'reactstrap'
import TasksContext from '../../context/tasks/TasksContext'
import projectsContext from '../../context/projects/ProjectsContext'


const TaskItem = ({task}) =>{ 

	const {obtainProjectTasks,deleteTask,changeIsComplete,selectTask} = useContext(TasksContext)
	const {selectedProject} = useContext(projectsContext)
	const {name,status,_id,project} = task

	const changeCompletedValue = () => {
		changeIsComplete(task)
		obtainProjectTasks(selectedProject._id)
	}

	return (
		<Button color="light" className=" mx-5 my-1 p-1 shadow">
			<Row className="px-3 align-items-center justify-content-between">
				<Col md="8">	
					<p>{name}</p>
				</Col>
				<Col md="2">
				{status
					?(<Badge tag="button" onClick={()=> changeCompletedValue(task)} color="success p-2 btn">Completed</Badge>)
					:(<Badge tag="button" onClick={()=> changeCompletedValue(task)} color="info p-2 btn">incompleted</Badge>)
				}
				</Col>

				<Col md="2">
					<ButtonGroup>
	      				<Button color="dark" onClick={()=> selectTask(task)} >Edit</Button>
						<Button color="danger" onClick={() => {
							deleteTask( _id,project.toString())
							obtainProjectTasks(selectedProject._id)
						}}>Delete</Button>
					</ButtonGroup>
				</Col>
			</Row>
		</Button>
	)}

export default TaskItem