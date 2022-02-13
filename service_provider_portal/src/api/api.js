import axios from 'axios';

const URL = 'https://299-flask-api.azurewebsites.net/'

export default axios.create({
  baseURL: URL
});
