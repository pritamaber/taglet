import sdk from "node-appwrite";

export default async ({ req, res, log, error }) => {
  // Set CORS headers first
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.send("", 204);
  }

  log("⚙️ apply-credits triggered");

  try {
    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new sdk.Databases(client);

    // Parse input based on method
    const params =
      req.method === "GET" ? req.query : JSON.parse(req.body || "{}");
    const { userId, credits, amount, razorpayId } = params;

    // Validate parameters
    if (!userId || !credits || !amount || !razorpayId) {
      throw new Error(
        "All parameters (userId, credits, amount, razorpayId) are required"
      );
    }

    // Update user credits
    const user = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USERS_COLLECTION_ID,
      userId
    );

    const newCredits = (user.credits || 0) + Number(credits);
    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USERS_COLLECTION_ID,
      userId,
      { credits: newCredits }
    );

    // Create transaction record
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TRANSACTIONS_COLLECTION_ID,
      sdk.ID.unique(),
      {
        userId,
        credits: Number(credits),
        amount: Number(amount),
        razorpayId,
        timestamp: new Date().toISOString(),
      }
    );

    return res.json({
      success: true,
      credits: newCredits,
    });
  } catch (err) {
    error("❌ Error:", err);
    return res.json({
      success: false,
      error: err.message,
    });
  }
};
