import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const samples = [
    {
      url: "https://fastly.picsum.photos/id/206/2880/1800.jpg?hmac=qqtAE4icI-2Tkxgul5jrduIkZu3JtmvLqpOIwLhzYZA",
      caption: "Chasing sunsets 🌅",
    },
    {
      url: "https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg",
      caption: "Feeling fabulous ✨",
    },
    {
      url: "https://fastly.picsum.photos/id/342/2896/1944.jpg?hmac=_2cYDHi2iG1XY53gvXOrhrEWIP5R5OJlP7ySYYCA0QA",
      caption: "Colors of life 🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-800">
      {/* === Hero Section === */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-purple-700"
        >
          Create Viral Captions & Hashtags For Your Social Profiles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Upload a photo, pick a vibe, and watch AI craft fire captions &
          hashtags. Taglet is your IG secret weapon 💅
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex justify-center gap-6 flex-wrap"
        >
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:scale-105 transition-transform"
          >
            🚀 Start Generating
          </Link>
          <a
            href="https://instagram.com/taglet.in.official"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 border border-purple-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-50"
          >
            📸 Follow Us
          </a>
        </motion.div>
      </section>

      {/* === How It Works Section === */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-700">
          How Taglet Works ✨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white rounded-xl shadow p-6 border-2 border-purple-100">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2 text-purple-700">
              Upload an Image
            </h3>
            <p className="text-gray-600">
              Pick any photo from your gallery or camera roll.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-pink-100">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-pink-600">
              AI Does Its Magic
            </h3>
            <p className="text-gray-600">
              GPT-4 Vision reads your image and crafts the perfect caption vibe.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-blue-100">
            <div className="text-4xl mb-4">📣</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Get Captions + Tags
            </h3>
            <p className="text-gray-600">
              Copy or save your custom caption & hashtags in one tap.
            </p>
          </div>
        </div>
      </section>

      {/* === Preview Section === */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            🔥 Sample Captions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {samples.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden shadow-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50"
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 text-left">
                  <p className="text-gray-800 italic mb-2">"{item.caption}"</p>
                  <p className="text-sm text-purple-700">
                    #vibes #captionmagic #taglet #aiinstagram #aestheticfeed
                    #genzenergy #viralpost #instagoals
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="text-center py-10 text-sm text-gray-500">
        Built with 💜 by Team Taglet ·
        <a
          href="https://taglet.in"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 underline"
        >
          taglet.in
        </a>
        <div className="mt-2">
          📬 For any issues, email us at{" "}
          <a
            href="mailto:support@taglet.in"
            className="text-purple-600 underline"
          >
            support@taglet.in
          </a>
        </div>
      </footer>
    </div>
  );
}
