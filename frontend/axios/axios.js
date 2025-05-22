import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_JAVASCRIPT_CRUD_API,
});

export default axiosInstance;

//biasanya kalo login akan namanya token tapi kita hanya bikin crud dimana kita bisa memasukan datanya langsung terhubung dengan 
//database dengan api