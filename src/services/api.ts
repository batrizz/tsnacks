import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_PUBLIC_API_URL
})