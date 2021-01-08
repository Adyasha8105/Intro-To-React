import axios from "axios";
const instance = axios.create({
	baseURL: "https://react-cyber-burger-app.firebaseio.com/"
});

export default instance;
