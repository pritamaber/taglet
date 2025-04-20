import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-800">
      {/* Hero Section */}
      <header className="text-center px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold text-purple-700">
          Generate Viral Captions with AI
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Upload an image, pick your vibe, and let Taglet create scroll-stopping
          captions and 20 viral hashtags. Powered by OpenAI.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition"
        >
          🚀 Join Beta Now
        </Link>
      </header>

      {/* Preview Section */}
      <section className="px-6 py-12 md:py-20 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-600">
          See Taglet in Action
        </h2>
        <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-xl shadow">
          <img
            src="https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ"
            alt="Preview"
            className="rounded-md mx-auto mb-4"
          />
          <p className="italic text-gray-700">
            “Stepping into the weekend like... 💃”
          </p>
          <div className="mt-2 text-purple-500 text-sm">
            #weekendvibes #instagood #exploremore #mood #trending #fun
            #reelitfeelit
          </div>
        </div>
      </section>

      {/* About Taglet */}
      <section className="text-center px-6 py-16 bg-purple-50">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">
          Why Taglet?
        </h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          Whether you’re a creator, influencer, or a brand — Taglet helps you
          save time and boost engagement with AI-generated captions and hashtag
          sets crafted to match your image, mood, and style.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-8 px-4 bg-white border-t">
        <div className="space-y-2">
          <p>
            📸 Follow us on{" "}
            <a
              href="https://instagram.com/taglet.in.official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 font-medium hover:underline"
            >
              @taglet.in.official
            </a>
          </p>

          <p>
            📬 Contact:{" "}
            <a
              href="mailto:support@taglet.in"
              className="text-purple-600 font-medium hover:underline"
            >
              support@taglet.in
            </a>
          </p>

          <p>
            💬{" "}
            <Link
              to="/feedback"
              className="text-purple-600 font-medium hover:underline"
            >
              Give Feedback
            </Link>
          </p>

          <p className="text-xs text-gray-400 mt-4">
            © {new Date().getFullYear()}{" "}
            <span className="text-purple-500 font-semibold">Taglet</span>. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
