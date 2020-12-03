import React, { useEffect, useContext } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import TaskList from '../tasks/TasksList'
import ProjectForm from './ProjectForm'
import Alert from '../Alert'
import userContext from '../../context/user/UserContext'


const Projects = () => {

	const {obtainUser,token, user} = useContext(userContext)

	useEffect(() => {
		if(token && !user)obtainUser()
		// eslint-disable-next-line
	}, [])

	return (
		<Container fluid>
				<Alert/>
				<Row>
					<Col md="3" className="p-0 bg-white h-100">
						<Sidebar/>
					</Col>	
										
					<Col md="9" className="p-0 h-100 w-100 bg-light">
						<Header/>
						<ProjectForm/>
						<TaskList/>
					</Col>
				</Row>
		</Container>
	)

}

export default Projects