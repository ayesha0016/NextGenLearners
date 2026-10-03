import React, { useState } from 'react';

export default function Footer({ currentPage, setCurrentPage }) {
  // State for admin portal password modal/prompt
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState(false);

  // Navigation helper jo page change karega aur screen ke top par scroll karega
  const handleNavClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    setShowAdminPrompt(true);
    setAdminPassword('');
    setError(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Replace 'your_secure_password_here' with your actual secret password
    if (adminPassword === 'nextgenadmin2712') {
      setShowAdminPrompt(false);
      setAdminPassword('');
      setError(false);
      handleNavClick('admin');
    } else {
      setError(true);
    }
  };

  return (
    <>
      <footer className="bg-darkBg border-t border-gray-800 text-gray-400 py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              NextGen <span className="text-mintAccent">Learners</span>
            </h2>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Empowering students with practical, project-based tech education and real-world internship experiences.
            </p>
          </div>

          {/* Learn Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono tracking-wider uppercase text-white">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavClick('courses')}
                  className="hover:text-mintAccent transition-colors text-left cursor-pointer"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('internships')}
                  className="hover:text-mintAccent transition-colors text-left cursor-pointer"
                >
                  Internships
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('workshops')}
                  className="hover:text-mintAccent transition-colors text-left cursor-pointer"
                >
                  Workshops
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('projects')}
                  className="hover:text-mintAccent transition-colors text-left cursor-pointer"
                >
                  Student Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono tracking-wider uppercase text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavClick('services')}
                  className="hover:text-mintAccent transition-colors text-left cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('team')}
                  className="hover:text-mintAccent transition-colors text-left cursor-pointer"
                >
                  Core Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-mintAccent transition-colors text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('enroll')}
                  className="border border-mintAccent/40 text-mintAccent px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-mintAccent/10 transition-colors block text-center w-full cursor-pointer"
                >
                  Enroll now
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-900 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} NextGen Learners. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="hover:text-mintAccent cursor-pointer">Privacy Policy</span>
            <span className="hover:text-mintAccent cursor-pointer">Terms of Service</span>
            
            {/* Protected Admin Portal Link */}
            <button 
              onClick={handleAdminClick}
              className="hover:text-mintAccent transition-colors font-mono tracking-wide cursor-pointer text-gray-400 flex items-center gap-1.5"
            >
              <span className="text-mintAccent">🔒</span> Admin Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Password Modal */}
      {showAdminPrompt && (
        <div className="modal-viewport fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="modal-panel bg-[#111827] border border-mintAccent/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span>🔒</span> Admin Access
              </h3>
              <button 
                onClick={() => setShowAdminPrompt(false)} 
                className="text-gray-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">ENTER ADMIN PASSWORD</label>
                <input 
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoFocus
                  className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-mintAccent transition-colors"
                />
                {error && (
                  <p className="text-red-400 text-xs mt-1">Incorrect password. Access denied.</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPrompt(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-mintAccent hover:bg-mintHover text-darkBg text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}