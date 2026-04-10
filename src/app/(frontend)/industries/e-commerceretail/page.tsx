"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineStorefront } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { PiRobot } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { GrShieldSecurity } from "react-icons/gr";

const EcommerceRetail = () => {
    return (
        <div className="bg-white text-gray-800">

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[90vh] flex items-center text-white overflow-hidden">

                <Image
                    src="/Image/ecommerce.jpg"
                    alt="Ecommerce and Retail Technology Platform"
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
                                E-Commerce & Retail Innovation
                            </span>
                        </h1>

                        <p className="text-gray-200 text-lg md:text-xl mb-10">
                            Scalable, secure and AI-driven commerce platforms including
                            omnichannel storefronts, intelligent inventory systems,
                            seamless payment integrations and data-powered retail ecosystems.
                        </p>

                        <Link
                            href="/contact-us"
                            className="inline-block bg-[#4facfe] px-8 py-3 rounded-md font-semibold 
                            hover:bg-white hover:text-black transition duration-300"
                        >
                            Get E-Commerce Consultation
                        </Link>

                    </div>
                </div>
            </section>

            {/* ================= ECOMMERCE SERVICES ================= */}
            <section className="py-28 max-w-7xl px-6 bg-gradient-to-b from-gray-50 to-white mx-auto">
                <div className="max-w-7xl mx-auto text-center mb-14">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Advanced Commerce Solutions For Modern Retail
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Delivering seamless shopping experiences through intelligent,
                        scalable and customer-first digital commerce systems.
                    </p>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Custom E-Commerce Platforms",
                            icon: <AiOutlineShoppingCart />,
                            desc: "High-performance online stores with scalable architecture and secure checkout.",
                        },
                        {
                            title: "Omnichannel Retail Systems",
                            icon: <MdOutlineStorefront />,
                            desc: "Unified commerce across web, mobile, marketplaces and physical stores.",
                        },
                        {
                            title: "Order & Logistics Management",
                            icon: <FaTruck />,
                            desc: "Smart fulfillment systems with inventory and shipment tracking automation.",
                        },
                        {
                            title: "AI-Powered Personalization",
                            icon: <PiRobot />,
                            desc: "Product recommendations and predictive analytics to increase conversions.",
                        },
                        {
                            title: "Retail Analytics Dashboards",
                            icon: <VscGraph />,
                            desc: "Real-time sales insights, performance tracking and revenue forecasting.",
                        },
                        {
                            title: "Secure Payment Integrations",
                            icon: <GrShieldSecurity />,
                            desc: "PCI-compliant payment gateways with fraud detection and encryption.",
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


            {/* ================= RETAIL INFRASTRUCTURE ================= */}
            <section className="bg-[#0d1525] text-white py-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

                    <div>
                        <span className="text-[#4facfe] font-semibold tracking-wider uppercase text-sm">
                            Commerce Infrastructure
                        </span>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight">
                            Scalable & Intelligent <br />
                            Retail Architecture
                        </h2>

                        <p className="text-gray-400 mb-10 max-w-lg">
                            Cloud-native commerce ecosystems engineered for speed,
                            personalization and seamless omnichannel customer experiences.
                        </p>

                        <div className="space-y-6">

                            {[
                                "Cloud-based scalable commerce infrastructure",
                                "Integrated CRM & ERP connectivity",
                                "AI-driven recommendation engines",
                                "End-to-end secure transaction processing"
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
                                Why Retail Brands Choose Us
                            </h3>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">15+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Years Experience</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">500+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Commerce Projects</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-[#4facfe]">1M+</h4>
                                    <p className="text-gray-400 text-sm mt-2">Transactions Processed</p>
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

            {/* ================= STRATEGIC DELIVERY PROCESS (HEALTHTECH VERSION) ================= */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Strategic Ecommerce & Retail Delivery Process
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A performance-driven, customer-centric development approach
                            designed to build scalable and conversion-focused ecommerce ecosystems.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-10 relative">

                        {[
                            {
                                step: "01",
                                title: "Business & Market Discovery",
                                desc: "We analyze your target audience, product strategy, competitors and sales channels to define a high-impact ecommerce roadmap."
                            },
                            {
                                step: "02",
                                title: "Commerce Architecture & UX Strategy",
                                desc: "We design scalable ecommerce architecture with seamless navigation, secure payment integration and optimized user journeys."
                            },
                            {
                                step: "03",
                                title: "Agile Store Development",
                                desc: "Our team builds high-performance online stores, marketplace platforms and mobile commerce solutions using agile methodology."
                            },
                            {
                                step: "04",
                                title: "Testing, Optimization & Launch",
                                desc: "We conduct performance testing, payment gateway validation and conversion optimization before secure deployment."
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

export default EcommerceRetail