import React, { useState } from 'react';
import AuthModal from './AuthModal';

export default function CtaBanner() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <section className="bg-darkBg text-white py-20 px-6 md:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Card with Radial Green Gradient & Subtle Mint Border */}
        <div className="relative rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d3b2c] via-[#09221b] to-[#071310] border border-mintAccent/30 p-12 md:p-24 text-center overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Background Glow */}
          <div className="absolute inset-0 bg-mintAccent/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Batch 2 enrollment is open.
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base">
              Limited seats per track — reserve yours before the cohort fills up.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="bg-gradient-to-r from-[#00f89a] to-[#00d27d] hover:from-[#00df86] hover:to-[#00bd6f] text-darkBg font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,250,154,0.35)] hover:shadow-[0_0_35px_rgba(0,250,154,0.55)] cursor-pointer"
              >
                Create your free account →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Auth Modal (Signup Mode) */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode="signup" 
      />
    </section>
  );
}