import React from 'react';

export default function BatchReviews() {
  const reviews = [
    {
      quote: "My Figma portfolio from the Graphic Design internship is what every client now asks to see first.",
      name: "Zain Raza",
      role: "Graphic Design · Batch 1",
      initials: "ZR",
      stars: 5,
    },
    {
      quote: "Prompt Engineering felt like a niche skill until I saw the internship briefs — now I automate half my workflow with AI.",
      name: "Hina Fatima",
      role: "AI Tools & Prompt Engineering · Batch 1",
      initials: "HF",
      stars: 5,
    },
    {
      quote: "The Data Science track finally made pandas and SQL click for me. Mentors reviewed my capstone line by line.",
      name: "Bilal Khan",
      role: "Data Science · Batch 1",
      initials: "BK",
      stars: 5,
    },
    {
      quote: "I went from zero HTML knowledge to deploying my own MERN app. The internship project is what actually got me a freelance gig.",
      name: "Ayesha Siddique",
      role: "Web Development · Batch 1",
      initials: "AF",
      stars: 5,
    },
  ];

  return (
    <section className="bg-darkBg text-white py-24 px-6 md:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-0.5 bg-mintAccent"></div>
            <span className="text-mintAccent font-mono text-md tracking-widest uppercase">
              BATCH 1 · CLASS OF 2026
            </span>
            <div className="w-6 h-0.5 bg-mintAccent"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Our first batch, in their own words
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base">
            Real feedback from learners who completed Batch 1 across all four internship domains.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-cardBg border border-gray-800 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-gray-700"
            >
              <div className="space-y-4">
                {/* Star Rating */}
                <div className="flex text-mintAccent text-sm space-x-1">
                  {[...Array(item.stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Student Profile Info */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-800/80">
                <div className="w-10 h-10 rounded-full bg-mintAccent/10 border border-mintAccent/30 text-mintAccent flex items-center justify-center font-bold text-sm">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{item.name}</h4>
                  <p className="text-gray-400 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}