import axios from 'axios';

export default axios.create({
  baseURL: 'https://processo.profranchising.com.br',
  headers: {
    'Content-type': 'application/json'
  }
});
