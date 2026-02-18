import { validatePassword } from '../userValidator.js';

describe('Validation du mot de passe', () => {

  test('Mot de passe valide', () => {
    expect(validatePassword('Motdepasse1!')).toBe(true);
  });

  test('Trop court', () => {
    expect(validatePassword('Ab1!')).toBe(false);
  });

  test('Pas de majuscule', () => {
    expect(validatePassword('motdepasse1!')).toBe(false);
  });

  test('Pas de chiffre', () => {
    expect(validatePassword('Motdepasse!')).toBe(false);
  });

  test('Pas de caractère spécial', () => {
    expect(validatePassword('Motdepasse1')).toBe(false);
  });

  test('Trop long', () => {
    expect(validatePassword('Motdepasse12345!')).toBe(false);
  });

});
