import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('intern');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setCurrentPage('home');
    window.location.reload();
  };

  const handleOpenLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
    setIsOpen(false);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
    setIsOpen(false);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDashboardLabel = () => {
    switch (userRole) {
      case 'admin':
        return 'Admin Dashboard';
      case 'mentor':
        return 'Mentor Dashboard';
      default:
        return 'Intern Dashboard';
    }
  };

  return (
    <>
      <div className="w-full pt-3 sm:pt-4 px-3 sm:px-4 lg:px-12 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto bg-cardBg/90 backdrop-blur-md border border-mintAccent/30 rounded-2xl sm:rounded-full px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl shadow-mintAccent/5">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <div onClick={() => handleNavClick('home')} className="flex min-w-0 items-center gap-2 sm:gap-3 cursor-pointer">
              <img 
                src="/logo.jpeg" 
                alt="NextGen Learners Logo" 
                className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full object-cover border border-mintAccent bg-mintAccent/10 p-0.5" 
              />
              <span className="text-white font-bold text-sm sm:text-lg tracking-wide truncate">
                nextGen <span className="text-mintAccent">Learners</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-300">
              <button onClick={() => handleNavClick('home')} className={`${currentPage === 'home' ? 'text-mintAccent' : 'hover:text-mintAccent'} transition-colors cursor-pointer`}>Home</button>
              <button onClick={() => handleNavClick('courses')} className={`${currentPage === 'courses' ? 'text-mintAccent' : 'hover:text-mintAccent'} transition-colors cursor-pointer`}>Courses</button>
              <button onClick={() => handleNavClick('internships')} className={`${currentPage === 'internships' ? 'text-mintAccent' : 'hover:text-mintAccent'} transition-colors cursor-pointer`}>Internships</button>
              <button onClick={() => handleNavClick('workshops')} className={`${currentPage === 'workshops' ? 'text-mintAccent' : 'hover:text-mintAccent'} transition-colors cursor-pointer`}>Workshops</button>
              <button onClick={() => handleNavClick('services')} className={`${currentPage === 'services' ? 'text-mintAccent' : 'hover:text-mintAccent'} transition-colors cursor-pointer`}>Services</button>
              <button onClick={() => handleNavClick('projects')} className={`${currentPage === 'projects' ? 'text-mintAccent' : 'hover:text-mintAccent'} transition-colors cursor-pointer`}>Projects</button>
              <button onClick={() => handleNavClick('team')} className={`${currentPage === 'team' ? 'text-mintAccent' : 'hover:text-mintAccent'} transition-colors cursor-pointer`}>Team</button>
              <button onClick={() => handleNavClick('contact')} className="hover:text-mintAccent transition-colors cursor-pointer">Contact</button>
              
              {isLoggedIn && (
                <button 
                  onClick={() => handleNavClick('dashboard')} 
                  className={`${currentPage === 'dashboard' ? 'text-mintAccent font-bold' : 'text-mintAccent hover:underline'} transition-colors cursor-pointer flex items-center gap-1.5`}
                >
                  <span className="w-2 h-2 rounded-full bg-mintAccent animate-pulse"></span>
                  {getDashboardLabel()}
                </button>
              )}
            </div>

            {/* Right Actions (Auth Only) */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-sm font-semibold px-5 py-2 rounded-full transition-all cursor-pointer">
                  Log out
                </button>
              ) : (
                <>
                  <button onClick={handleOpenLogin} className="text-gray-300 hover:text-white text-sm font-medium px-3 py-2 transition-colors cursor-pointer">
                    Log in
                  </button>
                  <button onClick={handleOpenSignup} className="bg-mintAccent text-darkBg hover:bg-mintHover text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-mintAccent/25 cursor-pointer">
                    Sign up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden flex items-center gap-2 shrink-0">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-mintAccent focus:outline-none cursor-pointer p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3 border-t border-gray-800 pt-4 flex flex-col px-4">
              <button onClick={() => handleNavClick('home')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Home</button>
              <button onClick={() => handleNavClick('courses')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Courses</button>
              <button onClick={() => handleNavClick('internships')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Internships</button>
              <button onClick={() => handleNavClick('workshops')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Workshops</button>
              <button onClick={() => handleNavClick('services')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Services</button>
              <button onClick={() => handleNavClick('projects')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Projects</button>
              <button onClick={() => handleNavClick('team')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Team</button>
              <button onClick={() => handleNavClick('contact')} className="text-left text-gray-300 hover:text-mintAccent text-sm font-medium">Contact</button>
              
              {isLoggedIn && (
                <button onClick={() => handleNavClick('dashboard')} className="text-left text-mintAccent text-sm font-semibold">
                  {getDashboardLabel()}
                </button>
              )}
              
              <div className="flex gap-4 pt-2">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="text-red-400 text-sm font-semibold cursor-pointer">Log out</button>
                ) : (
                  <>
                    <button onClick={handleOpenLogin} className="text-gray-300 hover:text-white text-sm font-medium cursor-pointer">Log in</button>
                    <button onClick={handleOpenSignup} className="bg-mintAccent text-darkBg px-5 py-2 rounded-full text-sm font-semibold cursor-pointer">Sign up</button>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} setCurrentPage={setCurrentPage} />
    </>
  );
}