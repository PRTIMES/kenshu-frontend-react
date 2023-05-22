import axios from 'axios';
import { config } from './axios-config';

export const getAllData = async () => {
  const { data } = await axios.get(
    'http://127.0.0.1:8000/api/tasks',
    config
  )
  return data;
};

export const createTask = async () => {
  try {
    await axios.post(
      'http://127.0.0.1:8000/api/tasks',
      config
    )
  } catch (error) {
    console.log(error)
    throw error
  }
};
