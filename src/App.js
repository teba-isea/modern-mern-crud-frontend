import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Login from "./components/auth/Login.jsx"
import Signup from "./components/auth/Signup.jsx"
import Projects from "./components/projects/Projects.jsx"

import setAuthToken from './config/setAuthToken'
import ProjectState from './context/projects/ProjectsState'
import TasksState from './context/tasks/TasksState'
import AlertState from './context/alerts/AlertState'
import UserState from './context/user/UserState'
import PrivateRoute from './components/routes/PrivateRoute'

const token = localStorage.getItem('token')

if(token){
	setAuthToken(token)
}

function App() {
	return (
		<AlertState>	
			<ProjectState>
				<TasksState>
					<UserState>
						<Router>
							<Switch>
									<Route exact path="/" component={Login}/>
									<Route exact path="/signup" component={Signup}/>
									<PrivateRoute exact path="/projects" component={Projects}/>
							</Switch>
						</Router>
					</UserState>
				</TasksState>	
			</ProjectState>
		</AlertState>
	)
}

export default App;