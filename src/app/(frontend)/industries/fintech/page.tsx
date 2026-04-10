"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineBank } from "react-icons/ai";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { PiRobot } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { GrShieldSecurity } from "react-icons/gr";

const Fintech = () => {
    return (
        <div className="bg-white text-gray-800">

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[90vh] flex items-center text-white overflow-hidden">

                <Image
                    src="/Image/fintech4.jpg"
                    alt="Fintech Digital Banking Platform"
                    fill
                    priority
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/90 via-[#0b1220]/60 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-2xl">

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            Transforming The Future Of <br />
                            <span className="text-[#4facfe]">
                                Financial Technology
                            </span>
                        </h1>

                        <p className="text-gray-200 text-lg md:text-xl mb-10">
                            Secure digital banking platforms, payment gateways,
                            AI-powered financial analytics and scalable fintech
                            ecosystems built for performance, compliance and growth.
                        </p>

                        <Link
                            href="/contact-us"
                            className="inline-block bg-[#4facfe] px-8 py-3 rounded-md font-semibold 
              hover:bg-white hover:text-black transition duration-300"
                        >
                            Get Fintech Consultation
                        </Link>

                    </div>
                </div>
            </section>

            {/* ================= FINTECH SERVICES ================= */}
            <section className="py-28 max-w-7xl  px-6 bg-gradient-to-b from-gray-50 to-white mx-auto">
                <div className="max-w-7xl mx-auto text-center mb-14">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Fintech Solutions Designed for Tomorrow
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Empower your business with seamless, intelligent, and secure fintech
                        services built for the digital age.
                    </p>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Digital Banking Portals",
                            icon: <AiOutlineBank />,
                            desc: "Cutting-edge banking apps & portals for customer-first experience.",
                        },
                        {
                            title: "Payment & Wallet Systems",
                            icon: <MdOutlineAccountBalanceWallet />,
                            desc: "Fast, secure & PCI compliant payment engines with wallet support.",
                        },
                        {
                            title: "Blockchain & DeFi Platforms",
                            icon: <FaLink />,
                            desc: "Smart contracts, crypto gateways & decentralized solutions.",
                        },
                        {
                            title: "AI Risk & Fraud Insights",
                            icon: <PiRobot />,
                            desc: "Real-time threat detection using machine learning & analytics.",
                        },
                        {
                            title: "Investment & Trading UI/UX",
                            icon: <VscGraph />,
                            desc: "Smooth trading dashboards with live market feed integrations.",
                        },
                        {
                            title: "RegTech & Compliance Tools",
                            icon: <GrShieldSecurity />,
                            desc: "Automated compliance, reporting & audit-ready workflows.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="relative p-8 rounded-2xl bg-white shadow-lg border border-gray-200
          transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500
            opacity-0 group-hover:opacity-25 rounded-2xl transition duration-500"
                            ></div>

                            <div className="text-4xl mb-5">{item.icon}</div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 text-md">{item.desc}</p>

                            {/* <div className="mt-4 text-blue-600 font-semibold">
                                    Learn More &rarr;
                                </div> */}
                        </div>
                    ))}
                </div>
            </section>


            {/* ================= FINTECH SOLUTIONS OVERVIEW ================= */}
            <section className="bg-[#0d1525] text-white py-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <span className="text-[#4facfe] font-semibold tracking-wider uppercase text-sm">
                            Enterprise Infrastructure
                        </span>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight">
                            Secure & Scalable <br />
                            Fintech Architecture
                        </h2>

                        <p className="text-gray-400 mb-10 max-w-lg">
                            Cloud-native systems engineered for compliance, real-time
                            transaction processing and AI-driven financial intelligence.
                        </p>

                        <div className="space-y-6">

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4facfe]/20 text-[#4facfe]">
                                    ✓
                                </div>
                                <p className="text-gray-300">
                                    Cloud-native core banking infrastructure
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4facfe]/20 text-[#4facfe]">
                                    ✓
                                </div>
                                <p className="text-gray-300">
                                    PCI-DSS compliant payment ecosystems
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4facfe]/20 text-[#4facfe]">
                                    ✓
                                </div>
                                <p className="text-gray-300">
                                    AI-powered fraud detection & risk scoring
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4facfe]/20 text-[#4facfe]">
                                    ✓
                                </div>
                                <p className="text-gray-300">
                                    End-to-end encrypted digital transactions
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDE CARD */}
                    <div className="relative">

                        <div className="absolute inset-0 bg-gradient-to-tr from-[#4facfe] to-purple-500 opacity-20 blur-3xl rounded-3xl"></div>

                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">

                            <h3 className="text-2xl font-semibold mb-8">
                                Why Financial Institutions Trust Us
                            </h3>

                            <div className="grid grid-cols-2 gap-8">

                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">15+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Years Experience</p>
                                </div>

                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">100%</h4>
                                    <p className="text-gray-400 text-sm mt-2">Compliance Focus</p>
                                </div>

                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">1M+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Users Supported</p>
                                </div>

                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">24/7</h4>
                                    <p className="text-gray-400 text-sm mt-2">Security Monitoring</p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>


            {/* ================= FINTECH SERVICES ================= */}
            {/* <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Fintech Development Services
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Secure, scalable and regulatory-compliant financial
                            technology solutions engineered for global markets.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        {[
                            { title: "Digital Banking Solutions", icon: "🏦" },
                            { title: "Payment Gateway Development", icon: "💳" },
                            { title: "Digital Wallet & UPI Systems", icon: "📲" },
                            { title: "Blockchain & Crypto Platforms", icon: "⛓" },
                            { title: "AI-Based Fraud Detection", icon: "🤖" },
                            { title: "Investment & Trading Platforms", icon: "📈" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group p-8 border border-gray-200 rounded-xl 
                bg-white transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1"
                            >

                                <div className="w-12 h-12 mb-6 flex items-center justify-center 
                rounded-lg bg-gray-100 text-xl 
                transition-colors duration-300 
                group-hover:bg-blue-600 group-hover:text-white">
                                    {item.icon}
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-3 
                group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Robust backend systems, real-time transaction
                                    processing and advanced security protocols
                                    built for financial scalability.
                                </p>

                            </div>
                        ))}

                    </div>
                </div>
            </section> */}

            {/* ================= OUR SIMPLE 4-STEP PROCESS ================= */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Strategic Delivery Process
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A streamlined, transparent approach designed to deliver secure
                            and high-performance fintech solutions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-10 relative">

                        {[
                            {
                                step: "01",
                                title: "Discovery",
                                desc: "We listen to your goals and deeply analyze your business requirements, compliance needs and financial workflows."
                            },
                            {
                                step: "02",
                                title: "Strategic Design",
                                desc: "We craft a technical blueprint focused on security, speed, scalability and intuitive user experience."
                            },
                            {
                                step: "03",
                                title: "Agile Development",
                                desc: "Our team builds your product in structured phases, keeping you informed and involved at every milestone."
                            },
                            {
                                step: "04",
                                title: "Testing & Launch",
                                desc: "We conduct rigorous QA and security audits before launching your platform with 100% reliability."
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-xl border border-gray-200 
                    hover:shadow-xl transition duration-300"
                            >

                                <div className="text-[#4facfe] text-4xl font-bold mb-4">
                                    {item.step}
                                </div>

                                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>

                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* ================= TRUSTED TECHNOLOGIES (UNCHANGED) ================= */}
            <section className="bg-[#0d1525] text-white py-24 px-6 overflow-hidden">

                <div className="max-w-7xl mx-auto text-center">

                    <h2 className="text-4xl font-bold mb-4">
                        Our Technology Stack
                    </h2>

                    <p className="text-gray-300 mb-16">
                        Built on reliable, future-ready technologies to ensure performance and security .
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
                            { number: "500+", label: "Happy Clients" },
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

        </div>
    )
}

export default Fintech