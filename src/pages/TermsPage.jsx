import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-6 py-12 flex justify-center">
      <div className="bg-white max-w-3xl w-full p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          📜 Terms & Conditions
        </h1>

        <section className="space-y-4 text-sm text-gray-700">
          <div>
            <h2 className="font-semibold text-purple-600">1. Introduction</h2>
            <p>
              Taglet provides AI-generated captions and hashtags based on
              user-uploaded images. By using Taglet, you agree to our terms,
              refund policy, and fair usage practices.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-600">
              2. Account & Credits
            </h2>
            <p>
              You must be logged in to use credits. Credits are non-transferable
              and tied to your account. One credit is deducted for each caption
              generation request.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-600">
              3. Refunds & Credits
            </h2>
            <p>
              By purchasing Taglet credits, you agree that refunds will only be
              issued for unused credits and at our sole discretion. Credits that
              are used for caption generation are considered non-refundable.
            </p>
            <p className="mt-1">
              For any refund-related issues, visit our{" "}
              <Link to="/refunds" className="text-purple-600 underline">
                Refund Request page
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-600">4. Fair Usage</h2>
            <p>
              Abuse of the platform (e.g., automated requests, scraping, reverse
              engineering) may result in suspension without refund.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-600">5. Contact</h2>
            <p className="text-sm">
              If you have questions, you can email us at{" "}
              <a
                href="mailto:support@taglet.in"
                className="underline text-purple-600"
              >
                support@taglet.in
              </a>
              , or{" "}
              <Link to="/support" className="underline text-purple-600">
                submit a support request
              </Link>
              . For product suggestions or issues, feel free to{" "}
              <Link to="/feedback" className="underline text-purple-600">
                leave feedback
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
