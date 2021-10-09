import axios from "axios";

const instance = axios.create({
	baseURL: "https://hairfy-api.herokuapp.com/api"
});

export default instance;