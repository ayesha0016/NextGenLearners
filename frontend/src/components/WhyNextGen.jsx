import React from 'react';

export default function WhyNextGen({ setCurrentPage }) {
  const features = [
    "Live mentor-led sessions, not pre-recorded playlists",
    "Every course ends with a portfolio-ready capstone project",
    "Guaranteed internship placement for top-performing learners",
    "Certificate + LinkedIn-verified skill badge on completion",
    "Small batches, 1:1 doubt-resolution support",
  ];

  const roadmapSteps = [
    {
      num: "01",
      title: "Learn",
      desc: "Structured course with weekly live sessions & assignments.",
    },
    {
      num: "02",
      title: "Build",
      desc: "Ship a real capstone project reviewed by mentors.",
    },
    {
      num: "03",
      title: "Intern",
      desc: "Apply skills on a live internship project for 4-8 weeks.",
    },
    {
      num: "04",
      title: "Launch",
      desc: "Portfolio, certificate & referral into our hiring network.",
    },
  ];

  return (
    <section className="bg-darkBg text-white py-20 px-6 md:px-16 border-t border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text & Checkmarks */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-mintAccent"></div>
            <span className="text-mintAccent font-mono text-md tracking-widest uppercase">
              WHY NEXTGEN
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Built like a bootcamp, priced like a course.
          </h2>

          <ul className="space-y-4 pt-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                <span className="text-mintAccent font-bold mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Updated Button with Sliding Border Beam Effect */}
           {/* See all services button */}
            <button 
              onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-gray-300 hover:text-mintAccent font-semibold px-5 py-3.5 rounded-full border border-gray-700 hover:border-mintAccent/40 transition-all duration-300 flex items-center gap-2 cursor-pointer bg-cardBg/50"
            >
              See all services →
            </button>
        </div>

        {/* Right Column: Roadmap Window (Clean Dark Look) */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="w-full bg-cardBg border border-gray-800 rounded-2xl p-6 overflow-hidden relative z-10">
            
            {/* Window Header */}
            <div className="flex items-center space-x-2 pb-4 mb-6 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400 font-mono pl-2">roadmap.md</span>
            </div>

            {/* Timeline Content */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-800">
              {roadmapSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-darkBg border-2 border-mintAccent flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-mintAccent"></div>
                  </div>

                  <div>
                    <h3 className="font-mono text-sm font-bold text-white tracking-wide">
                      <span className="text-mintAccent">{step.num}</span> · {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}