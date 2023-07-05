// axios
import axios from 'axios'

const baseURL = 'https://todo-api-18-140-52-65.rakamin.com'

axios.defaults.headers.common[
    'Authorization'
    ] = `Bearer ${localStorage.getItem('token')}`

export default axios.create({
    baseURL
})
