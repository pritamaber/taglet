import sdk from "node-appwrite";

export default async ({ req, res, log }) => {
  log("⚙️ apply-credits triggered");

  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new sdk.Databases(client);

  try {
    log("📦 RAW req.payload:", req.payload);

    const { userId, credits, amount, razorpayId } = JSON.parse(req.payload);
    log("🧠 Payload:", { userId, credits, amount, razorpayId });

    if (!userId || !credits || !amount || !razorpayId) {
      throw new Error("Missing required fields");
    }

    // 1️⃣ Fetch user document
    const user = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USERS_COLLECTION_ID,
      userId
    );

    const newCredits = (user.credits || 0) + credits;

    // 2️⃣ Update user's credits
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
        credits,
        amount,
        razorpayId,
        timestamp: new Date().toISOString(),
      }
    );
    console.log("💾 Creating transaction for", userId);
    console.log("📦 Final credits after update:", newCredits);

    log("✅ Credits applied & transaction logged");
    return res.json({ success: true, credits: newCredits });
  } catch (err) {
    log("❌ Error in apply-credits: " + err.message);
    return res.json({ success: false, error: err.message });
  }
};
