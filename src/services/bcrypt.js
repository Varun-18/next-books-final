import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 8);
  return hashedPass;
};

export const verifyPassword = async (userPass, dbPass) => {
  const result = await bcrypt.compare(userPass, dbPass);
  return result;
};
