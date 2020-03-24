import axios from 'axios';


export default function request(config) {
  return axios(config)
    .then((response) => response.data)
    .catch((e) => {
      const error = new Error(e.response ? e.response.status : 'network error');
      error.response = e.response && e.response.data ? e.response.data.errors : ['There was a problem'];
      throw error;
    });
}
