import bcrypt from "bcrypt";
const saltRounds = 10;

const encryptPassword = async (password: string): Promise<string> => {
  console.log("im in at encrpyPasword");
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

export default encryptPassword;
