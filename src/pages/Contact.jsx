export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-6 py-12 flex justify-center">
      <div className="bg-white max-w-3xl w-full p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          📩 Contact Us
        </h1>

        <div className="space-y-4 text-sm text-gray-700">
          <p>
            We’re here to help! For questions, payment issues, refund requests,
            or feedback, please feel free to reach out. Our support team usually
            responds within 24 hours on business days.
          </p>

          <div>
            <h2 className="font-semibold text-purple-600">📧 Email</h2>
            <p>
              <a
                href="mailto:support@taglet.in"
                className="underline text-purple-600"
              >
                support@taglet.in
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-600">📞 Phone</h2>
            <p>+91 62916 16198</p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-600">
              🏢 Business Details
            </h2>
            <p>
              <strong>Business Name:</strong> Taglet
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href="https://taglet.in" className="underline text-purple-600">
                https://taglet.in
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-600">
              🛠 Support & Feedback
            </h2>
            <p>
              Please{" "}
              <a href="/support" className="underline text-purple-600">
                contact support
              </a>{" "}
              or{" "}
              <a href="/feedback" className="underline text-purple-600">
                leave feedback
              </a>{" "}
              after logging in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
