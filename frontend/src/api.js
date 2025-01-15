//here we will have our interecptor axios
//it will allow us to intercept api requests before sending or after recieving them
//we could thange their content ,add the auth tokens or handle errors so that we are not
//foreced to do that each time in our components

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

//this create the interceptor for all requests related to our backend
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
//in any request made to the api , axios will look of there was a token in the local storfe and then add it

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config; // Ensure to return the modified config object
	},
	(error) => {
		return Promise.reject(error); // Return the error if it occurs
	}
);

export default api;
