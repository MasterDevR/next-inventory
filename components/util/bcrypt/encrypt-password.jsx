import bcrypt from "bcrypt";
const saltRounds = 10;

const encryptPassword = async (password) => {
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

export default encryptPassword;
