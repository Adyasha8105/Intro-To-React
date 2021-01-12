import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-21745-default-rtdb.firebaseio.com/'
});

export default instance;