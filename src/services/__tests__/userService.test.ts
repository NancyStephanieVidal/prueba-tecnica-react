import { userService } from '../userService';

jest.mock('axios');
import axios from 'axios';
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User Service Tests', () => {
  // Mock console.error para limpiar output
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz'
  };

  test('getUsers obtiene lista de usuarios exitosamente', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [mockUser] });

    const users = await userService.getUsers();
    
    expect(users).toEqual([mockUser]);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  test('getUsers maneja error de red', async () => {
    const networkError = new Error('Network Error');
    mockedAxios.get.mockRejectedValueOnce(networkError);

    await expect(userService.getUsers()).rejects.toThrow('Network Error');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  test('getUserById retorna usuario específico', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    const user = await userService.getUserById(1);
    
    expect(user).toEqual(mockUser);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
  });

  test('getUserById maneja usuario no encontrado', async () => {
    const notFoundError = new Error('Not Found');
    Object.assign(notFoundError, {
      response: { status: 404, data: { message: 'User not found' } }
    });
    
    mockedAxios.get.mockRejectedValueOnce(notFoundError);

    await expect(userService.getUserById(999)).rejects.toThrow();
    expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/999');
  });
});