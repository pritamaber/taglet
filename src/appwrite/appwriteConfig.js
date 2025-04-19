import { Client, Account, Databases, Storage, Functions, ID } from "appwrite";

// ✅ Initialize the Appwrite client
export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// ✅ Export services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export { ID };
