const Razorpay = require("razorpay");

module.exports = async ({ req, res, log }) => {
  log("⚙️ create-order triggered");

  try {
    // Parse incoming data from frontend
    const body = req.body || "{}";
    const { amount, credits, userId } = JSON.parse(body);

    log("🧠 Received:", { amount, credits, userId });

    // Validate input fields
    if (!amount || !credits || !userId) {
      log("❌ Missing required fields");
      return res.json({ success: false, error: "Missing parameters" }, 400);
    }

    // Initialize Razorpay client
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    log("🔐 Razorpay client initialized");

    // Create a new Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `r_${userId.slice(0, 8)}_${Date.now()}`,
      notes: { userId, credits },
    });

    log("✅ Razorpay order created:", order);

    // Return success with order info
    return res.json({
      success: true,
      order,
    });
  } catch (err) {
    log("🔥 FULL ERROR OBJECT:");
    log(JSON.stringify(err, null, 2)); // Entire object (you will see full Razorpay error)
    log("🔥 err.name:", err.name);
    log("🔥 err.stack:", err.stack);

    return res.json(
      {
        success: false,
        error: err?.message || "Unknown server error",
      },
      500
    );
  }
};
