import React,{Fragment, useState, useContext} from 'react'
import {Button, FormGroup, Input} from 'reactstrap'
import ProjectContext from '../../context/projects/ProjectsContext'

const NewProject = () => {

	const {newProjectForm, ChangeNewProjectForm, addNewProject,setIsError, obtainProjects} = useContext(ProjectContext)

	const [project,setProject] = useState({
		name: ""
	})

	const handleForm = e => {
		setProject({
			...project,
			[e.target.name] : e.target.value
		})
	} 

	const upProject = e => {
		e.preventDefault()

		if(project.name === '') {
			return setIsError({message: "Project name is empty"})
		}
		addNewProject(project)
		obtainProjects()
		setProject({})
	}

	return (
		<Fragment>

			{newProjectForm
				?
					(<FormGroup>
						<Button className="btn-block my-md-4" type="submit" color="primary" onClick={() => ChangeNewProjectForm()}>
							New Project
						</Button>
					</FormGroup>)
				:
					(<form onSubmit={e => upProject(e)}>
						<FormGroup>

							<Input 
								type="text" 
								name="name" 
								placeholder="Project name" 
								onChange={handleForm}
								value={project.name}
							/>

							<Button 
								className="btn-block my-1 my-md-3" 
								type="submit" 
								color="primary" 
								onClick={(e) => {
									upProject(e)
									
								}}>
								Add Project
							</Button>

						</FormGroup>	
					</form>)

			}

		</Fragment>
	)
}

export default NewProject