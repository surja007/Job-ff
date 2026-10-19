"use client";
import React, { useEffect, useState } from 'react';
import { getApplications, updateApplicationStatus } from '@/lib/api';
import ApplicationTable from '@/components/ApplicationTable';
import ProfileSection from '@/components/ProfileSection';
import { LayoutDashboard, User, Briefcase, FileText, Settings, LogOut, Plus, Upload } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'applications') loadApps();
  }, [activeTab]);

  async function loadApps() {
    setLoading(true);
    try {
      const data = await getApplications();
      setApplications(data.applications || data);
    } catch (e) {
      console.error("Error loading apps", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: number, status: string) {
    try {
      await updateApplicationStatus(id, status);
      await loadApps();
    } catch (e) {
      alert("Failed to update status");
    }
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">JT</div>
          JobTrack
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'applications'} onClick={() => setActiveTab('applications')} />
          <NavItem icon={<User size={20} />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <NavItem icon={<FileText size={20} />} label="Resumes" active={activeTab === 'resumes'} onClick={() => setActiveTab('resumes')} />
          <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase px-2">Settings</div>
          <NavItem icon={<Settings size={20} />} label="Account" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'applications' ? (
          <>
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">My Applications</h1>
                <p className="text-slate-400">Track and manage your job search progress</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Plus size={18} /> Add Application
              </button>
            </header>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ApplicationTable applications={applications} onStatusChange={handleStatusChange} />
            )}
          </>
        ) : activeTab === 'profile' ? (
          <div className="max-w-4xl">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white">Master Profile</h1>
              <p className="text-slate-400">Complete your profile to enable AI auto-apply</p>
            </header>

            <ProfileSection title="Personal Information" description="Name, contact, and address" completion={80}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">First Name</label>
                  <input className="bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white outline-none focus:border-blue-500" defaultValue="John" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Middle Name</label>
                  <input className="bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white outline-none focus:border-blue-500" />
                </div>
              </div>
            </ProfileSection>

            <ProfileSection title="Education" description="Degrees and certifications" completion={0}>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-slate-500">No education added yet</p>
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">+ Add Education</button>
              </div>
            </ProfileSection>

            <ProfileSection title="Experience" description="Work history and roles" completion={0}>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-slate-500">No experience added yet</p>
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">+ Add Experience</button>
              </div>
            </ProfileSection>

            <ProfileSection title="Documents" description="Resume, video and cover letter" completion={20}>
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center bg-slate-800/30">
                <Upload className="mx-auto text-slate-500 mb-2" size={32} />
                <p className="text-sm text-slate-300">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">DOC, DOCX, PDF (max 10MB)</p>
              </div>
            </ProfileSection>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-500">
            This section is under construction...
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
