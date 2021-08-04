import { hash, genSalt, compare, hashSync, genSaltSync } from "bcrypt";

const encrypt = async (password: string) => {
  const salt = await genSalt();
  const passwordHash = await hash(password, salt);
  return { salt, passwordHash };
};

const cryptCompare = (data: string, encrypted: string) =>
  compare(data, encrypted);

const encryptSync = async (password: string) => {
  const salt = genSaltSync();
  const passwordHash = hashSync(password, salt);
  return { salt, passwordHash };
};

export { encrypt, encryptSync, cryptCompare };
