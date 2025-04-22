import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-sm leading-relaxed">
        <p>
          At <span className="font-semibold text-purple-600">Taglet</span>, your
          privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your data when you use our services.
        </p>

        <div>
          <h2 className="font-semibold text-purple-600">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>User Data:</strong> Name, email, avatar, plan info, and
              credits.
            </li>
            <li>
              <strong>Uploaded Content:</strong> Images you upload for caption
              generation.
            </li>
            <li>
              <strong>Generated Content:</strong> Captions, hashtags, and
              history stored for your convenience.
            </li>
            <li>
              <strong>Payment Details:</strong> Handled securely via Razorpay.
              We do not store card or payment data directly.
            </li>
            <li>
              <strong>Usage Data:</strong> We may log interactions for analytics
              or support.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-purple-600">
            2. How We Use Your Data
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>To generate captions and hashtags using OpenAI’s APIs.</li>
            <li>To store your profile and content via Appwrite.</li>
            <li>To enable credit tracking, payments, and content history.</li>
            <li>To improve our services, support, and security.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-purple-600">
            3. Third-Party Services
          </h2>
          <p className="mt-2">
            We use the following services to deliver Taglet:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>OpenAI:</strong> Used for image caption and hashtag
              generation. Images are processed via OpenAI's API.
            </li>
            <li>
              <strong>Appwrite:</strong> Used for secure user authentication,
              storage, database, and cloud functions.
            </li>
            <li>
              <strong>Razorpay:</strong> Used for handling payments. We do not
              store your payment details.
            </li>
            <li>
              <strong>Vercel:</strong> Used to host our frontend.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-purple-600">
            4. Data Storage & Security
          </h2>
          <p className="mt-2">
            Your data is stored securely in our Appwrite backend. We implement
            industry-standard practices to protect against unauthorized access
            or misuse. However, no method of transmission over the internet is
            100% secure.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-purple-600">
            5. AI-Generated Content Disclaimer
          </h2>
          <p className="mt-2">
            Captions and hashtags are generated using AI and may sometimes be
            inaccurate, inappropriate, or unexpected. Please review generated
            content before use. Taglet is not liable for the interpretation or
            use of such content.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-purple-600">6. Your Rights</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Request a copy of your stored data.</li>
            <li>Request deletion of your account and related data.</li>
            <li>Contact us with privacy concerns.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-purple-600">7. Contact</h2>
          <p className="mt-2">
            If you have questions, contact us at{" "}
            <a
              href="mailto:support@taglet.in"
              className="text-purple-600 font-medium hover:underline"
            >
              support@taglet.in
            </a>
          </p>
        </div>

        <div className="text-xs text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="mt-10">
        <Link
          to="/"
          className="inline-block text-purple-600 hover:underline text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
