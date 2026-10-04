import React, { useState, useEffect } from 'react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', setCurrentPage }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  
  // Selected Role inside the Modal ('intern' | 'mentor' | 'admin')
  const [selectedRole, setSelectedRole] = useState('intern');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode, isOpen]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Updated to use relative paths for Vercel production compatibility
    const endpoint = isLogin ? '/api/login' : '/api/signup';
    
    const bodyData = isLogin 
      ? { email: formData.email, password: formData.password, role: selectedRole }
      : { fullName: formData.fullName, email: formData.email, phone: formData.phone, password: formData.password, role: selectedRole };

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        // FORCE the selectedRole to take precedence so whatever you click in the modal is strictly honored
        const verifiedRole = selectedRole.toLowerCase();

        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', verifiedRole); 
        localStorage.setItem('user', JSON.stringify({ 
          ...(data.user || {}), 
          name: data.user?.fullName || data.user?.name || formData.email.split('@')[0], 
          role: verifiedRole 
        }));

        setMessage(`Login successful as ${verifiedRole.toUpperCase()}! Redirecting...`);
        setTimeout(() => {
          onClose();
          if (setCurrentPage) {
            setCurrentPage('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.location.reload();
          }
        }, 1000);
      } else {
        setMessage('Account created successfully! Logging you in...');
        
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password, role: selectedRole })
        });
        const loginData = await loginRes.json();
        
        if (loginRes.ok) {
          const verifiedRole = selectedRole.toLowerCase();

          localStorage.setItem('token', loginData.token);
          localStorage.setItem('userRole', verifiedRole);
          localStorage.setItem('user', JSON.stringify({ 
            ...(loginData.user || {}), 
            name: formData.fullName || loginData.user?.name || formData.email.split('@')[0], 
            role: verifiedRole 
          }));

          setTimeout(() => {
            onClose();
            if (setCurrentPage) {
              setCurrentPage('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.location.reload();
            }
          }, 1000);
        } else {
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-viewport fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="modal-panel bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative my-2 sm:my-8">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl cursor-pointer">
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-1">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mb-4">
          {isLogin ? 'Enter your credentials to access your portal' : 'Join NextGen Learners and start your tech journey'}
        </p>

        {/* Role Selector Grid */}
        <div className="mb-4 space-y-1.5">
          <label className="text-xs text-gray-400 font-medium">Select Access Role</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'intern', label: 'Intern' },
              { id: 'mentor', label: 'Mentor' },
              { id: 'admin', label: 'Admin' }
            ].map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`py-2 text-xs font-mono font-semibold rounded-xl border transition-all cursor-pointer ${
                  selectedRole === role.id
                    ? 'bg-mintAccent text-darkBg border-mintAccent shadow-lg shadow-mintAccent/20'
                    : 'bg-[#1f2937] text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {message && <div className="mb-3 p-2.5 bg-green-500/10 border border-green-500 text-green-400 rounded-lg text-xs">{message}</div>}
        {error && <div className="mb-3 p-2.5 bg-red-500/10 border border-red-500 text-red-400 rounded-lg text-xs">{error}</div>}

        <form className="space-y-3" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Full name</label>
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
          )}

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Email address</label>
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

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Phone number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mintAccent" 
                placeholder="+92 300 1234567" 
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mintAccent" 
              placeholder="••••••••" 
            />
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Confirm password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-[#1f2937] border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-mintAccent" 
                placeholder="••••••••" 
              />
            </div>
          )}

          <button type="submit" className="w-full bg-mintAccent text-darkBg font-bold py-2.5 rounded-xl hover:bg-mintHover transition-all mt-1 cursor-pointer text-sm">
            {isLogin ? `Log in as ${selectedRole.toUpperCase()}` : `Create ${selectedRole} account`}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setMessage(''); setError(''); }}
            className="text-mintAccent font-semibold cursor-pointer hover:underline ml-1"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>

      </div>
    </div>
  );
}