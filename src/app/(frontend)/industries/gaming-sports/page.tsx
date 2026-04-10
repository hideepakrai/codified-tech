"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

const GamingSports = () => {
    return (
        <div className="bg-white text-gray-800">

            {/* ================= HERO SECTION ================= */}
            {/* ================= HERO SECTION (UPDATED) ================= */}
            <section className="relative h-[90vh] flex items-center text-white overflow-hidden">

                {/* Background Image */}
                <Image
                    src="/Gaming.png"
                    alt="AI Sports Analytics Stadium"
                    fill
                    priority
                    className="object-cover object-center"
                />

                {/* Light Overlay for better visibility (LESS DARK) */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Subtle Gradient (Left side darker, right clear) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/80 via-[#0b1220]/40 to-transparent"></div>

                {/* Content Wrapper */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                    <div className="max-w-2xl">

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            Building The Future Of <br />
                            <span className="text-[#4facfe]">
                                Gaming & Sports Technology
                            </span>
                        </h1>

                        <p className="text-gray-200 text-lg md:text-xl mb-10">
                            Scalable fantasy platforms, esports ecosystems, real-time analytics
                            and immersive digital experiences engineered for performance,
                            security and global scalability.
                        </p>

                        <Link
                            href="/contact-us"
                            className="inline-block bg-[#4facfe] px-8 py-3 rounded-md font-semibold 
        hover:bg-white hover:text-black transition duration-300"
                        >
                            Explore Solutions
                        </Link>

                    </div>
                </div>
            </section>




            {/* ================= ENTERPRISE CAPABILITIES GRID ================= */}
            {/* ================= ENTERPRISE CAPABILITIES GRID (FIXED 2x2) ================= */}
            <section className="bg-black text-white py-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 border border-white/10">

                    {/* Card 1 */}
                    <div className="group p-14 border-b border-r border-white/10 
                    transition-all duration-500 hover:bg-[#2563eb] cursor-pointer">

                        <div className="mb-8 w-14 h-14 border border-white/30 rounded-full 
                      flex items-center justify-center
                      transition-all duration-500 group-hover:border-white">
                            ⚙
                        </div>

                        <h3 className="text-2xl font-medium leading-snug">
                            Building scalable gaming platforms on secure cloud-native
                            microservices architecture
                        </h3>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-14 border-b border-white/10 
                    transition-all duration-500 hover:bg-[#2563eb] cursor-pointer">

                        <div className="mb-8 w-14 h-14 border border-white/30 rounded-full 
                      flex items-center justify-center
                      transition-all duration-500 group-hover:border-white">
                            🤖
                        </div>

                        <h3 className="text-2xl font-medium leading-snug">
                            Integrating real-time AI analytics, telemetry systems
                            and fraud detection engines
                        </h3>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-14 border-r border-white/10 
                    transition-all duration-500 hover:bg-[#2563eb] cursor-pointer">

                        <div className="mb-8 w-14 h-14 border border-white/30 rounded-full 
                      flex items-center justify-center
                      transition-all duration-500 group-hover:border-white">
                            🔒
                        </div>

                        <h3 className="text-2xl font-medium leading-snug">
                            Implementing advanced security layers including encryption,
                            MFA, biometric verification and wallet protection
                        </h3>
                    </div>

                    {/* Card 4 */}
                    <div className="group p-14 
                    transition-all duration-500 hover:bg-[#2563eb] cursor-pointer">

                        <div className="mb-8 w-14 h-14 border border-white/30 rounded-full 
                      flex items-center justify-center
                      transition-all duration-500 group-hover:border-white">
                            ✔
                        </div>

                        <h3 className="text-2xl font-medium leading-snug">
                            Ensuring compliance with global gaming regulations,
                            payment security standards and data protection policies
                        </h3>
                    </div>

                </div>
            </section>


            {/* ================= SERVICES SECTION (CLEAN WHITE PREMIUM) ================= */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Gaming & Sports Development Services
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Scalable, secure and performance-driven solutions tailored for
                            modern gaming and sports ecosystems.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-3 gap-8">

                        {[
                            { title: "Fantasy Sports Platform Development", icon: "🎮" },
                            { title: "Multiplayer Game Development", icon: "🕹" },
                            { title: "Esports Tournament Management", icon: "🏆" },
                            { title: "Real-Time Analytics Systems", icon: "📊" },
                            { title: "Secure Wallet & Payment Integration", icon: "💳" },
                            { title: "Cloud Infrastructure & DevOps", icon: "☁" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group p-8 border border-gray-200 rounded-xl 
          bg-white transition-all duration-300 
          hover:shadow-lg hover:-translate-y-1"
                            >

                                {/* Icon */}
                                <div className="w-12 h-12 mb-6 flex items-center justify-center 
          rounded-lg bg-gray-100 text-xl 
          transition-colors duration-300 
          group-hover:bg-blue-600 group-hover:text-white">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 
          group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    High-performance architecture with scalable backend systems
                                    and secure infrastructure for enterprise gaming platforms.
                                </p>

                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= TRUSTED BY TECHNOLOGIES ================= */}
            <section className="bg-[#0d1525] text-white py-24 px-6 overflow-hidden">

                <div className="max-w-7xl mx-auto text-center">

                    <h2 className="text-4xl font-bold mb-4">
                        Trusted by Top Technologies
                    </h2>

                    <p className="text-gray-300 mb-16">
                        We are trusted by leading technologies and enterprises across the globe.
                    </p>

                    {/* Infinite Scroll Wrapper */}
                    <div className="relative w-full overflow-hidden">
                        <div className="flex gap-10 animate-scroll min-w-max">

                            {[
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
                                "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",

                                // duplicate for infinite effect
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
                                "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
                                "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    className="w-36 h-24 bg-white rounded-xl flex items-center justify-center shrink-0"
                                >
                                    <img
                                        src={src}
                                        alt="tech logo"
                                        className="w-14 h-14 object-contain"
                                    />
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mt-20">
                        {[
                            { number: "5000+", label: "Happy Clients" },
                            { number: "50+", label: "Team Members" },
                            { number: "15+", label: "Years Experience" },
                            { number: "1000+", label: "Projects Completed" },
                            { number: "24/7", label: "Support" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-[#10203a] border border-white/10 rounded-xl p-6 text-left hover:bg-[#13284d] transition-colors"
                            >
                                <h3 className="text-3xl font-bold mb-1">{item.number}</h3>
                                <p className="text-gray-300">{item.label}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ================= CTA ================= */}
            {/* <section className="py-20 bg-[#4facfe] text-center text-white">
                <h2 className="text-3xl font-bold mb-6">
                    Ready To Build Your Gaming Platform?
                </h2>
                <button className="bg-[#0b1220] px-10 py-4 rounded-md font-semibold hover:opacity-90 transition">
                    Get Free Consultation
                </button>
            </section> */}

        </div>
    )
}

export default GamingSports