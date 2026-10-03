import React from 'react';

export default function Hero({ setCurrentPage, onOpenAuth }) {
  return (
    <section className="relative bg-darkBg text-white py-20 px-6 md:px-16 overflow-hidden">
      {/* Background glow effect matching your mint accent */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-mintAccent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text & Call to Action with Presentation Slide-up Animations */}
        <div className="space-y-6 z-10">
          
          {/* Badge */}
          <div className="opacity-0 animate-[slideDown_0.8s_ease-out_0.2s_forwards] inline-block">
            <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
              NEXT_GEN_LEARNERS.INIT()
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight opacity-0 animate-[slideUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards]">
            Turn curiosity into <span className="bg-gradient-to-r from-white via-mintAccent to-emerald-400 bg-clip-text text-transparent">shipped code.</span>
          </h1>
          
          {/* Description Paragraph */}
          <p className="text-gray-300 text-base md:text-lg max-w-lg leading-relaxed opacity-0 animate-[slideUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards]">
            Project-based courses, paid-style internships, and hands-on workshops in Web Development, Data Science, AI Tools & Prompt Engineering, and Graphic Design.
          </p>

          {/* Buttons Container */}
          <div className="flex flex-wrap gap-4 pt-4 items-center opacity-0 animate-[slideUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.8s_forwards]">
            <button 
              onClick={() => {
                if (onOpenAuth) {
                  onOpenAuth('signup');
                } else {
                  setCurrentPage('courses'); 
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="bg-mintAccent text-darkBg font-semibold px-7 py-3.5 rounded-full hover:bg-mintHover transition-all duration-300 shadow-lg shadow-mintAccent/20 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              Start learning free →
            </button>

            {/* Browse courses button with rotating glow border beam effect */}
            <button 
              onClick={() => { setCurrentPage('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="sliding-border-btn relative px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Browse courses
            </button>

            {/* See all services button */}
            <button 
              onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-gray-300 hover:text-mintAccent font-semibold px-5 py-3.5 rounded-full border border-gray-700 hover:border-mintAccent/40 transition-all duration-300 flex items-center gap-2 cursor-pointer bg-cardBg/50"
            >
              See all services →
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Code Editor Mockup with Entry Animation */}
        <div className="relative z-15 flex justify-center opacity-0 animate-[slideUp_1s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
          <div className="w-full max-w-lg bg-cardBg border border-gray-800 rounded-2xl shadow-2xl p-4 overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            {/* Window Header */}
            <div className="flex items-center space-x-2 pb-4 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400 font-mono pl-2">student.js</span>
            </div>

            {/* Code Body */}
            <div className="py-4 font-mono text-sm text-gray-300 space-y-2 overflow-x-auto">
              <p><span className="text-purple-400">const</span> 你 = <span className="text-mintAccent">"future_developer"</span>;</p>
              <p><span className="text-blue-400">function</span> <span className="text-yellow-300">learn</span>(skill) &#123;</p>
              <p className="pl-4"><span className="text-purple-400">return</span> skill + <span className="text-mintAccent">".master()"</span>;</p>
              <p>&#125;</p>
              <p className="text-gray-500">// enrolling with NextGen Learners...</p>
              <p>learn(<span className="text-mintAccent">"Web Dev"</span> | <span className="text-mintAccent">"Data Science"</span> | <span className="text-mintAccent">"AI"</span>);</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}