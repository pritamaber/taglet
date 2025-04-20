import { Client, Functions } from "appwrite";

const client = new Client();
const functions = new Functions(client);

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const usePayment = () => {
  const createOrder = async ({ amount, credits, userId }) => {
    try {
      const execution = await functions.createExecution(
        import.meta.env.VITE_APPWRITE_FUNCTION_ID_CREATE_ORDER,
        JSON.stringify({ amount, credits, userId }),
        false
      );

      const body = execution?.responseBody;

      if (!body) {
        console.error("❌ No response body from function");
        return { success: false, error: "Empty response body." };
      }

      let parsed = {};
      try {
        parsed = JSON.parse(body);
        return parsed;
      } catch (err) {
        console.error("❌ Failed to parse responseBody:", body);
        return { success: false, error: "Failed to parse response." };
      }
    } catch (err) {
      console.error("❌ Appwrite execution error:", err.message);
      return { success: false, error: err.message };
    }
  };

  return { createOrder };
};
