import axios from "axios";

const apiPort = 3000

const localApi = `http://172.16.36.40:${apiPort}`


const api = axios.create({
    baseURL: localApi
})


export default api