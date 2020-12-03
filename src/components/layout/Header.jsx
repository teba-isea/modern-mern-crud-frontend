import React, { useContext } from 'react'
import userContext from '../../context/user/UserContext'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Col } from 'reactstrap'

const Header = () => {

	const { user, logout } = useContext(userContext)

	return (
		<Navbar color="primary" primary expand="md">
			<Col sm="3" md="10">
				<NavbarBrand className="text-white" href="/">Hello {user?user.name:"you!"}</NavbarBrand>
	 		</Col>

			<Col sm="5" md="2">
				<Nav>
					<NavItem>
						<NavLink className="text-white btn" tag="button" onClick={()=> logout()}>Log out</NavLink>
					</NavItem>
				</Nav> 
			</Col>
		</Navbar>
	)
}

export default Header