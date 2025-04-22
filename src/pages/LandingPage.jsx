import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const slideshowImages = [
  "https://picsum.photos/seed/1/800/600",
  "https://picsum.photos/id/57/800/600",
  "https://picsum.photos/id/64/800/600",
  "https://picsum.photos/id/65/800/600",
  "https://picsum.photos/id/103/800/600",
  "https://picsum.photos/seed/1/800/600",
];

export default function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800 overflow-hidden">
      {/* Floating Animated Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30 top-[-8rem] left-[-6rem] z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-pink-300 rounded-full filter blur-3xl opacity-30 bottom-[-6rem] right-[-6rem] z-0"
        animate={{ scale: [1, 0.9, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Hero Section */}
      <header className="text-center px-6 py-24 md:py-32 relative z-10">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold text-purple-800 drop-shadow-lg"
        >
          Captions that Click. Hashtags that Stick.
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-5 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
        >
          Taglet turns your images into viral-worthy content with AI-powered
          captions and 20+ smart hashtags in seconds.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/login"
            className="mt-10 inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            🚀 Try Taglet Now
          </Link>
        </motion.div>
      </header>

      {/* Preview Slideshow Section */}
      <section className="px-6 py-20 bg-white text-center z-10 relative">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-purple-600">
          See Taglet in Action
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-5 rounded-xl shadow-lg border"
            >
              <img
                src={slideshowImages[i % slideshowImages.length]}
                alt="Preview"
                className="rounded-lg mb-4 h-52 object-cover w-full shadow"
              />
              <p className="italic text-gray-800 font-medium text-sm">
                “Looking fresh and flawless with Taglet 🧃✨”
              </p>
              <div className="mt-2 text-purple-600 text-xs font-semibold break-words leading-relaxed">
                #aesthetic #captionmagic #reelitfeelit #viralvibes #foryou
                #instastyle
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="text-center px-6 py-20 bg-purple-50 z-10 relative">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-purple-700 mb-4"
        >
          Why Creators Use Taglet
        </motion.h3>
        <p className="max-w-2xl mx-auto text-gray-700 text-base md:text-lg">
          Whether you're a content creator, influencer, or brand — Taglet saves
          hours of writing and boosts your reach with captions tailored to your
          audience and aesthetic. Built to make your posts pop.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-10 px-4 bg-white border-t relative z-10">
        <div className="space-y-3">
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
              Send Feedback
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
