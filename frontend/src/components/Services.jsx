// src/components/Services.jsx
import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Services({ setCurrentPage }) {
  const servicesList = [
    {
      icon: "👩‍🏫",
      title: "Live Mentorship",
      description: "Weekly 1:1 and group sessions with instructors who review your actual code and design work."
    },
    {
      icon: "🧩",
      title: "Project-Based Learning",
      description: "Every module ends in a shippable project, not just quizzes — build a portfolio as you learn."
    },
    {
      icon: "🎓",
      title: "Certification",
      description: "Verified certificates and shareable skill badges for every completed course and internship."
    },
    {
      icon: "🧭",
      title: "Career Guidance",
      description: "Resume reviews, mock interviews, and portfolio audits from our career coaching team."
    },
    {
      icon: "🤝",
      title: "Hiring Network",
      description: "Top graduates get referred directly to our partner startups and agencies."
    },
    {
      icon: "🛠️",
      title: "Custom Team Training",
      description: "Cohort-based training for schools, colleges, and companies upskilling their teams."
    }
  ];

  return (
    <div className="min-h-screen bg-darkBg text-white py-16 px-6 md:px-16 space-y-24">
      
      {/* Section Header */}
      <ScrollReveal>
        <div className="max-w-4xl space-y-4">
          <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
            — SERVICES
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Everything you need to go from learner to <span className="text-mintAccent">professional.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Beyond courses, NextGen Learners supports your whole journey — mentorship, career prep, and hiring partnerships.
          </p>
        </div>
      </ScrollReveal>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {servicesList.map((service, idx) => (
          <ScrollReveal key={idx}>
            <div className="bg-cardBg border border-gray-800 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-mintAccent/40 transition-all duration-300 group space-y-6">
              <div className="w-12 h-12 rounded-xl bg-cardBg border border-gray-700 flex items-center justify-center text-xl shadow-inner group-hover:border-mintAccent/50 transition-colors">
                {service.icon}
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-mintAccent transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Callout Banner */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-emerald-950 via-cardBg to-darkBg border border-mintAccent/30 rounded-3xl p-12 md:p-20 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mintAccent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Want training for your team or campus?
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              We run custom cohorts for colleges and companies across all four tracks.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-mintAccent text-darkBg hover:bg-[#00df86] font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,250,154,0.3)] hover:shadow-[0_0_35px_rgba(0,250,154,0.5)] cursor-pointer inline-flex items-center gap-2"
              >
                Get in touch →
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}