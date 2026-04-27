import React from "react";

const GamingSports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071326] via-[#0c1f3f] to-[#0a1224] text-white">

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4facfe] to-[#9b5cff] bg-clip-text text-transparent mb-6">
          Gaming & Sports Technology Solutions
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300">
          We build high-performance gaming platforms and sports tech ecosystems powered by AI,
          real-time analytics, and immersive digital experiences. From fantasy leagues to esports platforms,
          we engineer scalable solutions that engage and monetize audiences.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold text-[#4facfe] mb-3">Game Development</h3>
            <p className="text-gray-300 text-sm">
              Custom 2D/3D game development for mobile, web, and console platforms with immersive UI/UX
              and real-time multiplayer capabilities.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold text-[#4facfe] mb-3">Fantasy Sports Platforms</h3>
            <p className="text-gray-300 text-sm">
              Scalable fantasy league systems with live APIs, wallet integration, leaderboards,
              and secure payment gateways.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold text-[#4facfe] mb-3">Real-Time Analytics</h3>
            <p className="text-gray-300 text-sm">
              AI-powered dashboards for performance tracking, predictive insights,
              and real-time sports data visualization.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold text-[#4facfe] mb-3">Esports & Streaming</h3>
            <p className="text-gray-300 text-sm">
              Complete esports ecosystem development including tournament management,
              live streaming integrations, and fan engagement tools.
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4facfe] to-[#9b5cff] bg-clip-text text-transparent mb-10">
          Why Choose Our Gaming & Sports Solutions?
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-left text-gray-300">
          <p>✔ Scalable Cloud Architecture</p>
          <p>✔ AI & Machine Learning Integration</p>
          <p>✔ Secure Payment & Wallet Systems</p>
          <p>✔ Cross-Platform Compatibility</p>
          <p>✔ High-Speed Real-Time Data Processing</p>
          <p>✔ Seamless UI/UX for Gamers & Fans</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Build the Next Big Gaming Platform?
        </h2>

        <button
          onClick={() => alert("Thank you! Our team will contact you soon.")}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4facfe] to-[#9b5cff] font-semibold hover:opacity-80 transition duration-300"
        >
          Get Started
        </button>
      </section>

    </div>
  );
};

export default GamingSports;
