import React, { useState, useContext, useEffect } from 'react'
import { Link as A } from 'react-router-dom'
import { Row, Col, Jumbotron, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import Alert from '../Alert'
import AlertContext from '../../context/alerts/AlertContext'
import userContext from '../../context/user/UserContext'


const Login = ({history}) => {

	const { showAlert } = useContext(AlertContext)

	const { registerUser, message, authenticated } = useContext(userContext)


	useEffect(()=>{

		if(authenticated){
			history.push("/projects")
		}

		if(message){
			showAlert(message,"danger")
		}

		// eslint-disable-next-line
	},[authenticated,message])


	const [signUpData, setSignUpData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const { name, email, password, confirmPassword } = signUpData

	const handleForm = e => {
		e.preventDefault()
		setSignUpData({
			...signUpData,
			[e.target.name]: e.target.value
		})
	}

	const upSignUpData = e => {
		e.preventDefault()

		if (name === '' || email === '' || password === '')
			return showAlert(' All fields are required', 'danger')

		if (password.length < 8)
			return showAlert('Password length must be greater o equal to 8', 'danger')

		if (password !== confirmPassword)
			return showAlert('Both passwords must be the same', 'danger')

		registerUser({ name, email, password })
	}

	return (
		<Row className="bg-gradient justify-content-center m-0">
		<Alert/>
			<Col md="6">
				<Jumbotron className="m-md-4 p-5 shadow">

					<h1 className="display-5 text-center">Sign Up</h1>

					<Form onSubmit={e => upSignUpData(e)}>

					<FormGroup>
						<Label for="Name">Name</Label>
						<Input 
							type="text" 
							name="name" 
							id="Name" 
							placeholder="john doeh"
							onChange={e => handleForm(e)} 
						/>

					</FormGroup>
						
					<FormGroup>
						<Label for="Email">Email</Label>
						<Input 
							type="email" 
							name="email" 
							id="Email" 
							placeholder="example@mail.com"
							onChange={e => handleForm(e)} 
						/>

					</FormGroup>

					<FormGroup>
						<Label for="Password">Password</Label>
						<Input 
							type="password" 
							name="password" 
							id="Password" 
							placeholder="minimal length is 8 characters" 
							onChange={e => handleForm(e)} 
						/>

					</FormGroup>

					<FormGroup>
						<Label for="Password">Confirm password</Label>
						<Input 
							type="password" 
							name="confirmPassword" 
							id="Password" 
							placeholder="may be equal to the password field" 
							onChange={e => handleForm(e)} 
						/>

					</FormGroup>

					<FormGroup>
						 <Button className="btn-block mx-1" type="submit" color="dark">Log In</Button>
					</FormGroup>

					</Form>

					<p>already have a account? <A to={'/'}>Sign in</A></p>

				</Jumbotron>
			</Col>	
		</Row>
	)
}

export default Login