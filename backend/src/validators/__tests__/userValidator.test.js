import { validatePassword } from '../userValidator.js';

describe('userValidator - validatePassword', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Cas valides', () => {

    test('Mot de passe valide standard', () => {
      expect(validatePassword('Motdepasse1!')).toBe(true);
    });

    test('Longueur minimale valide', () => {
      expect(validatePassword('Abcdef1!')).toBe(true);
    });

    test('Longueur maximale valide', () => {
      expect(validatePassword('Abcdefghij1!')).toBe(true);
    });

  });

  describe('Contraintes de longueur', () => {

    test('Trop court', () => {
      expect(validatePassword('Ab1!')).toBe(false);
    });

    test('Trop long', () => {
      expect(validatePassword('Motdepasse12345!')).toBe(false);
    });

  });

  describe('Contraintes de complexité', () => {

    test('Pas de majuscule', () => {
      expect(validatePassword('motdepasse1!')).toBe(false);
    });

    test('Pas de minuscule', () => {
      expect(validatePassword('MOTDEPASSE1!')).toBe(false);
    });

    test('Pas de chiffre', () => {
      expect(validatePassword('Motdepasse!')).toBe(false);
    });

    test('Pas de caractère spécial', () => {
      expect(validatePassword('Motdepasse1')).toBe(false);
    });

  });

  describe('Cas combinés invalides', () => {

    test('Sans majuscule ni chiffre', () => {
      expect(validatePassword('motdepasse!')).toBe(false);
    });

    test('Sans chiffre ni caractère spécial', () => {
      expect(validatePassword('Motdepasse')).toBe(false);
    });

  });

  describe('Entrées invalides', () => {

    test('Valeur null', () => {
      expect(validatePassword(null)).toBe(false);
    });

    test('Valeur undefined', () => {
      expect(validatePassword(undefined)).toBe(false);
    });

    test('Nombre au lieu de string', () => {
      expect(validatePassword(12345678)).toBe(false);
    });

    test('Objet au lieu de string', () => {
      expect(validatePassword({})).toBe(false);
    });

    test('Chaîne vide', () => {
      expect(validatePassword('')).toBe(false);
    });

  });

});