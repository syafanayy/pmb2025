"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const ContactPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [particles, setParticles] = useState([]);
  const [photoBubbles, setPhotoBubbles] = useState([]);

  useEffect(() => {
    // Simulate checking login status
    const checkLoginStatus = () => {
      // For demo, let's assume not logged in
      setIsLoggedIn(false);
    };

    // Create particles
    const createParticles = () => {
      const particleArray = [];
      for (let i = 0; i < 40; i++) {
        particleArray.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 8,
          duration: Math.random() * 4 + 4,
        });
      }
      setParticles(particleArray);
    };

    // Create photo bubbles with different images
    const createPhotoBubbles = () => {
      const bubbleArray = [];
      const photos = ["syafa.jpg", "syafa3.jpg", "syafa1.jpg", "syafa2.jpg", "syafa2.jpg"];

      for (let i = 0; i < 12; i++) {
        bubbleArray.push({
          id: i,
          left: Math.random() * 85 + 7.5, // 7.5% to 92.5% to avoid edges better
          top: Math.random() * 75 + 12.5, // 12.5% to 87.5% to avoid edges better
          delay: Math.random() * 8,
          duration: Math.random() * 10 + 15,
          size: Math.random() * 35 + 50, // 50px to 85px
          opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 - more visible
          photo: photos[i % photos.length], // Cycle through different photos
        });
      }
      setPhotoBubbles(bubbleArray);
    };

    checkLoginStatus();
    createParticles();
    createPhotoBubbles();
  }, []);

  const skills = {
    administrative: ["Data Management", "Office Administration", "Project Coordination", "Team Communication"],
    technical: ["Microsoft Office Suite", "Database Management", "Accounting Software", "Data Analysis"],
    organizational: ["Student Organization", "Public Relations", "Event Management", "Leadership"],
  };

  const features = [
    { icon: "📊", text: "Administrative Management" },
    { icon: "💼", text: "Data Processing & Analysis" },
    { icon: "👥", text: "Team Coordination" },
    { icon: "📈", text: "Project Management" },
  ];

  const personalInfo = [
    { icon: "👤", label: "Full Name", value: "Syafa Nur April Yanti" },
    { icon: "🎂", label: "Birth Date", value: "07 April 2005" },
    { icon: "#️⃣", label: "Student ID", value: "232302005" },
    { icon: "🎓", label: "Program Study", value: "D-III Komputerisasi Akuntansi" },
    { icon: "📚", label: "Semester", value: "4th Semester" },
    { icon: "🏢", label: "University", value: "Universitas Ma'soem" },
    { icon: "📍", label: "Location", value: "Bandung, Jawa Barat" },
    { icon: "✉️", label: "Email", value: "syafanuraprilyanti@gmail.com", isLink: true, href: "mailto:syafanurapril@gmail.com" },
    { icon: "📞", label: "Phone", value: "+62 853 4567 8901", isLink: true, href: "tel:+6285345678901" },
  ];

  const socialLinks = [
    { icon: "💼", title: "LinkedIn", href: "#" },
    { icon: "🐙", title: "GitHub", href: "#" },
    { icon: "📷", title: "Instagram", href: "#" },
    { icon: "✉️", title: "Email", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden font-inter">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-blue-400/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-radial from-emerald-300/10 via-transparent to-transparent"></div>
        {/* Animated constellation */}
        <div className="absolute top-16 left-16 w-1 h-1 bg-blue-300 rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-twinkle-delayed"></div>
        <div className="absolute top-48 left-1/4 w-1 h-1 bg-indigo-300 rounded-full animate-twinkle"></div>
        <div className="absolute bottom-48 right-1/3 w-1.5 h-1.5 bg-teal-300 rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-32 left-24 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle"></div>
        <div className="absolute top-1/2 right-16 w-1 h-1 bg-blue-400 rounded-full animate-twinkle-delayed"></div>
      </div>

      {/* Floating Photo Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {photoBubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full border-2 border-white/20 animate-float-bubble backdrop-blur-sm shadow-2xl"
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              opacity: bubble.opacity,
            }}
          >
            <img
              src="syafa2.jpg"
              alt="Syafa"
              className="w-full h-full object-cover rounded-full"
              style={{
                filter: "brightness(0.8) contrast(1.1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Elegant floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={particle.id}
            className={`absolute w-1.5 h-1.5 rounded-full animate-float ${
              index % 3 === 0 ? "bg-gradient-to-r from-blue-400 to-cyan-400 opacity-60" : index % 3 === 1 ? "bg-gradient-to-r from-emerald-400 to-teal-400 opacity-50" : "bg-gradient-to-r from-indigo-400 to-blue-400 opacity-40"
            }`}
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Refined navigation */}
      <nav className="relative z-10 bg-white/8 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-xl">✨</span>
              </div>
              <span className="text-white font-bold text-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-poppins tracking-wide">HYPEZONE</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/categories" className="text-white/90 hover:text-blue-300 transition-all duration-300 font-medium hover:scale-105 font-inter">
                Kategori
              </Link>
              <Link href="/deals" className="text-white/90 hover:text-cyan-300 transition-all duration-300 font-medium hover:scale-105 font-inter">
                Flash Sale
              </Link>
              <Link href="/promo" className="text-white/90 hover:text-teal-300 transition-all duration-300 font-medium hover:scale-105 font-inter">
                Promo
              </Link>
              <Link href="/contact" className="text-blue-300 font-medium relative font-inter">
                Contact
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </Link>
            </div>
            <Link href="/login" className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-inter">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with elegant animation */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="text-6xl animate-bounce-slow">👋</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-playfair">Meet The Student</h1>
            <p className="text-2xl text-white/70 font-light font-inter">Aspiring Administrative Professional ✨</p>
          </div>

          {/* Profile Container with sophisticated design */}
          <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-scale-in relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5 rounded-3xl blur-2xl"></div>

            {/* Profile Header with refined gradient */}
            <div className="bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 p-16 text-center relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>

              <div className="relative z-10">
                <div className="mb-12">
                  {/* Professional photo with elegant styling */}
                  <div className="w-64 h-64 bg-gradient-to-br from-white/15 via-blue-500/10 to-cyan-500/5 rounded-full border-2 border-white/20 shadow-2xl mx-auto hover:scale-105 transition-all duration-700 flex items-center justify-center relative overflow-hidden group">
                    <img src="syafa2.jpg" alt="Syafa Nur April Yanti" className="w-full h-full object-cover rounded-full" />

                    {/* Elegant hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    {/* Refined floating ring */}
                    <div className="absolute -inset-3 rounded-full border border-blue-400/30 animate-spin-slow"></div>
                  </div>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-xl font-playfair">Syafa Nur April Yanti</h1>
                <p className="text-2xl text-blue-200 font-light mb-2 font-inter">D-III Komputerisasi Akuntansi Student</p>
                <p className="text-lg text-blue-300 font-light mb-3 font-inter">Administrative & Data Management Specialist</p>
                <div className="flex justify-center items-center gap-3 text-white/60">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium font-inter">Active in Student Organizations</span>
                </div>
              </div>
            </div>

            {/* Content Grid with refined styling */}
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Personal Information & About */}
              <div className="p-12 bg-white/3 backdrop-blur-xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-transparent"></div>
                <div className="relative z-10">
                  {/* About Section */}
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-white mb-8 relative font-playfair">
                      About Me
                      <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-1 bg-white/40 rounded-full animate-pulse"></div>
                    </h2>

                    <div className="space-y-6 text-white/80 leading-relaxed font-inter">
                      <p className="text-lg">
                        Saya adalah mahasiswa semester 4 Universitas Ma'soem jurusan <span className="text-blue-300 font-semibold">D-III Komputerisasi Akuntansi</span>. Saya memiliki minat khusus dalam bidang{" "}
                        <span className="text-cyan-300 font-semibold">administrasi dan pengelolaan data</span>.
                      </p>
                      <p className="text-lg">
                        Meskipun dengan latar belakang pendidikan SMA jurusan IPA, saya menggabungkan keterampilan administratif dengan pengetahuan teknologi untuk menciptakan{" "}
                        <span className="text-teal-300 font-semibold">solusi yang efisien</span>.
                      </p>
                      <p className="text-lg">
                        Saya aktif dalam kegiatan organisasi kampus sebagai <span className="text-blue-300 font-semibold">humas himpunan mahasiswa</span>
                        yang memberikan saya pengalaman dalam <span className="text-cyan-300 font-semibold">koordinasi tim dan manajemen proyek</span>.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-4xl font-bold text-white mb-12 relative font-playfair">
                    Personal Information
                    <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-10 h-1 bg-white/40 rounded-full animate-pulse"></div>
                  </h2>

                  <div className="space-y-5">
                    {personalInfo.map((info, index) => (
                      <div key={index} className="flex items-center p-6 hover:bg-white/8 hover:pl-8 transition-all duration-400 rounded-2xl group backdrop-blur-sm border border-white/5 hover:border-white/15">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mr-6 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-400">
                          <span className="text-2xl">{info.icon}</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-white/50 block mb-1 uppercase tracking-wider font-inter">{info.label}</span>
                          {info.isLink ? (
                            <a href={info.href} className="text-blue-300 hover:text-cyan-300 transition-colors font-medium text-lg font-inter">
                              {info.value}
                            </a>
                          ) : (
                            <span className="text-white font-medium text-lg font-inter">{info.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Skills & Projects */}
              <div className="p-12 bg-white/3 backdrop-blur-xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 to-cyan-500/3"></div>
                <div className="relative z-10">
                  {/* Skills Section */}
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-white mb-12 relative font-playfair">
                      Skills & Expertise
                      <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full"></div>
                      <div className="absolute bottom-0 left-0 w-10 h-1 bg-white/40 rounded-full animate-pulse"></div>
                    </h2>

                    <div className="grid md:grid-cols-1 gap-10 mb-10">
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-3 font-inter">
                          <span className="text-2xl">💼</span>
                          Administrative Skills
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {skills.administrative.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 cursor-pointer font-inter"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-3 font-inter">
                          <span className="text-2xl">💻</span>
                          Technical Skills
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {skills.technical.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 cursor-pointer font-inter"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-3 font-inter">
                          <span className="text-2xl">🎯</span>
                          Organizational Experience
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {skills.organizational.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 cursor-pointer font-inter"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Features */}
                  <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3 font-playfair">
                        <span className="text-3xl">🎯</span>
                        Core Competencies
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center p-5 bg-white/8 backdrop-blur-sm rounded-2xl hover:translate-x-2 hover:bg-white/12 transition-all duration-300 border border-white/5">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mr-4 flex-shrink-0 shadow-lg">
                              <span className="text-xl">{feature.icon}</span>
                            </div>
                            <span className="text-white font-medium font-inter">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="bg-gradient-to-br from-slate-700 via-blue-700 to-indigo-700 rounded-3xl p-10 text-center text-white -mx-12 -mb-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-3 font-playfair">
                        <span className="text-2xl">🌟</span>
                        Connect With Me
                      </h3>
                      <div className="flex justify-center gap-6 flex-wrap">
                        {socialLinks.map((social, index) => (
                          <a
                            key={index}
                            href={social.href}
                            className="w-16 h-16 bg-white/15 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center hover:-translate-y-3 hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10"
                            title={social.title}
                          >
                            <span className="text-2xl">{social.icon}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          {isLoggedIn && (
            <div className="text-center mt-20">
              <button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white px-12 py-5 rounded-2xl font-semibold hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 inline-flex items-center gap-3 text-lg font-inter">
                <span className="text-2xl">←</span>
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap");

        .font-playfair {
          font-family: "Playfair Display", serif;
        }

        .font-inter {
          font-family: "Inter", sans-serif;
        }

        .font-poppins {
          font-family: "Poppins", sans-serif;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }

        @keyframes twinkle-delayed {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes float-bubble {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translateY(-15px) translateX(-15px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translateY(-25px) translateX(5px) rotate(270deg) scale(1.05);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 1.8s ease-out 0.8s both;
        }

        .animate-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animate-twinkle-delayed {
          animation: twinkle-delayed 3.5s ease-in-out infinite 1.5s;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-bubble {
          animation: float-bubble 15s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
