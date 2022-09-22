import axios from 'axios'
const service = axios.createServer()
service.interceptors.request.use()
service.interceptors.response.us()
export default service
