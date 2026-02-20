export const validatePassword = (password) => {
  if (typeof password !== 'string') return false;

  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,12}$/;
  return regex.test(password);
};