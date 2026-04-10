"use client"

import React from "react"
import Image from "next/image"

const GamingSports = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* ================= HERO — Industry Header ================= */}
      <section className="bg-gradient-to-r from-[#071326] to-[#0c1f3f] text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Gaming & Sports Technology Solutions
        </h1>
        <p className="max-w-2xl mx-auto text-gray-200">
          Custom built gaming platforms, fantasy sports systems, esports ecosystems,
          real-time data analytics, and immersive fan engagement solutions.
        </p>
      </section>


      {/* ================= SERVICES LIST ================= */}
      <section className="py-12 px-6 max-w-6xl mx-auto text-center">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2 text-[#4facfe]">
              Game Platforms
            </h3>
            <p className="text-sm text-gray-600">
              Multiplayer games & platform engines for web, mobile & console.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2 text-[#4facfe]">
              Fantasy Sports
            </h3>
            <p className="text-sm text-gray-600">
              Scalable leagues with live APIs, leaderboards and secure wallets.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2 text-[#4facfe]">
              Esports & Streaming
            </h3>
            <p className="text-sm text-gray-600">
              Tournament management, streaming tools & fan engagement systems.
            </p>
          </div>
        </div>
      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 bg-[#0f172a] text-white px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Why Choose Our Gaming & Sports Tech?
        </h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <p>✔ Scalable cloud-native backends</p>
          <p>✔ Real-time data & AI insights</p>
          <p>✔ Secure payments & wallet systems</p>
          <p>✔ Cross-platform systems</p>
          <p>✔ High performance multiplayer</p>
          <p>✔ Immersive UX for gamers</p>
          <p>✔ Rapid deployment & DevOps</p>
          <p>✔ 24×7 support & monitoring</p>
        </div>
      </section>


      {/* ================= TRUSTED TECHNOLOGIES ================= */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-xl font-bold mb-6">
          Trusted by Leading Technologies
        </h2>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {[
            "/tech/react.svg",
            "/tech/nextjs.svg",
            "/tech/nodejs.svg",
            "/tech/mongodb.svg",
            "/tech/aws.svg",
            "/tech/socketio.svg"
          ].map((src, i) => (
            <Image key={i} src={src} alt="Tech Logo" width={80} height={40} />
          ))}
        </div>
      </section>


      {/* ================= OUR STRATEGY ================= */}
      <section className="py-20 px-6 bg-[#071326] text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Strategy for Scalable Gaming & Sports Tech
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 mb-8">
          We build secure, high-performance, and scalable platforms tailored
          to your audience – from gamers to sports fans. Our engineering
          methodology focuses on efficiency, real-time data, automation,
          and premium UX.
        </p>
      </section>


      {/* ================= FEATURE SOLUTIONS ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Gaming & Sports Technology Solutions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Example Feature Card */}
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#4facfe]">
              Telemetry & Real-Time Analytics
            </h3>
            <p className="text-gray-600 text-sm">
              AI driven dashboards and real-time analytics for player
              performance and platform tracking.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#4facfe]">
              Fantasy Sports Engines
            </h3>
            <p className="text-gray-600 text-sm">
              Leaderboards, match prediction, live scoring & player stats.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#4facfe]">
              Esports Management Systems
            </h3>
            <p className="text-gray-600 text-sm">
              Complete ecosystem for tournaments, fixtures, and streaming.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#4facfe]">
              Cloud-Native Architecture
            </h3>
            <p className="text-gray-600 text-sm">
              Elastic scaling, high availability, and global delivery.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#4facfe]">
              Secure Payments & Wallets
            </h3>
            <p className="text-gray-600 text-sm">
              PCI-ready payments, multi-currency wallets & payout systems.
            </p>
          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="py-20 bg-[#4facfe] text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Gaming Platform?
        </h2>
        <button className="px-8 py-3 bg-[#071326] rounded-full font-semibold hover:opacity-80 transition">
          Book Free Consultation
        </button>
      </section>

    </div>
  )
}

export default GamingSports
