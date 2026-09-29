import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InternshipDomains from './components/InternshipDomains';
import WhyNextGen from './components/WhyNextGen';
import BatchReviews from './components/BatchReviews';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import Courses from './components/Courses';
import ScrollReveal from './components/ScrollReveal';
import Internships from './components/Internships';
import Workshops from './components/Workshops';
import Services from './components/Services';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import Enrollment from './components/Enrollment';
import InternDashboard from './components/InternDashboard'; 
import MentorDashboard from './components/MentorDashboard'; 
import AdminPortal from './components/AdminPortal'; 
import AuthModal from './components/AuthModal'; // Import your AuthModal component

// HomePage sections wrapped with ScrollReveal, accepting onOpenAuth for the Hero component
function HomePage({ setCurrentPage, onOpenAuth }) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} onOpenAuth={onOpenAuth} />

      <ScrollReveal>
        <InternshipDomains />
      </ScrollReveal>

      <ScrollReveal>
        <WhyNextGen />
      </ScrollReveal>

      <ScrollReveal>
        <BatchReviews />
      </ScrollReveal>

      <ScrollReveal>
        <CtaBanner />
      </ScrollReveal>
    </>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // Track a state counter or toggle to force App.jsx to re-evaluate localstorage when page changes
  const [sessionKey, setSessionKey] = useState(0);

  // States for the Global Auth Modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleOpenAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Custom wrapper for setCurrentPage so any navigation or login redirection forces App re-render
  const handlePageChange = (page) => {
    setSessionKey(prev => prev + 1);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getUserRole = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.role) return parsed.role.toLowerCase();
      }
    } catch (e) {
      console.error("Error reading user object", e);
    }
    return (localStorage.getItem('userRole') || 'intern').toLowerCase();
  };

  const currentRole = getUserRole();

  return (
    <div key={sessionKey} className="bg-darkBg min-h-screen text-white font-sans selection:bg-mintAccent selection:text-darkBg flex flex-col justify-between overflow-x-hidden">

      {/* Top Section (Navbar & Dynamic Pages) */}
      <div className="w-full flex-grow">
        <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />

        {currentPage === 'home' && <HomePage setCurrentPage={handlePageChange} onOpenAuth={handleOpenAuth} />}
        {currentPage === 'courses' && <Courses setCurrentPage={handlePageChange} />}
        {currentPage === 'internships' && <Internships setCurrentPage={handlePageChange} />}
        {currentPage === 'workshops' && <Workshops />}
        {currentPage === 'services' && <Services setCurrentPage={handlePageChange} />}
        {currentPage === 'projects' && <Projects />}
        {currentPage === 'team' && <Team />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'enroll' && <Enrollment />}
        
        {/* Dynamic Dashboard Route based on active role */}
        {currentPage === 'dashboard' && (
          currentRole === 'mentor' ? (
            <MentorDashboard setCurrentPage={handlePageChange} />
          ) : (
            <InternDashboard setCurrentPage={handlePageChange} />
          )
        )}
        
        {currentPage === 'admin' && <AdminPortal setCurrentPage={handlePageChange} />}
      </div>

      {/* Global Authentication Modal Component */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        setCurrentPage={handlePageChange}
      />

      {/* Footer Rendered at the Bottom with Props */}
      <Footer currentPage={currentPage} setCurrentPage={handlePageChange} />

    </div>
  );
}