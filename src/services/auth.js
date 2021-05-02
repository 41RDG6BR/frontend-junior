import axios from '../axios';

const login = async (username, password) => {
  const response = await axios.post('/auth/login', {
    username,
    password
  }).catch((request) => {
    return request.response;
  });
  if (response.data && !response.data.error) {
    console.log(response.data);
  }
  return response.data;
};

export default login;
