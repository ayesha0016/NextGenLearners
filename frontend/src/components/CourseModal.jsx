import React, { useState } from 'react';

export default function CourseModal({ isOpen, onClose, courseTitle, coursePrice }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentScreenshot: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    if (e.target.name === 'paymentScreenshot') {
      setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('courseTitle', courseTitle);
    data.append('coursePrice', coursePrice);
    if (formData.paymentScreenshot) {
      data.append('paymentScreenshot', formData.paymentScreenshot);
    }

    try {
      const response = await fetch('http://localhost:5000/api/course-register', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enrollment');
      }

      setMessage('Course enrollment submitted! We will verify your payment and email you access details.');
      setFormData({ fullName: '', email: '', phone: '', paymentScreenshot: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-viewport fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="modal-panel bg-[#111827] border border-gray-800 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl cursor-pointer">
          &times;
        </button>

        <span className="text-mintAccent font-mono text-xs uppercase tracking-wider bg-mintAccent/10 px-2.5 py-1 rounded-md">
          Course Enrollment ({coursePrice})
        </span>

        <h2 className="text-2xl font-bold text-white mt-3 mb-1">
          {courseTitle}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Submit your details and payment screenshot to confirm your seat for this track.
        </p>

        {message && <div className="mb-4 p-3 bg-green-500/10 border border-green-500 text-green-400 rounded-lg text-sm">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg text-sm">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" 
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
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" 
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
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" 
              placeholder="0300-1234567" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Upload Fee Payment Screenshot</label>
            <input 
              type="file" 
              name="paymentScreenshot"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-mintAccent file:text-darkBg hover:file:bg-mintHover cursor-pointer" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-mintAccent text-darkBg font-bold py-3 rounded-xl hover:bg-mintHover transition-all mt-4 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Complete Enrollment'}
          </button>
        </form>

      </div>
    </div>
  );
}