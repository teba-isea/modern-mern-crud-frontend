import React, { useState,useContext,useEffect } from 'react'
import {Link as A} from 'react-router-dom' 
import AlertContext from '../../context/alerts/AlertContext'
import userContext from '../../context/user/UserContext'
import Alert from '../Alert'
import {Row,Col, Jumbotron, Form, FormGroup, Label, Input, Button } from 'reactstrap'

const token = localStorage.getItem('token')

const Login = ({history}) => {

	const { showAlert } = useContext(AlertContext)

	const { signIn, message,obtainUser, authenticated } = useContext(userContext)

	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	})

	const { email, password } = loginData

	if(authenticated === null && token) obtainUser()

	useEffect(()=>{

		if(authenticated){
			history.push("/projects")
		}

		if(message){
			showAlert(message,"danger")
		}
		
		// eslint-disable-next-line
	},[authenticated,message])

	const handleForm = e => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		})
	}

	const upLoginData = e => {
		e.preventDefault()

		if(email.trim() === '' || password === ''){ 
			showAlert("please check the fields","danger")
		}

		signIn(loginData)

	}

	return (
		<Row id="main" className="h-100 bg-gradient justify-content-center m-0">
		<Alert/>
			<Col md="6">
				<Jumbotron className="m-md-5 shadow">

			<h1 className="display-4 text-center">Sign in</h1>

			<Form onSubmit={e => upLoginData(e)}>
				
			<FormGroup>
				<Label for="email">Email</Label>
				<Input 
					type="email" 
					name="email" 
					id="email" 
					placeholder="example@mail.com"
					onChange={e => handleForm(e)} 
					value={email}
				/>

			</FormGroup>

			<FormGroup>
				<Label htmlFor="Password">Password</Label>
				<Input 
					type="password" 
					name="password" 
					id="Password" 
					placeholder="minimal length is 8 characters" 
					onChange={e => handleForm(e)} 
					value={password}
				/>

			</FormGroup>

			<FormGroup>
				 <Button className="btn-block mx-1" type="submit" color="dark">Log In</Button>
			</FormGroup>

			</Form>

			<p>Don't have a account? <A to={'/signup'}>Sign up</A></p>

		</Jumbotron>
			</Col>
		</Row>
	)
}

export default Login