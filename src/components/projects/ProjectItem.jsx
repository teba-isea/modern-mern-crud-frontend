import React,{useContext} from 'react'
import { ListGroupItem } from 'reactstrap';
import ProjectContext from '../../context/projects/ProjectsContext'
import TasksContext from '../../context/tasks/TasksContext'


const ProjectItem = ({project}) => {
	
	const {selectProject} = useContext(ProjectContext)
	const {obtainProjectTasks} = useContext(TasksContext)

	const onClickSelectProject = project => {
		console.log(project)
		obtainProjectTasks(project._id)
		selectProject(project)
	}

	return(
		<ListGroupItem 
			className="w-100" 
			tag="button" 
			href="#"
			onClick={()=> onClickSelectProject(project)} 
			action>{project.name}</ListGroupItem>
	)
}
export default ProjectItem