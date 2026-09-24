import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import WorkshopModal from './WorkshopModal';

export default function Workshops() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  
  const [workshopsList, setWorkshopsList] = useState([]);

  // Initialize feedback list, loading from localStorage if available
  const [feedbackList, setFeedbackList] = useState(() => {
    const savedFeedback = localStorage.getItem('site_feedback');
    if (savedFeedback) {
      try {
        return JSON.parse(savedFeedback);
      } catch (e) {
        console.error("Failed to parse feedback from localStorage", e);
      }
    }
    return [
      {
        id: 1,
        name: "Hamza Khan",
        role: "Frontend Developer",
        comment: "The Responsive Websites workshop completely cleared my doubts about CSS Grid and Flexbox. Super hands-on!",
        rating: 5,
        workshop: "Responsive Websites in a Weekend"
      },
      {
        id: 2,
        name: "Zainab Malik",
        role: "Data Analyst Student",
        comment: "Turned raw data handling from a confusing chore into something intuitive. Great teaching style and pace.",
        rating: 5,
        workshop: "Data Visualization with Python"
      },
      {
        id: 3,
        name: "Bilal Ahmed",
        role: "Software Engineer",
        comment: "Prompt Engineering Crash Course elevated my daily coding workflow instantly. Highly recommended!",
        rating: 5,
        workshop: "Prompt Engineering Crash Course"
      }
    ];
  });

  // Track IDs of feedback submitted specifically by this user session
  const [myFeedbackIds, setMyFeedbackIds] = useState(() => {
    const savedMyIds = localStorage.getItem('site_my_feedback_ids');
    if (savedMyIds) {
      try {
        return JSON.parse(savedMyIds);
      } catch (e) {
        console.error("Failed to parse user feedback IDs", e);
      }
    }
    return [];
  });

  const [newFeedback, setNewFeedback] = useState({ name: '', role: '', comment: '', workshop: 'Responsive Websites in a Weekend', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  // Save feedback list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('site_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Save user's submitted feedback IDs to localStorage
  useEffect(() => {
    localStorage.setItem('site_my_feedback_ids', JSON.stringify(myFeedbackIds));
  }, [myFeedbackIds]);

  useEffect(() => {
    const savedWorkshops = localStorage.getItem('site_workshops');
    if (savedWorkshops) {
      const parsed = JSON.parse(savedWorkshops);
      const formatted = parsed.map(item => ({
        category: item.tag || item.category || 'WORKSHOP',
        title: item.title,
        description: item.description,
        duration: item.duration || '2 days',
        format: item.mode || item.format || 'Live, online',
        price: item.price || 'PKR 2,000'
      }));
      setWorkshopsList(formatted);
    } else {
      setWorkshopsList([
        {
          category: "WEB DEVELOPMENT",
          title: "Responsive Websites in a Weekend",
          description: "Build and deploy a fully responsive landing page using HTML, CSS and Flexbox/Grid.",
          duration: "2 days",
          format: "Live, online",
          price: "PKR 2,000"
        },
        {
          category: "DATA SCIENCE",
          title: "Data Visualization with Python",
          description: "Turn a raw CSV into clean, presentation-ready charts using pandas and matplotlib.",
          duration: "1 day",
          format: "Live, online",
          price: "PKR 1,500"
        },
        {
          category: "AI TOOLS",
          title: "Prompt Engineering Crash Course",
          description: "Learn practical prompt patterns for writing, coding, and everyday productivity with AI tools.",
          duration: "1 day",
          format: "Live, online",
          price: "PKR 1,500"
        }
      ]);
    }
  }, []);

  const handleJoinClick = (title) => {
    setSelectedWorkshop(title);
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
    setMyFeedbackIds([...myFeedbackIds, newId]); // Mark this ID as belonging to this user
    
    setNewFeedback({ name: '', role: '', comment: '', workshop: workshopsList[0]?.title || 'Responsive Websites in a Weekend', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  // Delete feedback handler function (only removes if it belongs to the user)
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
            — WORKSHOPS
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Intensive masterclasses for <span className="text-mintAccent">fast skill-ups.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Short, focused weekend sessions designed to help you master a specific tool or framework in record time.
          </p>
        </div>
      </ScrollReveal>

      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {workshopsList.map((workshop, idx) => (
          <ScrollReveal key={idx}>
            <div className="bg-cardBg border border-gray-800 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-mintAccent/40 transition-all duration-300 group">
              <div className="space-y-5">
                <div>
                  <span className="inline-block text-[11px] font-mono tracking-wider text-mintAccent bg-mintAccent/10 border border-mintAccent/20 px-3 py-1 rounded-full uppercase">
                    {workshop.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-mintAccent transition-colors">
                    {workshop.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {workshop.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-800/60">
                  <div className="flex items-center gap-1.5">
                    <span>⏱️</span>
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>💻</span>
                    <span>{workshop.format}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-800/60">
                <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {workshop.price}
                </span>
                <button 
                  onClick={() => handleJoinClick(workshop.title)}
                  className="bg-mintAccent text-darkBg hover:bg-mintHover font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,250,154,0.2)] cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Interactive Feedback & Reviews Section */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-12 pt-10 border-t border-gray-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
                — COMMUNITY FEEDBACK
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                What Participants <span className="text-mintAccent">Are Saying</span>
              </h2>
              <p className="text-gray-400 text-base max-w-xl">
                Real reviews and ratings from learners who attended our technical workshops.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Feedback Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbackList.map((item) => {
                const isMyFeedback = myFeedbackIds.includes(item.id);

                return (
                  <div key={item.id} className="bg-cardBg border border-gray-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-mintAccent/30 transition-all relative group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-mintAccent bg-mintAccent/10 px-2.5 py-0.5 rounded-full border border-mintAccent/20">
                          {item.workshop}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="text-amber-400 text-xs tracking-widest">
                            {"★".repeat(item.rating)}
                          </div>
                          {/* Show delete button ONLY if this feedback was created by this user session */}
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
                    placeholder="e.g. Ayesha Fatima"
                    value={newFeedback.name}
                    onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Your Role / Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Software Engineering Student"
                    value={newFeedback.role}
                    onChange={(e) => setNewFeedback({...newFeedback, role: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Workshop Attended</label>
                  <select 
                    value={newFeedback.workshop}
                    onChange={(e) => setNewFeedback({...newFeedback, workshop: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  >
                    {workshopsList.map((w, i) => (
                      <option key={i} value={w.title}>{w.title}</option>
                    ))}
                    <option value="AI FOR EVERYONE 2026 WORKSHOP">AI FOR EVERYONE 2026 WORKSHOP</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Your Feedback</label>
                  <textarea 
                    required
                    rows="3"
                    placeholder="How was your experience?"
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

      {/* Workshop Registration Modal */}
      <WorkshopModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        workshopTitle={selectedWorkshop} 
      />

    </div>
  );
}