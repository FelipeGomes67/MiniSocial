import axios from "axios";

const API_HOST = "192.168.137.1";
const API_PORT = 3000;

const api = axios.create({
  baseURL: `http://${API_HOST}:${API_PORT}`,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Erro de conexão com a API:", error);
    }

    return Promise.reject(error);
  }
);

export default api;