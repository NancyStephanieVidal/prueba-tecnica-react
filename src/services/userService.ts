import axios from 'axios';
import { User } from '../types/userTypes';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await axios.get<User>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  }
};