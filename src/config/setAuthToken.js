import clientApi from './clientApi'

const setAuthToken = token =>{
	token? clientApi.defaults.headers.common['x-auth-token'] = token 
		: delete clientApi.defaults.headers.common['x-auth-token']
}

export default setAuthToken