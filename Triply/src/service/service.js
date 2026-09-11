import axios from "axios";

const apiPort = 3000

const localApi = `http://192.168.137.1:${apiPort}`


const api = axios.create({
    baseURL: localApi
})


export default api