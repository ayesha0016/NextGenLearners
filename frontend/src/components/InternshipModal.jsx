import React, { useState } from 'react';

export default function InternshipModal({ isOpen, onClose, preSelectedDomain }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    domain: preSelectedDomain || 'Web Development Internship'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const domains = [
    "Web Development Internship",
    "Data Science Internship",
    "AI Tools & Prompt Engineering Internship",
    "Graphic Design Internship"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/internship-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit internship application');
      }

      setMessage('Internship application submitted successfully!');
      setFormData({ fullName: '', email: '', phone: '', domain: 'Web Development Internship' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-viewport fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="modal-panel bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl cursor-pointer">
          &times;
        </button>

        <span className="text-mintAccent font-mono text-[10px] uppercase tracking-wider bg-mintAccent/10 px-2 py-0.5 rounded-md">
          Internship Application
        </span>

        <h2 className="text-xl md:text-2xl font-bold text-white mt-2 mb-1">
          Apply for Cohort
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Fill out your details and select your preferred track.
        </p>

        {message && <div className="mb-3 p-2.5 bg-green-500/10 border border-green-500 text-green-400 rounded-lg text-xs">{message}</div>}
        {error && <div className="mb-3 p-2.5 bg-red-500/10 border border-red-500 text-red-400 rounded-lg text-xs">{error}</div>}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mintAccent" 
              placeholder="John Doe" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mintAccent" 
              placeholder="you@example.com" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Phone / WhatsApp Number</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mintAccent" 
              placeholder="0300-1234567" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Select Internship Track (Domain)</label>
            <select 
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mintAccent cursor-pointer"
            >
              {domains.map((d, index) => (
                <option key={index} value={d} className="bg-[#111827] text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-mintAccent text-darkBg font-bold py-2.5 rounded-xl hover:bg-mintHover transition-all mt-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

      </div>
    </div>
  );
}