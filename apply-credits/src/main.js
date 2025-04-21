const sdk = require("node-appwrite");

// Initialize
module.exports = async function (req, res) {
  console.log("⚙️ apply-credits triggered");

  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new sdk.Databases(client);

  try {
    const { userId, credits, amount, razorpayId } = JSON.parse(req.payload);
    console.log("🧠 Payload:", { userId, credits, amount, razorpayId });

    if (!userId || !credits || !amount || !razorpayId) {
      throw new Error("Missing required fields");
    }

    // 1️⃣ Fetch existing user
    const user = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USERS_COLLECTION_ID,
      userId
    );

    const newCredits = (user.credits || 0) + credits;

    // 2️⃣ Update user's credit balance
    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USERS_COLLECTION_ID,
      userId,
      {
        credits: newCredits,
      }
    );

    // 3️⃣ Log transaction
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TRANSACTIONS_COLLECTION_ID,
      sdk.ID.unique(),
      {
        userId,
        amount,
        credits,
        razorpayId,
        timestamp: new Date().toISOString(),
      }
    );

    console.log("✅ Credits added & transaction logged");
    return res.json({ success: true, credits: newCredits });
  } catch (err) {
    console.error("❌ Error in apply-credits:", err.message);
    return res.json({ success: false, error: err.message });
  }
};
