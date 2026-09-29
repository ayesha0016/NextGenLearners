import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import InternshipModal from './InternshipModal';

export default function Internships() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('Web Development Internship');
  const [internshipTracks, setInternshipTracks] = useState([]);

  // Initialize feedback list, loading from localStorage if available
  const [feedbackList, setFeedbackList] = useState(() => {
    const savedFeedback = localStorage.getItem('site_internship_feedback');
    if (savedFeedback) {
      try {
        return JSON.parse(savedFeedback);
      } catch (e) {
        console.error("Failed to parse internship feedback from localStorage", e);
      }
    }
    return [
      {
        id: 1,
        name: "Ali Raza",
        role: "Web Dev Intern",
        comment: "Working on the simulated client brief bridge the gap between classroom theory and production code. Amazing mentorship!",
        rating: 5,
        track: "Web Development Internship"
      },
      {
        id: 2,
        name: "Sana Tariq",
        role: "Data Science Intern",
        comment: "The weekly mentor check-ins and structured milestone reviews helped me build a portfolio piece I'm proud to show.",
        rating: 5,
        track: "Data Science Internship"
      }
    ];
  });

  // Track IDs of feedback submitted specifically by this browser session
  const [myFeedbackIds, setMyFeedbackIds] = useState(() => {
    const savedMyIds = localStorage.getItem('site_internship_my_feedback_ids');
    if (savedMyIds) {
      try {
        return JSON.parse(savedMyIds);
      } catch (e) {
        console.error("Failed to parse user feedback IDs", e);
      }
    }
    return [];
  });

  const [newFeedback, setNewFeedback] = useState({ name: '', role: '', comment: '', track: 'Web Development Internship', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  // Save feedback list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('site_internship_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Save user's submitted feedback IDs to localStorage
  useEffect(() => {
    localStorage.setItem('site_internship_my_feedback_ids', JSON.stringify(myFeedbackIds));
  }, [myFeedbackIds]);

  useEffect(() => {
    const savedInternships = localStorage.getItem('site_internships');
    if (savedInternships) {
      const parsed = JSON.parse(savedInternships);
      const formatted = parsed.map(item => ({
        title: item.title,
        description: item.description,
        icon: item.icon || '💻',
        features: [
          item.duration || '4–6 weeks, remote',
          item.featureTwo || 'Team code reviews via GitHub',
          item.perk || 'Completion certificate + reference letter'
        ]
      }));
      setInternshipTracks(formatted);
    } else {
      setInternshipTracks([
        {
          title: "Web Development Internship",
          description: "Build a production-style full-stack feature for a simulated client — from database schema to deployed UI.",
          icon: "💻",
          features: [
            "4–6 weeks, remote",
            "Team code reviews via GitHub",
            "Completion certificate + reference letter"
          ]
        },
        {
          title: "Data Science Internship",
          description: "Clean, analyze, and model a real dataset, then present findings in a stakeholder-ready report.",
          icon: "📊",
          features: [
            "4–6 weeks, remote",
            "Weekly mentor check-ins",
            "Completion certificate + reference letter"
          ]
        },
        {
          title: "AI Tools & Prompt Engineering Internship",
          description: "Design and ship a small AI-powered tool — chatbot, content generator, or workflow automation.",
          icon: "🤖",
          features: [
            "3–5 weeks, remote",
            "Access to AI API credits",
            "Completion certificate + reference letter"
          ]
        },
        {
          title: "Graphic Design Internship",
          description: "Design a full brand identity or app UI from a real creative brief, presented as a client-ready deck.",
          icon: "🎨",
          features: [
            "4 weeks, remote",
            "1:1 design critique sessions",
            "Completion certificate + reference letter"
          ]
        }
      ]);
    }
  }, []);

  const steps = [
    { step: "STEP 1", title: "Apply", desc: "Complete the related course or pass a short skills screener." },
    { step: "STEP 2", title: "Match", desc: "Get placed into a track-specific internship cohort." },
    { step: "STEP 3", title: "Build", desc: "Deliver weekly milestones with mentor feedback." },
    { step: "STEP 4", title: "Graduate", desc: "Present your final project and receive your certificate." }
  ];

  const handleApplyClick = (title) => {
    setSelectedDomain(title);
    setIsModalOpen(true);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.name || !newFeedback.comment) return;
    
    const newId = Date.now();
    const feedbackItemWithId = {
      ...newFeedback,
      id: newId
    };

    setFeedbackList([feedbackItemWithId, ...feedbackList]);
    setMyFeedbackIds([...myFeedbackIds, newId]);

    setNewFeedback({ name: '', role: '', comment: '', track: internshipTracks[0]?.title || 'Web Development Internship', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleDeleteFeedback = (id) => {
    setFeedbackList(feedbackList.filter(item => item.id !== id));
    setMyFeedbackIds(myFeedbackIds.filter(feedbackId => feedbackId !== id));
  };

  return (
    <div className="min-h-screen bg-darkBg text-white py-16 px-6 md:px-16 space-y-24">
      
      {/* Header Section */}
      <ScrollReveal>
        <div className="max-w-4xl space-y-4">
          <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
            — INTERNSHIPS
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Apply what you learned to <span className="text-mintAccent">real briefs.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Every internship runs 4–8 weeks, is mentor-reviewed, and ends with a project you can show employers or clients.
          </p>
        </div>
      </ScrollReveal>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {internshipTracks.map((track, idx) => (
          <ScrollReveal key={idx}>
            <div className="bg-cardBg border border-gray-800 rounded-2xl p-8 hover:border-mintAccent/40 transition-all duration-300 flex flex-col justify-between h-full group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-mintAccent/10 border border-mintAccent/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {track.icon}
                  </div>
                  <button 
                    onClick={() => handleApplyClick(track.title)}
                    className="bg-mintAccent/10 text-mintAccent border border-mintAccent/30 hover:bg-mintAccent hover:text-darkBg font-semibold text-xs px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-white">{track.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{track.description}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800/85 space-y-3">
                {track.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-mintAccent font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-3">
            <span className="text-mintAccent font-mono text-xs tracking-widest uppercase">— HOW IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">From application to offer letter</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <ScrollReveal key={idx}>
              <div className="bg-cardBg border border-gray-800 rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-md bg-mintAccent/10 border border-mintAccent/20 text-mintAccent text-xs font-mono font-semibold">
                    {item.step}
                  </span>
                  <h4 className="text-xl font-bold text-white">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Interactive Intern Feedback & Reviews Section */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-12 pt-10 border-t border-gray-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
                — INTERN REVIEWS
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Success Stories From <span className="text-mintAccent">Our Interns</span>
              </h2>
              <p className="text-gray-400 text-base max-w-xl">
                Read feedback from past interns who built portfolio-grade projects through our program.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Feedback Grid - Compact Cards matching Workshops layout */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbackList.map((item) => {
                const isMyFeedback = myFeedbackIds.includes(item.id);

                return (
                  <div key={item.id} className="bg-cardBg border border-gray-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-mintAccent/30 transition-all relative group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-mintAccent bg-mintAccent/10 px-2.5 py-0.5 rounded-full border border-mintAccent/20">
                          {item.track}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="text-amber-400 text-xs tracking-widest">
                            {"★".repeat(item.rating)}
                          </div>
                          {isMyFeedback && (
                            <button
                              onClick={() => handleDeleteFeedback(item.id)}
                              title="Delete your feedback"
                              className="text-gray-500 hover:text-red-400 text-xs transition-colors p-1 cursor-pointer"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm italic leading-relaxed">
                        "{item.comment}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        <p className="text-gray-500 text-xs">{item.role}</p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-mintAccent/10 text-mintAccent flex items-center justify-center font-bold text-xs border border-mintAccent/20">
                        {item.name ? item.name.charAt(0) : '?'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Leave Feedback Form Box */}
            <div className="bg-cardBg border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white">Share Your Experience</h3>
                
                {submitted && (
                  <div className="p-3 bg-mintAccent/10 border border-mintAccent/30 rounded-xl text-mintAccent text-xs font-medium">
                    Thank you! Your feedback has been published successfully.
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. John Doe"
                    value={newFeedback.name}
                    onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Your Intern Role / Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Full-Stack Intern"
                    value={newFeedback.role}
                    onChange={(e) => setNewFeedback({...newFeedback, role: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Internship Track</label>
                  <select 
                    value={newFeedback.track}
                    onChange={(e) => setNewFeedback({...newFeedback, track: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  >
                    {internshipTracks.map((t, i) => (
                      <option key={i} value={t.title}>{t.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Your Feedback</label>
                  <textarea 
                    required
                    rows="3"
                    placeholder="How was your internship experience?"
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-mintAccent text-darkBg hover:bg-mintHover font-semibold text-sm py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,250,154,0.2)] cursor-pointer mt-2"
                >
                  Submit Feedback
                </button>
              </form>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* Bottom CTA Banner */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-emerald-950 via-cardBg to-darkBg border border-mintAccent/30 rounded-3xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mintAccent/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Internship seats for Batch 2 are limited.</h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
            Complete the matching course to unlock your internship application.
          </p>

          <button 
            onClick={() => handleApplyClick('Web Development Internship')}
            className="bg-mintAccent text-darkBg hover:bg-mintHover font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-mintAccent/25 cursor-pointer transform hover:-translate-y-1 inline-flex items-center gap-2"
          >
            Apply now →
          </button>
        </div>
      </ScrollReveal>

      {/* Modal */}
      <InternshipModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preSelectedDomain={selectedDomain}
      />

    </div>
  );
}