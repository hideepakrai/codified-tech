"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { PiDrone } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { GrShieldSecurity } from "react-icons/gr";

const RealEstate = () => {
    return (
        <div className="bg-white text-gray-800">

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[90vh] flex items-center text-white overflow-hidden">

                <Image
                    src="/Image/proptech.jpg"   // public/Image me image add karna
                    alt="Real Estate and PropTech Platform"
                    fill
                    priority
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/90 via-[#0b1220]/60 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-2xl">

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            Powering The Future Of <br />
                            <span className="text-[#4facfe]">
                                Real Estate & PropTech Innovation
                            </span>
                        </h1>

                        <p className="text-gray-200 text-lg md:text-xl mb-10">
                            Smart property platforms, AI-driven valuations,
                            digital property management systems and secure
                            real estate marketplaces built for modern investors
                            and developers.
                        </p>

                        <Link
                            href="/contact-us"
                            className="inline-block bg-[#4facfe] px-8 py-3 rounded-md font-semibold 
                            hover:bg-white hover:text-black transition duration-300"
                        >
                            Get Real Estate Consultation
                        </Link>

                    </div>
                </div>
            </section>

            {/* ================= PROPTECH SERVICES ================= */}
            <section className="py-28 max-w-7xl px-6 bg-gradient-to-b from-gray-50 to-white mx-auto">
                <div className="max-w-7xl mx-auto text-center mb-14">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Intelligent Digital Solutions For Real Estate
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Delivering scalable, data-driven and customer-centric
                        property technology platforms for agencies,
                        developers and investors.
                    </p>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Property Listing Platforms",
                            icon: <AiOutlineHome />,
                            desc: "Modern real estate portals with advanced search and smart filtering.",
                        },
                        {
                            title: "CRM For Real Estate Agencies",
                            icon: <MdOutlineRealEstateAgent />,
                            desc: "Lead management, client tracking and automated communication systems.",
                        },
                        {
                            title: "Property Management Systems",
                            icon: <FaBuilding />,
                            desc: "Rental tracking, maintenance scheduling and tenant management solutions.",
                        },
                        {
                            title: "Virtual Tours & Drone Integration",
                            icon: <PiDrone />,
                            desc: "Immersive 3D walkthroughs and aerial property visualization tools.",
                        },
                        {
                            title: "Market Analytics & Valuation Tools",
                            icon: <VscGraph />,
                            desc: "AI-powered pricing insights and real-time property market analysis.",
                        },
                        {
                            title: "Secure Transaction Systems",
                            icon: <GrShieldSecurity />,
                            desc: "Digitally secure documentation, contracts and payment processing.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="relative p-8 rounded-2xl bg-white shadow-lg border border-gray-200
                            transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="text-4xl mb-5 text-[#4facfe]">{item.icon}</div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 text-md">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= REAL ESTATE INFRASTRUCTURE ================= */}
            <section className="bg-[#0d1525] text-white py-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

                    <div>
                        <span className="text-[#4facfe] font-semibold tracking-wider uppercase text-sm">
                            Property Technology Infrastructure
                        </span>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight">
                            Scalable & Intelligent <br />
                            Real Estate Ecosystems
                        </h2>

                        <p className="text-gray-400 mb-10 max-w-lg">
                            Cloud-native PropTech systems engineered for
                            automation, transparency and seamless property
                            transactions.
                        </p>

                        <div className="space-y-6">
                            {[
                                "AI-based property recommendations",
                                "Integrated MLS & CRM systems",
                                "Automated documentation workflows",
                                "End-to-end secure digital transactions"
                            ].map((point, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4facfe]/20 text-[#4facfe]">
                                        ✓
                                    </div>
                                    <p className="text-gray-300">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#4facfe] to-purple-500 opacity-20 blur-3xl rounded-3xl"></div>

                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
                            <h3 className="text-2xl font-semibold mb-8">
                                Why Real Estate Companies Choose Us
                            </h3>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">14+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Years Experience</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">400+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Property Projects</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">800K+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Listings Managed</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">24/7</h4>
                                    <p className="text-gray-400 text-sm mt-2">Technical Support</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>


            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Strategic Real Estate & PropTech Delivery Process
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A data-driven, technology-enabled development approach
                            designed to build scalable and high-performance real estate platforms.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-10 relative">

                        {[
                            {
                                step: "01",
                                title: "Market & Property Discovery",
                                desc: "We analyze property portfolios, target buyers, investor goals and regional market trends to define a strategic digital roadmap."
                            },
                            {
                                step: "02",
                                title: "Platform Architecture & UX Strategy",
                                desc: "We design scalable property listing platforms with advanced search filters, CRM integrations and seamless user journeys."
                            },
                            {
                                step: "03",
                                title: "Agile PropTech Development",
                                desc: "Our team builds real estate portals, brokerage systems, property management tools and mobile apps using agile methodology."
                            },
                            {
                                step: "04",
                                title: "Testing, Security & Deployment",
                                desc: "We conduct performance testing, data security validation and system optimization before secure cloud deployment."
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

export default RealEstate