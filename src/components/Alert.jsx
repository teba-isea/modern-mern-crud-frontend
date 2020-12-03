import React,{useContext} from 'react'
import {Alert as AlertMessage} from 'reactstrap'
import {TransitionGroup,CSSTransition} from 'react-transition-group'
import AlertContext from '../context/alerts/AlertContext'

const Alert = () => {

	const {alert,hideAlert} = useContext(AlertContext)
		

	if (!alert) return null

	return (
	<TransitionGroup>
		<CSSTransition
			timeout={200}
			classNames="task"
		>
			<AlertMessage className="position-fixed fixed-top font-weight-bold px-5" color={`${alert.category}`}>{alert.msg} 
			<button type="button" className="close" aria-label="Close" onClick={()=> hideAlert()}>
	    		<span aria-hidden="true">&times;</span>
	  		</button>
	  		</AlertMessage>
		</CSSTransition>
	</TransitionGroup>

	)
}

export default Alert