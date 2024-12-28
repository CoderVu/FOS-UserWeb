import axios from 'axios';

const instance = axios.create({
 baseURL: 'https://food-app-gvbhgyfabjcthbhd.southeastasia-01.azurewebsites.net',
  //baseURL: 'http://10.10.2.94:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('configg', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
