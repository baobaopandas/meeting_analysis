import axios from 'axios';

// axios.defaults.baseURL = 'http://127.0.0.1:5000/';
// axios.defaults.baseURL = 'http://8.142.25.8:5000/';
axios.defaults.headers['Content-Type'] =
  'application/json';

export default config =>
  axios({ ...config }).then(res => Promise.resolve(res.data));
