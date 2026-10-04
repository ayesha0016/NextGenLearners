import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config'; // Make sure the path matches your folder structure (e.g., './config' if it's in the same folder)

export default function InternDashboard({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Build Landing Page Components with React & Tailwind', status: 'Completed', deadline: '2026-09-10' },
    { id: 2, title: 'Implement REST API Integration with Axios', status: 'In Progress', deadline: '2026-09-15' },
    { id: 3, title: 'Configure Database Schemas & Authentication', status: 'Pending', deadline: '2026-09-20' }
  ]);
  const [submissionsHistory, setSubmissionsHistory] = useState([]);
  const [assignedMentor, setAssignedMentor] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Fetch Intern Submissions & Assigned Mentor based on Domain
  useEffect(() => {
    const fetchInternData = async () => {
      try {
        // Fetch mentor assigned to intern's domain
        const mentorRes = await axios.get(`${API_URL}/api/mentors/domain/${user.domain || 'Web Development'}`);
        setAssignedMentor(mentorRes.data.mentor);

        // Fetch submissions history to show live status & rank points
        const subRes = await axios.get(`${API_URL}/api/submissions/intern/${user.id}`);
        setSubmissionsHistory(subRes.data.submissions || []);
      } catch (error) {
        console.error('Error fetching intern data:', error);
      }
    };
    if (user.id) fetchInternData();
  }, [user.id, user.domain]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    if (setCurrentPage) {
      setCurrentPage('home');
    } else {
      window.location.reload();
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask || !submissionLink) return;
    
    const taskObj = tasks.find(t => t.id === Number(selectedTask));

    try {
      const response = await axios.post(`${API_URL}/api/submissions`, {
        userId: user.id || null,
        internName: user.name || 'Intern',
        domain: user.domain,
        mentorId: assignedMentor ? assignedMentor._id : null, // Direct to domain mentor
        taskId: Number(selectedTask),
        taskTitle: taskObj ? taskObj.title : 'Unknown Task',
        githubLink: submissionLink,
        linkedinLink: linkedinLink,
        status: 'Pending'
      });

      setMessage(response.data.message || 'Assignment submitted successfully to your mentor!');
      setTasks(tasks.map(t => t.id === Number(selectedTask) ? { ...t, status: 'In Progress (Review)' } : t));
      
      setSubmissionLink('');
      setLinkedinLink('');
      setSelectedTask('');

      // Refresh history
      const subRes = await axios.get(`${API_URL}/api/submissions/intern/${user.id}`);
      setSubmissionsHistory(subRes.data.submissions || []);

    } catch (error) {
      console.error('Submission failed:', error);
      setMessage('Failed to submit assignment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8 mb-8 shadow-xl gap-4">
        <div>
          <span className="px-3 py-1 bg-mintAccent/10 border border-mintAccent/30 text-mintAccent text-xs font-mono font-semibold rounded-full">
            INTERN PORTAL • Domain: {user.domain || 'General'}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">Welcome back, {user.name || 'Intern'}! 🚀</h1>
          <p className="text-sm text-gray-400 mt-1">
            Assigned Mentor: <span className="text-mintAccent font-semibold">{assignedMentor ? assignedMentor.name : 'Allocating based on domain...'}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentPage && setCurrentPage('home')}
            className="px-4 py-2 bg-[#1f2937] hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold transition cursor-pointer border border-gray-700"
          >
            Back to Home
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-4 mb-8 overflow-x-auto">
        {['overview', 'tasks', 'resources'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold capitalize transition cursor-pointer ${
              activeTab === tab
                ? 'bg-mintAccent text-darkBg shadow-lg shadow-mintAccent/20'
                : 'bg-[#111827] text-gray-400 border border-gray-800 hover:text-white hover:border-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">
              <p className="text-xs text-gray-400 font-medium">Total Tasks</p>
              <h3 className="text-3xl font-bold text-white mt-2">{tasks.length}</h3>
              <span className="text-xs text-mintAccent mt-1 block font-mono">Assigned for Batch</span>
            </div>
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">
              <p className="text-xs text-gray-400 font-medium">Evaluated / Rank Points</p>
              <h3 className="text-3xl font-bold text-green-400 mt-2">
                {submissionsHistory.reduce((acc, curr) => acc + (curr.rankPoints || 0), 0)} pts
              </h3>
              <span className="text-xs text-gray-400 mt-1 block font-mono">Awarded by Mentor</span>
            </div>
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">
              <p className="text-xs text-gray-400 font-medium">Current Status</p>
              <h3 className="text-xl font-bold text-mintAccent mt-3">Active Intern</h3>
              <span className="text-xs text-gray-400 mt-1 block font-mono">NextGen Learners</span>
            </div>
          </div>

          {/* Live Task Updates & Feedback Section */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-4">Submission Live Status & Mentor Feedback</h2>
            <div className="space-y-3">
              {submissionsHistory.length === 0 ? (
                <p className="text-xs text-gray-400">No submissions made yet. Submit a task from the Tasks tab.</p>
              ) : (
                submissionsHistory.map(sub => (
                  <div key={sub._id} className="p-4 bg-[#1f2937]/50 border border-gray-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{sub.taskTitle}</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Link: <a href={sub.githubLink} target="_blank" rel="noreferrer" className="text-mintAccent underline">{sub.githubLink}</a>
                      </p>
                      {sub.feedback && <p className="text-xs text-yellow-300 mt-1">Mentor Feedback: {sub.feedback}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      {sub.status === 'Reviewed' && (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/30">
                          +{sub.rankPoints || 0} Points
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                        sub.status === 'Reviewed' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tasks Tab Content */}
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-4">Submit Your Assignment to Mentor</h2>
            {message && <div className="mb-4 p-3 bg-mintAccent/10 border border-mintAccent text-mintAccent rounded-xl text-xs">{message}</div>}
            
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Select Task</label>
                <select 
                  value={selectedTask} 
                  onChange={(e) => setSelectedTask(e.target.value)}
                  required
                  className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent"
                >
                  <option value="">-- Choose Task --</option>
                  {tasks.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">GitHub Repository / Live Demo URL</label>
                <input 
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://github.com/your-username/repo"
                  required
                  className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">LinkedIn Post URL (Optional)</label>
                <input 
                  type="url"
                  value={linkedinLink}
                  onChange={(e) => setLinkedinLink(e.target.value)}
                  placeholder="https://www.linkedin.com/posts/your-post-link"
                  className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-mintAccent text-darkBg font-bold py-3 rounded-xl hover:bg-mintHover transition cursor-pointer text-sm shadow-lg shadow-mintAccent/20"
              >
                Send Directly to Mentor
              </button>
            </form>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-4">All Assigned Tasks</h2>
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="p-4 bg-[#1f2937]/50 border border-gray-800 rounded-2xl">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                    <span className="text-xs text-mintAccent font-mono">{task.status}</span>
                  </div>
                  <p className="text-xs text-gray-400">Due date: {task.deadline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resources Tab Content */}
      {activeTab === 'resources' && (
        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-white mb-4">Internship Resources & Guidelines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#1f2937]/50 border border-gray-800 rounded-2xl">
              <h3 className="text-sm font-bold text-mintAccent mb-1">React & Tailwind Starter Docs</h3>
              <p className="text-xs text-gray-400 mb-3">Access boilerplate code and component libraries for your frontend tasks.</p>
              <span className="text-xs font-mono text-gray-300 underline cursor-pointer">Access Repository &rarr;</span>
            </div>
            <div className="p-5 bg-[#1f2937]/50 border border-gray-800 rounded-2xl">
              <h3 className="text-sm font-bold text-mintAccent mb-1">Backend API Guidelines</h3>
              <p className="text-xs text-gray-400 mb-3">Postman collection, database connection strings, and middleware instructions.</p>
              <span className="text-xs font-mono text-gray-300 underline cursor-pointer">Download Guide &rarr;</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}