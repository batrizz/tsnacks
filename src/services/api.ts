import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://snacksapi.azurewebsites.net'
})