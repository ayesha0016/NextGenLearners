import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Check,
  Star
} from 'lucide-react';
import Hero from './Hero';
import axios from 'axios';
import { API_URL } from '../config'; // Make sure the path matches your folder structure

export default function MentorDashboard({ onSignOut }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    role: 'mentor',
    domain: 'Web Development'
  });
  
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [reviewedSubmissions, setReviewedSubmissions] = useState([]);
  const [mentees, setMentees] = useState([]);
  
  // Evaluation Modal / Input State
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [rankPoints, setRankPoints] = useState(10);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        fetchMentorData(parsed.id || parsed._id, parsed.domain);
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
  }, []);

  const fetchMentorData = async (mentorId, domain) => {
    try {
      // Fetch submissions targeted for this mentor
      const subRes = await axios.get(`${API_URL}/api/submissions/mentor/${mentorId}`);
      const allSubs = subRes.data.submissions || [];
      
      setPendingSubmissions(allSubs.filter(s => s.status === 'Pending'));
      setReviewedSubmissions(allSubs.filter(s => s.status === 'Reviewed'));

      // Fetch domain specific mentees registered under this mentor's domain
      const menteesRes = await axios.get(`${API_URL}/api/interns/domain/${domain || 'Web Development'}`);
      setMentees(menteesRes.data.interns || []);
    } catch (err) {
      console.error("Error fetching mentor workspace data:", err);
    }
  };

  const handleEvaluateSubmission = async (subId) => {
    try {
      await axios.put(`${API_URL}/api/submissions/evaluate/${subId}`, {
        rankPoints: Number(rankPoints),
        feedback: feedback,
        status: 'Reviewed'
      });

      // Refresh data
      fetchMentorData(user.id || user._id, user.domain);
      setSelectedSubId(null);
      setFeedback('');
      setRankPoints(10);
    } catch (error) {
      console.error("Evaluation failed:", error);
    }
  };

  const handleSignOutClick = () => {
    setIsLoggedOut(true);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    if (typeof onSignOut === 'function') {
      onSignOut();
    }
  };

  if (isLoggedOut) {
    return <Hero />;
  }

  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'ME';

  return (
    <div className="mentor-dashboard flex min-h-screen bg-[#07090e] text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="mentor-sidebar w-64 shrink-0 bg-[#0b0f17] border-r border-[#131d2e] flex flex-col justify-between select-none">
        <div>
          {/* Logo Brand */}
          <div className="p-5 flex items-center gap-3 border-b border-[#131d2e]">
            <div className="w-10 h-10 rounded-xl bg-[#00f59b]/10 border border-[#00f59b]/30 flex items-center justify-center text-[#00f59b] font-bold">
              NG
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide">Mentor Portal</h1>
              <p className="text-[11px] text-[#00f59b] font-medium">Domain: {user.domain}</p>
            </div>
          </div>

          {/* Current Role Badge Section */}
          <div className="px-5 py-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">Access Level</p>
            <div className="inline-block px-3 py-1 rounded-full bg-[#00f59b]/10 border border-[#00f59b]/20 text-[#00f59b] text-xs font-semibold capitalize">
              {user.role}
            </div>
          </div>

          {/* Workspace Navigation */}
          <div className="px-3 py-2">
            <p className="px-3 text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">Management</p>
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'submissions', label: 'Review Queue (New vs Reviewed)', icon: FileText },
                { id: 'mentees', label: 'Domain Mentees', icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#00f59b] text-[#07090e] font-semibold shadow-lg shadow-[#00f59b]/20' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#131d2e]/50'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-[#131d2e] bg-[#0b0f17]/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#00f59b]/10 border border-[#00f59b]/30 flex items-center justify-center text-[#00f59b] font-bold text-xs">
              {initials}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-semibold text-white truncate">{user.name || 'Mentor'}</h4>
              <p className="text-[10px] text-gray-400 capitalize">{user.domain}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOutClick}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-800 bg-[#131d2e]/40 text-gray-300 text-xs font-medium hover:bg-[#131d2e] hover:text-white transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="mentor-main flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#07090e]">
        {/* Top Header */}
        <header className="h-16 border-b border-[#131d2e] bg-[#0b0f17]/85 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-semibold text-gray-200 capitalize">Mentor Workspace / {activeTab}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl border border-[#131d2e] bg-[#0b0f17] flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Bell size={16} />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#00f59b]/10 border border-[#00f59b]/30 flex items-center justify-center text-[#00f59b] font-bold text-xs">
              {initials}
            </div>
          </div>
        </header>

        {/* Dynamic Views */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {activeTab === 'overview' && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Welcome, {user.name || 'Mentor'}</h2>
                <p className="text-xs text-gray-400 mt-1">Manage your domain mentees, evaluate assignments, and distribute rank points.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#0b0f17] border border-[#131d2e] rounded-2xl p-6 shadow-lg">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">New Submissions (Pending)</p>
                  <h4 className="text-2xl font-bold text-white mt-2">{pendingSubmissions.length}</h4>
                  <p className="text-[11px] text-[#00f59b] mt-1">Awaiting evaluation</p>
                </div>
                <div className="bg-[#0b0f17] border border-[#131d2e] rounded-2xl p-6 shadow-lg">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Domain Mentees</p>
                  <h4 className="text-2xl font-bold text-white mt-2">{mentees.length}</h4>
                  <p className="text-[11px] text-gray-400 mt-1">Registered in {user.domain}</p>
                </div>
                <div className="bg-[#0b0f17] border border-[#131d2e] rounded-2xl p-6 shadow-lg">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Reviewed Total</p>
                  <h4 className="text-2xl font-bold text-white mt-2">{reviewedSubmissions.length}</h4>
                  <p className="text-[11px] text-gray-400 mt-1">Completed evaluations</p>
                </div>
              </div>

              {/* Quick Pending Box */}
              <div className="bg-[#0b0f17] border border-[#131d2e] rounded-2xl p-6 shadow-lg space-y-4">
                <h3 className="text-sm font-bold text-white">Recent New Submissions</h3>
                {pendingSubmissions.length === 0 ? (
                  <p className="text-xs text-gray-400">No new submissions right now from your domain mentees.</p>
                ) : (
                  <div className="space-y-3">
                    {pendingSubmissions.slice(0, 3).map((sub) => (
                      <div key={sub._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#07090e] border border-[#131d2e] rounded-xl gap-3">
                        <div>
                          <h4 className="text-xs font-bold text-white">{sub.taskTitle}</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">Intern: <span className="text-white font-semibold">{sub.internName}</span> • <a href={sub.githubLink} target="_blank" rel="noreferrer" className="text-[#00f59b] underline">View Repo</a></p>
                        </div>
                        <button 
                          onClick={() => setActiveTab('submissions')}
                          className="px-3 py-1.5 rounded-lg bg-[#00f59b]/10 border border-[#00f59b]/30 text-[#00f59b] text-xs font-semibold hover:bg-[#00f59b] hover:text-[#07090e] transition-all cursor-pointer"
                        >
                          Review Now
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Review Queue</h2>
                <p className="text-xs text-gray-400 mt-1">Manage new assignments and check already reviewed submissions separately.</p>
              </div>

              {/* 1. New Submissions Section */}
              <div className="bg-[#0b0f17] border border-[#131d2e] rounded-2xl p-6 shadow-lg space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> New Submissions ({pendingSubmissions.length})
                </h3>
                {pendingSubmissions.length === 0 ? (
                  <p className="text-xs text-gray-400">No new submissions to review.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingSubmissions.map((sub) => (
                      <div key={sub._id} className="p-4 bg-[#07090e] border border-[#131d2e] rounded-xl space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-bold text-white">{sub.taskTitle}</h4>
                            <p className="text-[11px] text-gray-400 mt-0.5">Intern: <span className="text-white font-medium">{sub.internName}</span></p>
                            <a href={sub.githubLink} target="_blank" rel="noreferrer" className="text-xs text-[#00f59b] underline block mt-1">GitHub / Demo Link &rarr;</a>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-mono">Pending</span>
                        </div>

                        {/* Evaluation Form for this Sub */}
                        <div className="pt-3 border-t border-[#131d2e] flex flex-col sm:flex-row gap-3 items-center">
                          <div className="w-full sm:w-1/3">
                            <label className="text-[10px] text-gray-400 block mb-1">Rank Points</label>
                            <input 
                              type="number"
                              value={rankPoints}
                              onChange={(e) => setRankPoints(e.target.value)}
                              className="w-full bg-[#131d2e] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white"
                              placeholder="Points e.g. 15"
                            />
                          </div>
                          <div className="w-full sm:w-1/2">
                            <label className="text-[10px] text-gray-400 block mb-1">Feedback</label>
                            <input 
                              type="text"
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              className="w-full bg-[#131d2e] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white"
                              placeholder="Write helpful feedback..."
                            />
                          </div>
                          <button 
                            onClick={() => handleEvaluateSubmission(sub._id)}
                            className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 bg-[#00f59b] text-[#07090e] font-bold rounded-lg text-xs hover:bg-[#00d487] transition cursor-pointer"
                          >
                            Submit Review & Rank
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Reviewed Section */}
              <div className="bg-[#0b0f17] border border-[#131d2e] rounded-2xl p-6 shadow-lg space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span> Reviewed Assignments ({reviewedSubmissions.length})
                </h3>
                {reviewedSubmissions.length === 0 ? (
                  <p className="text-xs text-gray-400">No reviewed submissions yet.</p>
                ) : (
                  <div className="space-y-3">
                    {reviewedSubmissions.map((sub) => (
                      <div key={sub._id} className="p-4 bg-[#07090e] border border-[#131d2e] rounded-xl flex justify-between items-center">
                        <div>
                          <h4 className="text-xs font-bold text-white">{sub.taskTitle}</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">Intern: {sub.internName} • <span className="text-yellow-300">Feedback: {sub.feedback}</span></p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono font-bold">
                            +{sub.rankPoints} Points
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'mentees' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Domain Mentees ({user.domain})</h2>
                <p className="text-xs text-gray-400 mt-1">Interns who registered under your domain and are automatically mapped to you.</p>
              </div>
              <div className="bg-[#0b0f17] border border-[#131d2e] rounded-2xl p-6 shadow-lg">
                {mentees.length === 0 ? (
                  <div className="text-center py-8">
                    <Users size={36} className="mx-auto text-[#00f59b] mb-2" />
                    <h3 className="text-base font-semibold text-white">No mentees found in this domain</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">Mentees registering with domain '{user.domain}' will automatically appear here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mentees.map((m) => (
                      <div key={m._id} className="p-4 bg-[#07090e] border border-[#131d2e] rounded-xl flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white">{m.name}</h4>
                          <p className="text-[11px] text-gray-400">{m.email}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#00f59b]/10 text-[#00f59b] text-[10px] font-mono">Active</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}