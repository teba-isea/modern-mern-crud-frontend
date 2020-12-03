import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'


const PrivateRoute = ({ component: Component, ...props }) => {

const { authenticated, isLoading } = useContext(UserContext)

	return (
		<Route {...props} render={ props => (!isLoading && authenticated) 
				? (<Component {...props} />)
				: (<Redirect to="/" />)
									}
			/>
		)
}

export default PrivateRoute