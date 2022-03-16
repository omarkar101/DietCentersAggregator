import axios from 'axios';

// const URL = 'https://299-flask-api.azurewebsites.net/'
const URL = 'http://localhost:5000/'

export default axios.create({
  baseURL: URL
});
