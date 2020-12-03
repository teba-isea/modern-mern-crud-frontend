import React from 'react'
import NewProject from '../projects/NewProject'
import ProjectList from '../projects/ProjectList'

import {Col} from 'reactstrap'

const Sidebar = () => {

	return (
		<Col className="p-0 bg-white h-100">
			<div className="h-100 shadow-lg text-center m-0 p-3 ">
				<h3 className="font-weight-bold mb-5">Modern Mern Crud</h3>

				<NewProject/>
				
				<div>
					<h4 className="font-weight-bolder my-5">Your projects</h4>
				</div>	

				<ProjectList/>

			</div>
		</Col>
	)
}

export default Sidebar