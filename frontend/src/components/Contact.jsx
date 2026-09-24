// src/components/Contact.jsx
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Course enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Yahan aap apna backend/email sending logic laga sakte hain
  };

  return (
    <div className="min-h-screen bg-darkBg text-white py-16 px-6 md:px-16 space-y-24">
      
      {/* Section Header */}
      <ScrollReveal>
        <div className="max-w-4xl space-y-4">
          <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
            — CONTACT
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Questions? We reply within <span className="text-mintAccent">1–2 business days.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Reach out about courses, internships, workshops, or partnerships — whatever's on your mind.
          </p>
        </div>
      </ScrollReveal>

      {/* Contact Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-cardBg border border-gray-800 rounded-3xl p-8 md:p-10 space-y-8">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-mintAccent/10 text-mintAccent border border-mintAccent/30 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold">Message sent successfully!</h3>
              <p className="text-gray-400 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-mintAccent text-sm font-semibold underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
                    Full name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ayesha Siddiqui" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-darkBg border border-gray-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-mintAccent transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
                    Email
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-darkBg border border-gray-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-mintAccent transition-colors"
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
                  Subject
                </label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-darkBg border border-gray-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-mintAccent transition-colors cursor-pointer"
                >
                  <option value="Course enquiry">Course enquiry</option>
                  <option value="Internship program">Internship program</option>
                  <option value="Workshop & Training">Workshop & Training</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
                  Message
                </label>
                <textarea 
                  rows="5"
                  required
                  placeholder="Tell us what you're looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-darkBg border border-gray-800 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-mintAccent transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-mintAccent text-darkBg hover:bg-[#00df86] font-bold text-sm py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,250,154,0.2)] hover:shadow-[0_0_30px_rgba(0,250,154,0.4)] cursor-pointer"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <span className="text-mintAccent font-mono text-xs tracking-wider uppercase">
              — REACH US DIRECTLY
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Prefer email or a call?
            </h2>
          </div>

          <div className="space-y-4">
            
            {/* Email Card */}
            <div className="bg-cardBg border border-gray-800 rounded-2xl p-6 space-y-1 hover:border-mintAccent/40 transition-colors">
              <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
                <span>📧</span> Email
              </div>
              <p className="text-mintAccent font-medium text-base pt-1">
                hello@nextgenlearners.dev
              </p>
            </div>

            {/* Phone Card */}
            <div className="bg-cardBg border border-gray-800 rounded-2xl p-6 space-y-1 hover:border-mintAccent/40 transition-colors">
              <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
                <span>📞</span> Phone
              </div>
              <p className="text-mintAccent font-medium text-base pt-1">
                +92 300 0000000
              </p>
            </div>

            {/* Location Card */}
            <div className="bg-cardBg border border-gray-800 rounded-2xl p-6 space-y-1 hover:border-mintAccent/40 transition-colors">
              <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
                <span>📍</span> Location
              </div>
              <p className="text-gray-300 font-medium text-sm pt-1 leading-relaxed">
                Sukkur, Sindh, Pakistan — cohorts run fully online.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}