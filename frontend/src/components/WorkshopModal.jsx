import React, { useState } from 'react';

export default function WorkshopModal({ isOpen, onClose, workshopTitle }) {
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
    data.append('workshopTitle', workshopTitle);
    if (formData.paymentScreenshot) {
      data.append('paymentScreenshot', formData.paymentScreenshot);
    }

    try {
      const response = await fetch('http://localhost:5000/api/workshop-register', {
        method: 'POST',
        body: data 
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit registration');
      }

      setMessage('Workshop registration successful!');
      setFormData({ fullName: '', email: '', phone: '', paymentScreenshot: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-viewport fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="modal-panel bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-7 w-full max-w-md shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg cursor-pointer">
          &times;
        </button>

        <span className="text-mintAccent font-mono text-[10px] uppercase tracking-wider bg-mintAccent/10 px-2 py-0.5 rounded-md">
          Workshop Registration
        </span>

        <h2 className="text-xl md:text-2xl font-bold text-white mt-2 mb-1 truncate pr-6">
          {workshopTitle}
        </h2>
        <p className="text-xs text-gray-400 mb-3">
          Fill your details and upload your payment receipt screenshot.
        </p>

        {message && <div className="mb-2.5 p-2 bg-green-500/10 border border-green-500 text-green-400 rounded-lg text-xs">{message}</div>}
        {error && <div className="mb-2.5 p-2 bg-red-500/10 border border-red-500 text-red-400 rounded-lg text-xs">{error}</div>}

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
            <label className="text-xs text-gray-400 font-medium">Upload Payment Screenshot</label>
            <input 
              type="file" 
              name="paymentScreenshot"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-mintAccent file:text-darkBg hover:file:bg-mintHover cursor-pointer" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-mintAccent text-darkBg font-bold py-2.5 rounded-xl hover:bg-mintHover transition-all mt-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            {loading ? 'Submitting...' : 'Confirm Registration'}
          </button>
        </form>

      </div>
    </div>
  );
}