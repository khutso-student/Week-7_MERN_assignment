// src/api/AuthAPI.js
import api from './axios';

export const signup = async (data) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};
