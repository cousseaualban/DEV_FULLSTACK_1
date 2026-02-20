import { registerUser, loginUser } from '../authService.js';
import * as userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../models/userModel.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('authService - registerUser', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Inscription réussie', async () => {
    userModel.getUserByUsername.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    userModel.createUser.mockResolvedValue(1);

    const userId = await registerUser('testUser', 'Motdepasse1!');

    expect(userModel.getUserByUsername).toHaveBeenCalledWith('testUser');
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(userModel.createUser).toHaveBeenCalledWith('testUser', 'hashedPassword123');
    expect(userId).toBe(1);
  });

  test('Username déjà utilisé', async () => {
    userModel.getUserByUsername.mockResolvedValue({ id: 1, username: 'testUser' });

    await expect(registerUser('testUser', 'Motdepasse1!'))
      .rejects
      .toThrow('Username déjà utilisé');
  });

  test('Mot de passe invalide', async () => {
    await expect(registerUser('testUser', 'abc'))
      .rejects
      .toThrow();
  });

});

describe('authService - loginUser', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Connexion réussie', async () => {
    const fakeUser = {
      id: 1,
      username: 'testUser',
      password: 'hashedPassword123'
    };

    userModel.getUserByUsername.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-jwt-token');

    const result = await loginUser('testUser', 'Motdepasse1!');

    expect(userModel.getUserByUsername).toHaveBeenCalledWith('testUser');
    expect(bcrypt.compare).toHaveBeenCalledWith('Motdepasse1!', 'hashedPassword123');
    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toBe('fake-jwt-token');
  });

  test('Username inexistant', async () => {
    userModel.getUserByUsername.mockResolvedValue(null);

    await expect(loginUser('unknown', 'Motdepasse1!'))
      .rejects
      .toThrow();
  });

  test('Mot de passe incorrect', async () => {
    const fakeUser = {
      id: 1,
      username: 'testUser',
      password: 'hashedPassword123'
    };

    userModel.getUserByUsername.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(loginUser('testUser', 'WrongPassword1!'))
      .rejects
      .toThrow();
  });

});
