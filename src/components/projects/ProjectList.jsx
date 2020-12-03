import React,{useContext,useEffect} from 'react'
import ProjectItem from './ProjectItem'
import { ListGroup } from 'reactstrap';
import ProjectsContext from '../../context/projects/ProjectsContext'
import {TransitionGroup,CSSTransition} from 'react-transition-group'

const ProjectList = () => {

	const {projectsList, obtainProjects} = useContext(ProjectsContext)

	useEffect(()=>{
		obtainProjects()
		// eslint-disable-next-line
	},[])



	if(projectsList.length === 0) return <p className="font-weight-bold">Add a new project</p>

	return (
		<ListGroup>
					<TransitionGroup>
	        		{projectsList.map(project => (
		        			<CSSTransition
		        				key={project._id}
		        				timeout={200}
		        				classNames="project"
		        			>
		        				<ProjectItem project={project}/>
		        			</CSSTransition>))}
					</TransitionGroup>
	    </ListGroup>

	)
}

export default ProjectList