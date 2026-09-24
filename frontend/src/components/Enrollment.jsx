import React, { useState } from 'react';

export default function Enrollment() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    interestedTrack: 'Web Development',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          interestedTrack: formData.interestedTrack,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage('Account created successfully!');
      setFormData({ fullName: '', email: '', interestedTrack: 'Web Development', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center p-6 py-16">
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 md:p-12 w-full max-w-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
        <p className="text-sm text-gray-400 mb-8">Register for courses and internship programs</p>
        
        {message && <div className="mb-4 p-3 bg-green-500/10 border border-green-500 text-green-400 rounded-lg text-sm">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg text-sm">{error}</div>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium">Full name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mintAccent" 
              placeholder="Ayesha Siddiqui" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mintAccent" 
              placeholder="you@example.com" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium">Interested track</label>
            <select 
              name="interestedTrack"
              value={formData.interestedTrack}
              onChange={handleChange}
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mintAccent cursor-pointer"
            >
              <option>Web Development</option>
              <option>Mobile App Development</option>
              <option>UI/UX Design</option>
              <option>Data Science</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-medium">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mintAccent" 
                placeholder="At least 8 characters" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-400 font-medium">Confirm password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mintAccent" 
                placeholder="Repeat password" 
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-mintAccent text-darkBg font-bold py-4 rounded-xl hover:bg-mintAccent/90 transition-all cursor-pointer">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}