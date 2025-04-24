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
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Scroll to top

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slideshow

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
      {/* Preview Slideshow Section */}
      <section className="px-6 py-20 bg-white text-center z-10 relative">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-purple-600">
          See Taglet in Action
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              img: "https://picsum.photos/id/57/800/600",
              caption: "“Vibes on point with this rooftop glow! ☀️”",
              hashtags: "#rooftop #vibes #citylife #goldenhour #tagletmagic",
            },
            {
              img: "https://picsum.photos/id/64/800/600",
              caption: "“Caught in candid — effortless and epic ✨”",
              hashtags:
                "#candidmoment #reelitfeelit #trendingnow #aiassist #taglet",
            },
            {
              img: "https://picsum.photos/id/103/800/600",
              caption: "“Summer state of mind. Just me & the sun 🌞”",
              hashtags: "#summervibes #meandmysun #captiongoals #socialboost",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-5 rounded-xl shadow-lg border"
            >
              <img
                src={item.img}
                alt="Preview"
                className="rounded-lg mb-4 h-52 object-cover w-full shadow"
              />
              <p className="italic text-gray-800 font-medium text-sm">
                {item.caption}
              </p>
              <div className="mt-2 text-purple-600 text-xs font-semibold break-words leading-relaxed">
                {item.hashtags}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white px-6 py-20 text-center relative z-10">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-purple-700 mb-10"
        >
          What Creators Are Saying ✨
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              text: "“Taglet is my go-to for reels. It always nails the vibe I'm aiming for!”",
              user: "reelqueen",
              handle: "@vibewithria",
              avatar: "https://i.pravatar.cc/100?img=12",
            },
            {
              text: "“Saved me hours of caption writing — and my posts are finally getting noticed.”",
              user: "brandboosted",
              handle: "@adsbymia",
              avatar: "https://i.pravatar.cc/100?img=15",
            },
            {
              text: "“The hashtags are 🔥. My engagement literally doubled since I started using Taglet.”",
              user: "creatorhub",
              handle: "@creatorx",
              avatar: "https://i.pravatar.cc/100?img=19",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 rounded-xl shadow-md border"
            >
              <p className="text-sm text-gray-700 italic leading-relaxed mb-4">
                {item.text}
              </p>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={item.avatar}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.user}
                  </p>
                  <p className="text-xs text-gray-500">{item.handle}</p>
                </div>
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
      {/* Features Section */}
      <section className="bg-purple-50 py-20 px-6 relative z-10">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-purple-700 text-center mb-12"
        >
          Why You'll Love Taglet 💜
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "🧠",
              title: "AI-Powered Captions",
              desc: "Smart and trendy captions tailored to your image mood, powered by OpenAI.",
            },
            {
              icon: "🏷️",
              title: "20+ Viral Hashtags",
              desc: "Boost your reach with automatically generated hashtag sets.",
            },
            {
              icon: "⚡",
              title: "Fast & Effortless",
              desc: "Generate captions in seconds — save time and post confidently.",
            },
            {
              icon: "📸",
              title: "Image-Driven Magic",
              desc: "Just upload your image — we’ll do the rest. No typing needed.",
            },
            {
              icon: "📈",
              title: "Engagement Booster",
              desc: "Higher-quality content means better reactions, shares, and followers.",
            },
            {
              icon: "🛠️",
              title: "Made for Creators",
              desc: "From influencers to brands, Taglet fits any content workflow.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-purple-700 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-8 px-4 bg-white border-t relative z-10">
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
          {/* 
          <p>
            💬{" "}
            <Link
              to="/feedback"
              className="text-purple-600 font-medium hover:underline"
            >
              Give Feedback
            </Link>
          </p> */}

          <div className="flex justify-center gap-4 text-xs text-gray-500 mt-4">
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact US
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            © {new Date().getFullYear()}{" "}
            <span className="text-purple-500 font-semibold">Taglet</span>. All
            rights reserved.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTopBtn && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold hover:shadow-xl transition"
        >
          ⬆ Back to Top
        </motion.button>
      )}
    </div>
  );
}
