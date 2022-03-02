import axios from 'axios';

// const URL = 'https://299-flask-api.azurewebsites.net/'
const URL = 'http://127.0.0.1:5000/';

export default axios.create({
  baseURL: URL
});
