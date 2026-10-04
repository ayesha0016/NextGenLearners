import React from 'react';

export default function InternshipDomains({ onExploreTrack }) {
  const tracks = [
    {
      title: "Web Development",
      icon: "💻",
      description: "HTML, CSS, JS, React & Node — build and deploy full-stack apps.",
    },
    {
      title: "Data Science",
      icon: "📊",
      description: "Python, pandas, SQL & ML fundamentals through real datasets.",
    },
    {
      title: "AI Tools & Prompt Engineering",
      icon: "🤖",
      description: "LLM workflows, prompt design, and building with AI APIs.",
    },
    {
      title: "Graphic Design",
      icon: "🎨",
      description: "Figma, brand systems, and UI design for real client briefs.",
    },
  ];

  return (
    <section className="bg-darkBg text-white py-20 px-6 md:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Stats Counter Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-gray-800/80">
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">1,200+</h3>
            <p className="text-gray-400 text-sm mt-1">Learners enrolled</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">40+</h3>
            <p className="text-gray-400 text-sm mt-1">Batch 1 internship grads</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">4.9/5</h3>
            <p className="text-gray-400 text-sm mt-1">Average student rating</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-mintAccent"></div>
            <span className="text-mintAccent font-mono text-md tracking-widest uppercase">
              INTERNSHIP DOMAINS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Four tracks. One launchpad.
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl">
            Every track pairs a structured course with a real internship project you'll ship and showcase.
          </p>
        </div>

        {/* 4 Cards Grid with interactive hover effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, index) => (
            <div 
              key={index} 
              className="group relative bg-cardBg border border-gray-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-mintAccent/50 hover:shadow-xl hover:shadow-mintAccent/5 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Subtle top light reflection on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mintAccent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Hexagon/Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-darkBg border border-gray-800 flex items-center justify-center text-xl mb-6 group-hover:border-mintAccent/30 group-hover:bg-mintAccent/5 transition-colors">
                  {track.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-mintAccent transition-colors">
                  {track.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {track.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onExploreTrack(`${track.title} Internship`)}
                className="mt-6 pt-4 border-t border-gray-800/50 flex items-center text-xs font-semibold text-gray-400 group-hover:text-mintAccent transition-colors cursor-pointer"
              >
                Explore track →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}