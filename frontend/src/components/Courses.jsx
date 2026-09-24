import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import CourseModal from './CourseModal';

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({ title: '', price: '' });
  const [coursesList, setCoursesList] = useState([]);

  // Initialize course feedback list from localStorage or fallback defaults
  const [feedbackList, setFeedbackList] = useState(() => {
    const savedFeedback = localStorage.getItem('site_course_feedback');
    if (savedFeedback) {
      try {
        return JSON.parse(savedFeedback);
      } catch (e) {
        console.error("Failed to parse course feedback from localStorage", e);
      }
    }
    return [
      {
        id: 1,
        name: "Hamza Khan",
        role: "Frontend Developer",
        comment: "The project-first approach cleared all my doubts about building full-stack apps. Truly worth it!",
        rating: 5,
        courseTitle: "Full-Stack Web Development"
      },
      {
        id: 2,
        name: "Zainab Malik",
        role: "Data Analyst Student",
        comment: "Turned raw data handling from a confusing chore into something intuitive. Great teaching style and pace.",
        rating: 5,
        courseTitle: "Applied Data Science"
      }
    ];
  });

  // Track IDs of feedback submitted specifically by this browser session
  const [myFeedbackIds, setMyFeedbackIds] = useState(() => {
    const savedMyIds = localStorage.getItem('site_course_my_feedback_ids');
    if (savedMyIds) {
      try {
        return JSON.parse(savedMyIds);
      } catch (e) {
        console.error("Failed to parse user feedback IDs", e);
      }
    }
    return [];
  });

  const [newFeedback, setNewFeedback] = useState({ name: '', role: '', comment: '', courseTitle: 'Full-Stack Web Development', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  // Save feedback list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('site_course_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Save user's submitted feedback IDs to localStorage
  useEffect(() => {
    localStorage.setItem('site_course_my_feedback_ids', JSON.stringify(myFeedbackIds));
  }, [myFeedbackIds]);

  useEffect(() => {
    const savedCourses = localStorage.getItem('site_courses');
    if (savedCourses) {
      const parsed = JSON.parse(savedCourses);
      const formatted = parsed.map(item => ({
        category: item.tag || item.category || 'COURSE',
        title: item.title,
        description: item.description,
        duration: item.duration || '12 weeks',
        level: item.level || 'Beginner friendly',
        format: item.format || 'Live + recorded',
        price: item.price || 'PKR 15,000'
      }));
      setCoursesList(formatted);
    } else {
      setCoursesList([
        {
          category: "WEB DEVELOPMENT",
          title: "Full-Stack Web Development",
          description: "HTML, CSS, JavaScript, React, Node.js & MongoDB. Build and deploy three real projects, including a full-stack capstone.",
          duration: "12 weeks",
          level: "Beginner friendly",
          format: "Live + recorded",
          price: "PKR 15,000"
        },
        {
          category: "DATA SCIENCE",
          title: "Applied Data Science",
          description: "Python, pandas, NumPy, SQL, data visualization and core ML models. Work with real-world datasets from day one.",
          duration: "10 weeks",
          level: "Beginner friendly",
          format: "Live + recorded",
          price: "PKR 14,000"
        },
        {
          category: "AI TOOLS & PROMPT ENGINEERING",
          title: "AI Tools & Prompt Engineering",
          description: "Master prompt design, LLM workflows, and building real tools on top of AI APIs — from chatbots to automation.",
          duration: "6 weeks",
          level: "All levels",
          format: "Live + recorded",
          price: "PKR 12,000"
        },
        {
          category: "GRAPHIC DESIGN",
          title: "UI & Graphic Design",
          description: "Design theory, Figma, branding systems, and UI design — build a client-ready portfolio across 4 real briefs.",
          duration: "8 weeks",
          level: "Beginner friendly",
          format: "Live + recorded",
          price: "PKR 12,500"
        }
      ]);
    }
  }, []);

  const handleEnrollClick = (title, price) => {
    setSelectedCourse({ title, price });
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

    setNewFeedback({ name: '', role: '', comment: '', courseTitle: coursesList[0]?.title || 'Full-Stack Web Development', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleDeleteFeedback = (id) => {
    setFeedbackList(feedbackList.filter(item => item.id !== id));
    setMyFeedbackIds(myFeedbackIds.filter(feedbackId => feedbackId !== id));
  };

  return (
    <div className="min-h-screen bg-darkBg text-white py-16 px-6 md:px-16 space-y-24">
      
      {/* Section Header */}
      <ScrollReveal>
        <div className="max-w-4xl space-y-4">
          <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
            — COURSES
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Pick a track. Build the skill. <span className="text-mintAccent">Ship the project.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Every course is mentor-led, project-based, and ends with a capstone you can put straight into your portfolio.
          </p>
        </div>
      </ScrollReveal>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {coursesList.map((course, idx) => (
          <ScrollReveal key={idx}>
            <div className="bg-cardBg border border-gray-800 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-mintAccent/40 transition-all duration-300 group">
              <div className="space-y-5">
                <div>
                  <span className="inline-block text-[11px] font-mono tracking-wider text-mintAccent bg-mintAccent/10 border border-mintAccent/20 px-3 py-1 rounded-full uppercase">
                    {course.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-mintAccent transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-800/60">
                  <div className="flex items-center gap-1.5">
                    <span>⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>🎓</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>💻</span>
                    <span>{course.format}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-800/60">
                <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {course.price}
                </span>
                <button 
                  onClick={() => handleEnrollClick(course.title, course.price)}
                  className="bg-mintAccent text-darkBg hover:bg-mintHover font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,250,154,0.2)] cursor-pointer"
                >
                  Enroll
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Interactive Course Feedback & Reviews Section */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-12 pt-10 border-t border-gray-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
                — STUDENT REVIEWS
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                What Our Students <span className="text-mintAccent">Are Saying</span>
              </h2>
              <p className="text-gray-400 text-base max-w-xl">
                Read real feedback from graduates who built their confidence and codebases through our courses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Feedback Grid - Compact Cards matching workshop layout */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbackList.map((item) => {
                const isMyFeedback = myFeedbackIds.includes(item.id);

                return (
                  <div key={item.id} className="bg-cardBg border border-gray-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-mintAccent/30 transition-all relative group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-mintAccent bg-mintAccent/10 px-2.5 py-0.5 rounded-full border border-mintAccent/20">
                          {item.courseTitle}
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
                <h3 className="text-lg font-bold text-white">Share Your Review</h3>
                
                {submitted && (
                  <div className="p-3 bg-mintAccent/10 border border-mintAccent/30 rounded-xl text-mintAccent text-xs font-medium">
                    Thank you! Your review has been published successfully.
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
                    placeholder="e.g. Full-Stack Developer"
                    value={newFeedback.role}
                    onChange={(e) => setNewFeedback({...newFeedback, role: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Course Track</label>
                  <select 
                    value={newFeedback.courseTitle}
                    onChange={(e) => setNewFeedback({...newFeedback, courseTitle: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors"
                  >
                    {coursesList.map((c, i) => (
                      <option key={i} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400">Your Review</label>
                  <textarea 
                    required
                    rows="3"
                    placeholder="How was your learning experience?"
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-mintAccent text-darkBg hover:bg-mintHover font-semibold text-sm py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,250,154,0.2)] cursor-pointer mt-2"
                >
                  Submit Review
                </button>
              </form>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* Callout Banner */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-emerald-950 via-cardBg to-darkBg border border-mintAccent/30 rounded-3xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mintAccent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Batch 2 enrollment is open.
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Limited seats per track — reserve yours before the cohort fills up.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => handleEnrollClick('General Batch 2 Enrollment', 'Varies')}
                className="bg-mintAccent text-darkBg hover:bg-[#00df86] font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,250,154,0.3)] hover:shadow-[0_0_35px_rgba(0,250,154,0.5)] cursor-pointer inline-flex items-center gap-2"
              >
                Enroll in Batch 2 →
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Course Enrollment Modal */}
      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseTitle={selectedCourse.title}
        coursePrice={selectedCourse.price}
      />

    </div>
  );
}