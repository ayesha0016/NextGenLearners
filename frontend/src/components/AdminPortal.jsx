import React, { useState, useEffect } from 'react';
import afeefaImg from '../assets/images/Afeefa.jpeg';
import salarImg from '../assets/images/Salar.jpeg';
import ayeshaImg from '../assets/images/Ayesha.jpeg';
import hammadImg from '../assets/images/Hammad.jpeg';
import mudasirImg from '../assets/images/Mudasir.jpeg';
import zohaImg from '../assets/images/Zoha.jpeg';

// Asset map to handle named imports safely in dynamic forms
const assetMap = {
  'Afeefa.jpeg': afeefaImg,
  'Salar.jpeg': salarImg,
  'Ayesha.jpeg': ayeshaImg,
  'Hammad.jpeg': hammadImg,
  'Mudasir.jpeg': mudasirImg,
  'Zoha.jpeg': zohaImg,
  'afeefa.jpeg': afeefaImg,
  'salar.jpeg': salarImg,
  'ayesha.jpeg': ayeshaImg,
  'hammad.jpeg': hammadImg,
  'mudasir.jpeg': mudasirImg,
  'zoha.jpeg': zohaImg
};

export default function AdminPortal({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('internships');
  const [successMessage, setSuccessMessage] = useState('');

  // Track which item ID is currently being edited (null means creating new)
  const [editingId, setEditingId] = useState(null);

  // Load initial states from localStorage (or use defaults if empty)
  const [internshipsList, setInternshipsList] = useState(() => {
    const saved = localStorage.getItem('site_internships');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Web Development Internship', description: 'Build a production-style full-stack feature for a simulated client.', duration: '4–6 weeks, remote', featureTwo: 'Team code reviews via GitHub', perk: 'Completion certificate + reference letter' }
    ];
  });

  const [workshopsList, setWorkshopsList] = useState(() => {
    const saved = localStorage.getItem('site_workshops');
    return saved ? JSON.parse(saved) : [
      { id: 1, tag: 'WEB DEVELOPMENT', title: 'Responsive Websites in a Weekend', description: 'Build and deploy a fully responsive landing page using HTML, CSS and Flexbox/Grid.', duration: '2 days', mode: 'Live, online', price: 'PKR 2,000' }
    ];
  });

  const [coursesList, setCoursesList] = useState(() => {
    const saved = localStorage.getItem('site_courses');
    return saved ? JSON.parse(saved) : [
      { id: 1, tag: 'WEB DEVELOPMENT', title: 'Full-Stack Web Development', description: 'HTML, CSS, JavaScript, React, Node.js & MongoDB.', duration: '12 weeks', level: 'Beginner friendly', format: 'Live + recorded', price: 'PKR 15,000' }
    ];
  });

  const [teamList, setTeamList] = useState(() => {
    const saved = localStorage.getItem('site_team');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Afeefa Qureshi', role: 'Founder', bio: 'Visionary leader driving the mission of practical tech education.', image: afeefaImg, linkedin: '', github: '' },
    ];
  });

  const [internsList, setInternsList] = useState(() => {
    const saved = localStorage.getItem('site_interns');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'Ali Khan', 
        email: 'alikhan@example.com', 
        track: 'Web Development Internship', 
        status: 'Active Intern',
        tasks: [
          { id: 101, title: 'Build Landing Page Components with React & Tailwind', deadline: '2026-09-10', status: 'Completed' },
          { id: 102, title: 'Implement REST API Integration with Axios', deadline: '2026-09-15', status: 'In Progress' },
          { id: 103, title: 'Configure Database Schemas & Authentication', deadline: '2026-09-20', status: 'Pending' }
        ]
      }
    ];
  });

  const [mentorsList, setMentorsList] = useState(() => {
    const saved = localStorage.getItem('site_mentors');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Dr. Ahmed', email: 'ahmed@example.com', expertise: 'Full-Stack Engineering', status: 'Approved', pendingReviews: 2, assignedMenteesCount: 4, reviewedTotal: 15 }
    ];
  });

  const [mentorSchedulesList, setMentorSchedulesList] = useState(() => {
    const saved = localStorage.getItem('admin_mentor_schedules');
    return saved ? JSON.parse(saved) : [
      { id: 1, mentorName: 'Dr. Ahmed', sessionTitle: 'React State Management Review', date: '2026-09-08', time: '4:00 PM' }
    ];
  });

  // Sync changes to localStorage automatically
  useEffect(() => { localStorage.setItem('site_internships', JSON.stringify(internshipsList)); }, [internshipsList]);
  useEffect(() => { localStorage.setItem('site_workshops', JSON.stringify(workshopsList)); }, [workshopsList]);
  useEffect(() => { localStorage.setItem('site_courses', JSON.stringify(coursesList)); }, [coursesList]);
  useEffect(() => { localStorage.setItem('site_team', JSON.stringify(teamList)); }, [teamList]);
  useEffect(() => { localStorage.setItem('site_interns', JSON.stringify(internsList)); }, [internsList]);
  useEffect(() => { localStorage.setItem('site_mentors', JSON.stringify(mentorsList)); }, [mentorsList]);
  useEffect(() => { localStorage.setItem('admin_mentor_schedules', JSON.stringify(mentorSchedulesList)); }, [mentorSchedulesList]);

  // Form States
  const [internshipForm, setInternshipForm] = useState({ title: '', description: '', duration: '4–6 weeks, remote', featureTwo: 'Team code reviews via GitHub', perk: 'Completion certificate + reference letter' });
  const [workshopForm, setWorkshopForm] = useState({ tag: 'WEB DEVELOPMENT', title: '', description: '', duration: '2 days', mode: 'Live, online', price: 'PKR 2,000' });
  const [courseForm, setCourseForm] = useState({ tag: 'WEB DEVELOPMENT', title: '', description: '', duration: '12 weeks', level: 'Beginner friendly', format: 'Live + recorded', price: 'PKR 15,000' });
  
  // Team Form updated with image file support
  const [teamForm, setTeamForm] = useState({ image: afeefaImg, name: '', role: 'Founder', bio: '', linkedin: '', github: '' });
  
  const [internForm, setInternForm] = useState({
    name: '',
    email: '',
    track: 'Web Development Internship',
    status: 'Active Intern',
    tasks: [
      { id: Date.now(), title: 'Build Landing Page Components with React & Tailwind', deadline: '2026-09-10', status: 'Completed' },
      { id: Date.now() + 1, title: 'Implement REST API Integration with Axios', deadline: '2026-09-15', status: 'In Progress' },
      { id: Date.now() + 2, title: 'Configure Database Schemas & Authentication', deadline: '2026-09-20', status: 'Pending' }
    ]
  });

  const [mentorForm, setMentorForm] = useState({
    name: '',
    email: '',
    expertise: '',
    status: 'Approved',
    pendingReviews: 0,
    assignedMenteesCount: 0,
    reviewedTotal: 0,
    sessionTitle: 'React State Management Review',
    sessionDate: '2026-09-08',
    sessionTime: '4:00 PM'
  });

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    setEditingId(null);
    resetForms();
  };

  const resetForms = () => {
    setInternshipForm({ title: '', description: '', duration: '4–6 weeks, remote', featureTwo: 'Team code reviews via GitHub', perk: 'Completion certificate + reference letter' });
    setWorkshopForm({ tag: 'WEB DEVELOPMENT', title: '', description: '', duration: '2 days', mode: 'Live, online', price: 'PKR 2,000' });
    setCourseForm({ tag: 'WEB DEVELOPMENT', title: '', description: '', duration: '12 weeks', level: 'Beginner friendly', format: 'Live + recorded', price: 'PKR 15,000' });
    setTeamForm({ image: afeefaImg, name: '', role: 'Founder', bio: '', linkedin: '', github: '' });
    setInternForm({
      name: '',
      email: '',
      track: 'Web Development Internship',
      status: 'Active Intern',
      tasks: [
        { id: Date.now(), title: 'Build Landing Page Components with React & Tailwind', deadline: '2026-09-10', status: 'Completed' },
        { id: Date.now() + 1, title: 'Implement REST API Integration with Axios', deadline: '2026-09-15', status: 'In Progress' },
        { id: Date.now() + 2, title: 'Configure Database Schemas & Authentication', deadline: '2026-09-20', status: 'Pending' }
      ]
    });
    setMentorForm({ name: '', email: '', expertise: '', status: 'Approved', pendingReviews: 0, assignedMenteesCount: 0, reviewedTotal: 0, sessionTitle: 'React State Management Review', sessionDate: '2026-09-08', sessionTime: '4:00 PM' });
  };

  const resolveImageSource = (imgVal) => {
    if (!imgVal) return afeefaImg;
    if (typeof imgVal === 'string' && assetMap[imgVal]) {
      return assetMap[imgVal];
    }
    return imgVal;
  };

  // Handle local device image file upload conversion to Base64
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamForm({ ...teamForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...internForm.tasks];
    updatedTasks[index][field] = value;
    setInternForm({ ...internForm, tasks: updatedTasks });
  };

  const addTaskField = () => {
    setInternForm({
      ...internForm,
      tasks: [...internForm.tasks, { id: Date.now(), title: '', deadline: '2026-09-25', status: 'Pending' }]
    });
  };

  const removeTaskField = (index) => {
    const updatedTasks = internForm.tasks.filter((_, i) => i !== index);
    setInternForm({ ...internForm, tasks: updatedTasks });
  };

  const handleSubmitForm = (moduleName, e) => {
    e.preventDefault();

    if (moduleName === 'Internships') {
      if (editingId) {
        setInternshipsList(internshipsList.map(item => item.id === editingId ? { ...item, ...internshipForm } : item));
        setSuccessMessage('Successfully updated internship item!');
      } else {
        setInternshipsList([{ id: Date.now(), ...internshipForm }, ...internshipsList]);
        setSuccessMessage('Successfully published new item to Internships!');
      }
      setInternshipForm({ title: '', description: '', duration: '4–6 weeks, remote', featureTwo: 'Team code reviews via GitHub', perk: 'Completion certificate + reference letter' });
    } else if (moduleName === 'Workshops') {
      if (editingId) {
        setWorkshopsList(workshopsList.map(item => item.id === editingId ? { ...item, ...workshopForm } : item));
        setSuccessMessage('Successfully updated workshop item!');
      } else {
        setWorkshopsList([{ id: Date.now(), ...workshopForm }, ...workshopsList]);
        setSuccessMessage('Successfully published new item to Workshops!');
      }
      setWorkshopForm({ tag: 'WEB DEVELOPMENT', title: '', description: '', duration: '2 days', mode: 'Live, online', price: 'PKR 2,000' });
    } else if (moduleName === 'Courses') {
      if (editingId) {
        setCoursesList(coursesList.map(item => item.id === editingId ? { ...item, ...courseForm } : item));
        setSuccessMessage('Successfully updated course item!');
      } else {
        setCoursesList([{ id: Date.now(), ...courseForm }, ...coursesList]);
        setSuccessMessage('Successfully published new item to Courses!');
      }
      setCourseForm({ tag: 'WEB DEVELOPMENT', title: '', description: '', duration: '12 weeks', level: 'Beginner friendly', format: 'Live + recorded', price: 'PKR 15,000' });
    } else if (moduleName === 'Team') {
      if (editingId) {
        setTeamList(teamList.map(item => item.id === editingId ? { ...item, ...teamForm } : item));
        setSuccessMessage('Successfully updated team member!');
      } else {
        setTeamList([...teamList, { id: Date.now(), ...teamForm }]);
        setSuccessMessage('Successfully published new item to Team!');
      }
      setTeamForm({ image: afeefaImg, name: '', role: 'Founder', bio: '', linkedin: '', github: '' });
    } else if (moduleName === 'Interns') {
      if (editingId) {
        setInternsList(internsList.map(item => item.id === editingId ? { ...item, ...internForm } : item));
        setSuccessMessage('Successfully updated intern account and milestones!');
      } else {
        setInternsList([{ id: Date.now(), ...internForm }, ...internsList]);
        setSuccessMessage('Successfully added new intern account and tasks!');
      }
      resetForms();
    } else if (moduleName === 'Mentors') {
      const schedulePayload = { id: editingId || Date.now(), mentorName: mentorForm.name, sessionTitle: mentorForm.sessionTitle, date: mentorForm.sessionDate, time: mentorForm.sessionTime };

      if (editingId) {
        setMentorsList(mentorsList.map(item => item.id === editingId ? { ...item, ...mentorForm } : item));
        setMentorSchedulesList(mentorSchedulesList.map(s => s.id === editingId ? schedulePayload : s));
        setSuccessMessage('Successfully updated mentor account and dashboard schedule!');
      } else {
        const newId = Date.now();
        setMentorsList([{ id: newId, ...mentorForm }, ...mentorsList]);
        setMentorSchedulesList([{ id: newId, ...schedulePayload }, ...mentorSchedulesList]);
        setSuccessMessage('Successfully added new mentor account and published dashboard schedule!');
      }
      setMentorForm({ name: '', email: '', expertise: '', status: 'Approved', pendingReviews: 0, assignedMenteesCount: 0, reviewedTotal: 0, sessionTitle: '', sessionDate: '', sessionTime: '' });
    }

    setEditingId(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditClick = (moduleName, item) => {
    setEditingId(item.id);
    if (moduleName === 'Internships') {
      setInternshipForm({ title: item.title, description: item.description, duration: item.duration, featureTwo: item.featureTwo, perk: item.perk });
    } else if (moduleName === 'Workshops') {
      setWorkshopForm({ tag: item.tag, title: item.title, description: item.description, duration: item.duration, mode: item.mode, price: item.price });
    } else if (moduleName === 'Courses') {
      setCourseForm({ tag: item.tag, title: item.title, description: item.description, duration: item.duration, level: item.level, format: item.format, price: item.price });
    } else if (moduleName === 'Team') {
      setTeamForm({ image: item.image, name: item.name, role: item.role, bio: item.bio || item.description || '', linkedin: item.linkedin || '', github: item.github || '' });
    } else if (moduleName === 'Interns') {
      setInternForm({
        name: item.name,
        email: item.email,
        track: item.track,
        status: item.status,
        tasks: item.tasks ? JSON.parse(JSON.stringify(item.tasks)) : []
      });
    } else if (moduleName === 'Mentors') {
      const linkedSchedule = mentorSchedulesList.find(s => s.id === item.id) || { sessionTitle: '', date: '', time: '' };
      setMentorForm({ 
        name: item.name, 
        email: item.email, 
        expertise: item.expertise, 
        status: item.status, 
        pendingReviews: item.pendingReviews || 0,
        assignedMenteesCount: item.assignedMenteesCount || 0,
        reviewedTotal: item.reviewedTotal || 0,
        sessionTitle: linkedSchedule.sessionTitle, 
        sessionDate: linkedSchedule.date, 
        sessionTime: linkedSchedule.time 
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (moduleName, id) => {
    if (editingId === id) {
      setEditingId(null);
      resetForms();
    }

    if (moduleName === 'Internships') {
      setInternshipsList(internshipsList.filter(item => item.id !== id));
    } else if (moduleName === 'Workshops') {
      setWorkshopsList(workshopsList.filter(item => item.id !== id));
    } else if (moduleName === 'Courses') {
      setCoursesList(coursesList.filter(item => item.id !== id));
    } else if (moduleName === 'Team') {
      setTeamList(teamList.filter(item => item.id !== id));
    } else if (moduleName === 'Interns') {
      setInternsList(internsList.filter(item => item.id !== id));
    } else if (moduleName === 'Mentors') {
      setMentorsList(mentorsList.filter(item => item.id !== id));
      setMentorSchedulesList(mentorSchedulesList.filter(schedule => schedule.id !== id));
    }

    setSuccessMessage(`Successfully deleted item from ${moduleName}!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <section className="relative bg-[#0b0f19] text-white min-h-screen py-10 px-4 md:px-12 overflow-hidden">
      <div className="absolute top-10 left-20 w-96 h-96 bg-mintAccent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Admin Top Header Card */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827] border border-gray-800 p-6 md:p-8 rounded-2xl shadow-xl">
          <div>
            <span className="text-mintAccent font-mono text-xs tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
              SECURITY_LEVEL: ADMIN_ROOT
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
              Platform Control <span className="text-mintAccent">Center.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              Add, update, or manage dynamic entries across internships, workshops, courses, team rosters, and integrated user portals.
            </p>
          </div>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-6 py-3 rounded-full transition-all text-sm cursor-pointer border border-gray-700 shadow-md"
          >
            ← Exit to Website
          </button>
        </div>

        {successMessage && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-xl text-sm font-medium animate-pulse">
            {successMessage}
          </div>
        )}

        {/* Management Module Tabs */}
        <div className="flex overflow-x-auto space-x-2 border-b border-gray-800 pb-3 scrollbar-none">
          {[
            { id: 'internships', label: 'Manage Internships' },
            { id: 'workshops', label: 'Manage Workshops' },
            { id: 'courses', label: 'Manage Courses' },
            { id: 'team', label: 'Manage Team' },
            { id: 'interns', label: 'Manage Intern Accounts & Tasks' },
            { id: 'mentors', label: 'Manage Mentor Accounts & Oversight' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabSwitch(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-mintAccent text-[#0b0f19] shadow-lg shadow-mintAccent/20 font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Forms & Management Container */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-12 shadow-2xl">
          
          {/* INTERNSHIPS ADMIN SECTION */}
          {activeTab === 'internships' && (
            <div className="space-y-8">
              <form onSubmit={(e) => handleSubmitForm('Internships', e)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Internship Opportunity' : 'Add New Internship Opportunity'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{editingId ? 'Modify active internship details below.' : 'Publish an internship track that directly populates the student internship board cards.'}</p>
                  </div>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); resetForms(); }} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
                      Cancel Editing
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Internship Title</label>
                    <input type="text" required value={internshipForm.title} onChange={(e) => setInternshipForm({...internshipForm, title: e.target.value})} placeholder="e.g. Web Development Internship" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Card Description / Overview</label>
                    <textarea rows="3" required value={internshipForm.description} onChange={(e) => setInternshipForm({...internshipForm, description: e.target.value})} placeholder="e.g. Build a production-style full-stack feature..." className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Duration & Mode Bullet</label>
                    <input type="text" required value={internshipForm.duration} onChange={(e) => setInternshipForm({...internshipForm, duration: e.target.value})} placeholder="e.g. 4–6 weeks, remote" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Second Feature Bullet</label>
                    <input type="text" required value={internshipForm.featureTwo} onChange={(e) => setInternshipForm({...internshipForm, featureTwo: e.target.value})} placeholder="e.g. Team code reviews via GitHub" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Certificate & Reward Bullet</label>
                    <input type="text" required value={internshipForm.perk} onChange={(e) => setInternshipForm({...internshipForm, perk: e.target.value})} placeholder="e.g. Completion certificate + reference letter" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                </div>
                <button type="submit" className="bg-mintAccent text-[#0b0f19] font-bold px-7 py-3 rounded-xl hover:bg-mintHover transition-all text-sm cursor-pointer shadow-lg shadow-mintAccent/20">
                  {editingId ? 'Update Internship Card 💾' : 'Publish Internship Card +'}
                </button>
              </form>

              <div className="pt-8 border-t border-gray-800 space-y-4">
                <h4 className="text-lg font-bold text-white">Active Internship Entries ({internshipsList.length})</h4>
                <div className="space-y-3">
                  {internshipsList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[#0b0f19] border border-gray-800 p-4 rounded-xl">
                      <div>
                        <h5 className="font-semibold text-sm text-white">{item.title}</h5>
                        <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button onClick={() => handleEditClick('Internships', item)} className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-gray-700">Edit</button>
                        <button onClick={() => handleDelete('Internships', item.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-red-500/30">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WORKSHOPS ADMIN SECTION */}
          {activeTab === 'workshops' && (
            <div className="space-y-8">
              <form onSubmit={(e) => handleSubmitForm('Workshops', e)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Workshop Card' : 'Add New Workshop Card'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{editingId ? 'Modify workshop details below.' : 'Create a workshop entry populated directly onto the student workshop cards.'}</p>
                  </div>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); resetForms(); }} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
                      Cancel Editing
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Category Tag Badge</label>
                    <input type="text" required value={workshopForm.tag} onChange={(e) => setWorkshopForm({...workshopForm, tag: e.target.value})} placeholder="e.g. WEB DEVELOPMENT" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent uppercase" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Workshop Title</label>
                    <input type="text" required value={workshopForm.title} onChange={(e) => setWorkshopForm({...workshopForm, title: e.target.value})} placeholder="e.g. Responsive Websites in a Weekend" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Description / Overview</label>
                    <textarea rows="3" required value={workshopForm.description} onChange={(e) => setWorkshopForm({...workshopForm, description: e.target.value})} placeholder="e.g. Build and deploy a fully responsive landing page..." className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Duration Badge</label>
                    <input type="text" required value={workshopForm.duration} onChange={(e) => setWorkshopForm({...workshopForm, duration: e.target.value})} placeholder="e.g. 2 days" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Mode Specification</label>
                    <input type="text" required value={workshopForm.mode} onChange={(e) => setWorkshopForm({...workshopForm, mode: e.target.value})} placeholder="e.g. Live, online" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Price / Fee Display</label>
                    <input type="text" required value={workshopForm.price} onChange={(e) => setWorkshopForm({...workshopForm, price: e.target.value})} placeholder="e.g. PKR 2,000" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                </div>
                <button type="submit" className="bg-mintAccent text-[#0b0f19] font-bold px-7 py-3 rounded-xl hover:bg-mintHover transition-all text-sm cursor-pointer shadow-lg shadow-mintAccent/20">
                  {editingId ? 'Update Workshop Card 💾' : 'Publish Workshop Card +'}
                </button>
              </form>

              <div className="pt-8 border-t border-gray-800 space-y-4">
                <h4 className="text-lg font-bold text-white">Active Workshop Entries ({workshopsList.length})</h4>
                <div className="space-y-3">
                  {workshopsList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[#0b0f19] border border-gray-800 p-4 rounded-xl">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-mintAccent bg-mintAccent/10 px-2 py-0.5 rounded font-mono">{item.tag}</span>
                          <h5 className="font-semibold text-sm text-white">{item.title}</h5>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button onClick={() => handleEditClick('Workshops', item)} className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-gray-700">Edit</button>
                        <button onClick={() => handleDelete('Workshops', item.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-red-500/30">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COURSES ADMIN SECTION */}
          {activeTab === 'courses' && (
            <div className="space-y-8">
              <form onSubmit={(e) => handleSubmitForm('Courses', e)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Course Card' : 'Add New Course Card'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{editingId ? 'Modify course details below.' : 'Publish a course curriculum card visible on the student courses section.'}</p>
                  </div>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); resetForms(); }} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
                      Cancel Editing
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Category Tag Badge</label>
                    <input type="text" required value={courseForm.tag} onChange={(e) => setCourseForm({...courseForm, tag: e.target.value})} placeholder="e.g. WEB DEVELOPMENT" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent uppercase" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Course Title</label>
                    <input type="text" required value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} placeholder="e.g. Full-Stack Web Development" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Course Overview / Description</label>
                    <textarea rows="3" required value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} placeholder="e.g. HTML, CSS, JavaScript, React, Node.js..." className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Duration Badge</label>
                    <input type="text" required value={courseForm.duration} onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})} placeholder="e.g. 12 weeks" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Skill Level Badge</label>
                    <input type="text" required value={courseForm.level} onChange={(e) => setCourseForm({...courseForm, level: e.target.value})} placeholder="e.g. Beginner friendly" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Delivery Format Badge</label>
                    <input type="text" required value={courseForm.format} onChange={(e) => setCourseForm({...courseForm, format: e.target.value})} placeholder="e.g. Live + recorded" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Price / Fee Display</label>
                    <input type="text" required value={courseForm.price} onChange={(e) => setCourseForm({...courseForm, price: e.target.value})} placeholder="e.g. PKR 15,000" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                </div>
                <button type="submit" className="bg-mintAccent text-[#0b0f19] font-bold px-7 py-3 rounded-xl hover:bg-mintHover transition-all text-sm cursor-pointer shadow-lg shadow-mintAccent/20">
                  {editingId ? 'Update Course Card 💾' : 'Publish Course Card +'}
                </button>
              </form>

              <div className="pt-8 border-t border-gray-800 space-y-4">
                <h4 className="text-lg font-bold text-white">Active Course Entries ({coursesList.length})</h4>
                <div className="space-y-3">
                  {coursesList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[#0b0f19] border border-gray-800 p-4 rounded-xl">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-mintAccent bg-mintAccent/10 px-2 py-0.5 rounded font-mono">{item.tag}</span>
                          <h5 className="font-semibold text-sm text-white">{item.title}</h5>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button onClick={() => handleEditClick('Courses', item)} className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-gray-700">Edit</button>
                        <button onClick={() => handleDelete('Courses', item.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-red-500/30">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TEAM ADMIN SECTION (WITH DEVICE IMAGE SELECTOR) */}
          {activeTab === 'team' && (
            <div className="space-y-8">
              <form onSubmit={(e) => handleSubmitForm('Team', e)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Team Member' : 'Add New Team Member'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{editingId ? 'Modify team member details below.' : 'Add personnel and select their profile photo directly from your device.'}</p>
                  </div>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); resetForms(); }} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
                      Cancel Editing
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Team Member Name</label>
                    <input type="text" required value={teamForm.name} onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} placeholder="e.g. Ayesha Fatima" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Role / Title</label>
                    <input type="text" required value={teamForm.role} onChange={(e) => setTeamForm({...teamForm, role: e.target.value})} placeholder="e.g. Website Developer" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Short Bio / Description</label>
                    <textarea rows="3" required value={teamForm.bio} onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})} placeholder="e.g. Building and optimizing responsive web interfaces..." className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent resize-none" />
                  </div>

                  {/* Device Image Upload Picker */}
                  <div className="space-y-2 md:col-span-2 bg-[#0b0f19] p-4 rounded-xl border border-gray-700">
                    <label className="text-xs text-gray-400 font-medium block">Select Member Image From Device</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileChange} 
                        className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-mintAccent file:text-[#0b0f19] hover:file:bg-mintHover cursor-pointer" 
                      />
                      {teamForm.image && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-mono">Preview:</span>
                          <img 
                            src={resolveImageSource(teamForm.image)} 
                            alt="Preview" 
                            className="w-10 h-10 rounded-lg object-cover border border-mintAccent/40" 
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">LinkedIn URL (Optional)</label>
                    <input type="text" value={teamForm.linkedin} onChange={(e) => setTeamForm({...teamForm, linkedin: e.target.value})} placeholder="https://linkedin.com/in/..." className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">GitHub URL (Optional)</label>
                    <input type="text" value={teamForm.github} onChange={(e) => setTeamForm({...teamForm, github: e.target.value})} placeholder="https://github.com/..." className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                </div>

                <button type="submit" className="bg-mintAccent text-[#0b0f19] font-bold px-7 py-3 rounded-xl hover:bg-mintHover transition-all text-sm cursor-pointer shadow-lg shadow-mintAccent/20">
                  {editingId ? 'Update Team Member 💾' : 'Publish Team Member +'}
                </button>
              </form>

              <div className="pt-8 border-t border-gray-800 space-y-4">
                <h4 className="text-lg font-bold text-white">Active Team Entries ({teamList.length})</h4>
                <div className="space-y-3">
                  {teamList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[#0b0f19] border border-gray-800 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={resolveImageSource(item.image)} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-sm text-white">{item.name}</h5>
                            <span className="text-[10px] text-mintAccent bg-mintAccent/10 px-2 py-0.5 rounded font-mono">{item.role}</span>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.bio || item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button onClick={() => handleEditClick('Team', item)} className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-gray-700">Edit</button>
                        <button onClick={() => handleDelete('Team', item.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-red-500/30">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INTERN ACCOUNTS SECTION */}
          {activeTab === 'interns' && (
            <div className="space-y-8">
              <form onSubmit={(e) => handleSubmitForm('Interns', e)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Intern Account & Multi-Milestone Tasks' : 'Add New Intern Account & Multi-Milestone Tasks'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{editingId ? 'Modify intern profile and their dashboard tasks below.' : 'Register intern profiles with multiple tasks matching the student dashboard preview.'}</p>
                  </div>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); resetForms(); }} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
                      Cancel Editing
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 pb-2 border-b border-gray-800">
                    <h4 className="text-xs font-mono uppercase text-mintAccent tracking-wider">1. Intern Profile Information</h4>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Intern Full Name</label>
                    <input type="text" required value={internForm.name} onChange={(e) => setInternForm({...internForm, name: e.target.value})} placeholder="e.g. Ali Khan" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Email Address</label>
                    <input type="email" required value={internForm.email} onChange={(e) => setInternForm({...internForm, email: e.target.value})} placeholder="e.g. alikhan@example.com" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Internship Track</label>
                    <input type="text" required value={internForm.track} onChange={(e) => setInternForm({...internForm, track: e.target.value})} placeholder="e.g. Web Development Internship" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Current Status Display</label>
                    <input type="text" required value={internForm.status} onChange={(e) => setInternForm({...internForm, status: e.target.value})} placeholder="e.g. Active Intern" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>

                  <div className="md:col-span-2 pt-4 pb-2 border-b border-gray-800 flex justify-between items-center">
                    <h4 className="text-xs font-mono uppercase text-mintAccent tracking-wider">2. Assigned Tasks & Milestones</h4>
                    <button type="button" onClick={addTaskField} className="text-xs bg-mintAccent/10 hover:bg-mintAccent/20 text-mintAccent border border-mintAccent/30 px-3 py-1 rounded-lg font-medium cursor-pointer">
                      + Add Another Task
                    </button>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    {internForm.tasks.map((task, idx) => (
                      <div key={task.id || idx} className="bg-[#0b0f19] border border-gray-800 p-4 rounded-xl flex flex-col md:flex-row gap-3 items-center">
                        <div className="w-full md:flex-1 space-y-1">
                          <label className="text-[10px] text-gray-400 uppercase font-mono">Task Title</label>
                          <input type="text" required value={task.title} onChange={(e) => handleTaskChange(idx, 'title', e.target.value)} placeholder="e.g. Build Landing Page Components" className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-mintAccent" />
                        </div>
                        <div className="w-full md:w-44 space-y-1">
                          <label className="text-[10px] text-gray-400 uppercase font-mono">Deadline</label>
                          <input type="date" required value={task.deadline} onChange={(e) => handleTaskChange(idx, 'deadline', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-mintAccent" />
                        </div>
                        <div className="w-full md:w-36 space-y-1">
                          <label className="text-[10px] text-gray-400 uppercase font-mono">Status Badge</label>
                          <select value={task.status} onChange={(e) => handleTaskChange(idx, 'status', e.target.value)} className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-mintAccent">
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                        {internForm.tasks.length > 1 && (
                          <button type="button" onClick={() => removeTaskField(idx)} className="self-end md:self-center mt-4 md:mt-0 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-lg text-xs cursor-pointer border border-red-500/30">
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="bg-mintAccent text-[#0b0f19] font-bold px-7 py-3 rounded-xl hover:bg-mintHover transition-all text-sm cursor-pointer shadow-lg shadow-mintAccent/20">
                  {editingId ? 'Update Intern Account & Tasks 💾' : 'Add Intern Account & Publish Tasks +'}
                </button>
              </form>

              <div className="pt-8 border-t border-gray-800 space-y-4">
                <h4 className="text-lg font-bold text-white">Registered Intern Accounts ({internsList.length})</h4>
                <div className="space-y-4">
                  {internsList.map((item) => (
                    <div key={item.id} className="bg-[#0b0f19] border border-gray-800 p-5 rounded-2xl space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-base text-white">{item.name}</h5>
                            <span className="text-[10px] text-mintAccent bg-mintAccent/10 px-2.5 py-0.5 rounded-full font-mono border border-mintAccent/30">{item.status}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{item.email} • <span className="text-gray-300">{item.track}</span></p>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                          <button onClick={() => handleEditClick('Interns', item)} className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-gray-700">Edit</button>
                          <button onClick={() => handleDelete('Interns', item.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-red-500/30">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MENTOR ACCOUNTS SECTION */}
          {activeTab === 'mentors' && (
            <div className="space-y-8">
              <form onSubmit={(e) => handleSubmitForm('Mentors', e)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Mentor Account & Oversight Metrics' : 'Add New Mentor Account & Oversight Metrics'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{editingId ? 'Modify mentor profile, review queues, and live dashboard session below.' : 'Register mentor profiles, track review workloads, and allocate interns for evaluations.'}</p>
                  </div>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); resetForms(); }} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
                      Cancel Editing
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 pb-2 border-b border-gray-800">
                    <h4 className="text-xs font-mono uppercase text-mintAccent tracking-wider">1. Mentor Profile & Oversight Workload</h4>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Mentor Full Name</label>
                    <input type="text" required value={mentorForm.name} onChange={(e) => setMentorForm({...mentorForm, name: e.target.value})} placeholder="e.g. Dr. Ahmed" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Email Address</label>
                    <input type="email" required value={mentorForm.email} onChange={(e) => setMentorForm({...mentorForm, email: e.target.value})} placeholder="e.g. ahmed@example.com" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Expertise Domain</label>
                    <input type="text" required value={mentorForm.expertise} onChange={(e) => setMentorForm({...mentorForm, expertise: e.target.value})} placeholder="e.g. Full-Stack Engineering" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Account Status</label>
                    <select value={mentorForm.status} onChange={(e) => setMentorForm({...mentorForm, status: e.target.value})} className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent">
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Pending Review Queue Count</label>
                    <input type="number" min="0" required value={mentorForm.pendingReviews} onChange={(e) => setMentorForm({...mentorForm, pendingReviews: parseInt(e.target.value) || 0})} className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Assigned Mentees Count</label>
                    <input type="number" min="0" required value={mentorForm.assignedMenteesCount} onChange={(e) => setMentorForm({...mentorForm, assignedMenteesCount: parseInt(e.target.value) || 0})} className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Lifetime Completed Evaluations</label>
                    <input type="number" min="0" required value={mentorForm.reviewedTotal} onChange={(e) => setMentorForm({...mentorForm, reviewedTotal: parseInt(e.target.value) || 0})} className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>

                  <div className="md:col-span-2 pt-4 pb-2 border-b border-gray-800">
                    <h4 className="text-xs font-mono uppercase text-mintAccent tracking-wider">2. Synchronized Mentor Dashboard Session</h4>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Session Title / Topic</label>
                    <input type="text" required value={mentorForm.sessionTitle} onChange={(e) => setMentorForm({...mentorForm, sessionTitle: e.target.value})} placeholder="e.g. React State Management Review" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Session Date</label>
                    <input type="date" required value={mentorForm.sessionDate} onChange={(e) => setMentorForm({...mentorForm, sessionDate: e.target.value})} className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Session Time</label>
                    <input type="text" required value={mentorForm.sessionTime} onChange={(e) => setMentorForm({...mentorForm, sessionTime: e.target.value})} placeholder="e.g. 4:00 PM" className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mintAccent" />
                  </div>
                </div>

                <button type="submit" className="bg-mintAccent text-[#0b0f19] font-bold px-7 py-3 rounded-xl hover:bg-mintHover transition-all text-sm cursor-pointer shadow-lg shadow-mintAccent/20">
                  {editingId ? 'Update Mentor Account & Oversight 💾' : 'Add Mentor Account & Oversight +'}
                </button>
              </form>

              <div className="pt-8 border-t border-gray-800 space-y-4">
                <h4 className="text-lg font-bold text-white">Registered Mentor Oversight Entries ({mentorsList.length})</h4>
                <div className="space-y-3">
                  {mentorsList.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between bg-[#0b0f19] border border-gray-800 p-4 rounded-xl gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                            {item.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm text-white">{item.name}</h5>
                            <p className="text-xs text-gray-400">{item.email} • <span className="text-gray-300">{item.expertise}</span></p>
                          </div>
                          <span className="text-[10px] text-mintAccent bg-mintAccent/10 px-2 py-0.5 rounded font-mono ml-2">{item.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <button onClick={() => handleEditClick('Mentors', item)} className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-gray-700">Manage Allocation</button>
                        <button onClick={() => handleDelete('Mentors', item.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-red-500/30">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}