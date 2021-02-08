import axios from 'axios';

const API_URL = 'http://ec2-13-115-61-236.ap-northeast-1.compute.amazonaws.com:3000/';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {}
});
