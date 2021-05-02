import { useState, useEffect } from 'react';
import axios from '../../axios';

export default function useAuth() {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.Authorization = JSON.parse(token);
      setSigned(true);
    }

    setLoading(false);
  }, []);
  console.log(loading, 'loading...');
  console.log(signed, 'autenticado');

  async function handleLogin() {
    const data = await axios.post('/auth/login', {
      password: 'rx605hWVVC',
      username: 'user5',
    }).catch((req) => {
      return req.data;
    });
    console.log('useAuth', data.data.name);
    setUser(data);
    const token = data.headers.authorization;
    const myUser = data.data.name;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(myUser));
    axios.defaults.headers.Authorization = token;
    setSigned(true);
  }

  function handleLogout() {
    setSigned(false);
    localStorage.removeItem('token');
    axios.defaults.headers.Authorization = undefined;
  }
  return {
    user,
    signed,
    loading,
    handleLogin,
    handleLogout
  };
}
