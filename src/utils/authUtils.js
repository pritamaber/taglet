// /src/utils/authUtils.js
import { account } from "../appwrite/appwriteConfig";

export const getAccount = async () => {
  const user = await account.get();
  return user;
};
