import axios from 'axios'

const clientApi = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
})


export default clientApi