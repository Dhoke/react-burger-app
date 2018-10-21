import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-9b397.firebaseio.com/'
});

export default instance;