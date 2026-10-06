import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { User, Mail, GraduationCap, Calendar, Phone, Save, CheckCircle, ShieldCheck } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, updateUser, assignments, projects } = useCollege();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [yearSemester, setYearSemester] = useState(user?.yearSemester || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      department,
      yearSemester,
      phone,
      bio,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">Student Profile</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Manage your academic credentials, contact information, and enrolled programs.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-stone-100">
          <div className="w-20 h-20 rounded-full bg-[#1B5E38] text-white flex items-center justify-center font-bold text-2xl tracking-wider shadow-sm">
            {user?.avatarInitials || 'KV'}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#1E1E1E] uppercase">{user?.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-mono">
              <span className="text-[#1B5E38] font-bold">{user?.studentId}</span>
              <span aria-hidden="true">·</span>
              <span>{user?.department}</span>
              <span aria-hidden="true">·</span>
              <span>{user?.yearSemester}</span>
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E38]" />
              <span>Verified Enrolled Student Account</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Student ID / Roll Number (Immutable)
              </label>
              <input
                type="text"
                disabled
                value={user?.studentId || ''}
                className="w-full text-xs p-2.5 bg-stone-100 border border-stone-200 rounded-lg text-stone-500 font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Department / Course
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Year & Semester
              </label>
              <input
                type="text"
                value={yearSemester}
                onChange={(e) => setYearSemester(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Academic Bio & Research Interests
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Academic Highlights & Submissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
          <h3 className="text-sm font-bold text-[#1E1E1E] mb-3">Enrolled Course Units</h3>
          <ul className="space-y-2 text-xs text-stone-700">
            <li className="flex items-center justify-between py-1 border-b border-stone-50">
              <span>Internet of Things (IOT)</span>
              <span className="font-mono text-stone-400">IT-501</span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-stone-50">
              <span>Advanced Web Programming (AWP)</span>
              <span className="font-mono text-stone-400">IT-502</span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-stone-50">
              <span>Database Management Systems (DBMS)</span>
              <span className="font-mono text-stone-400">IT-503</span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-stone-50">
              <span>Data Structures & Algorithms</span>
              <span className="font-mono text-stone-400">CS-301</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
          <h3 className="text-sm font-bold text-[#1E1E1E] mb-3">Recent Projects & Work</h3>
          <div className="space-y-2 text-xs text-stone-700">
            {projects.slice(0, 2).map((p) => (
              <div key={p.id} className="py-1 border-b border-stone-50">
                <div className="font-semibold text-stone-900">{p.title}</div>
                <div className="text-[11px] text-stone-500">
                  Status: <span className="text-[#1B5E38] font-medium">{p.status}</span> · Supervisor: {p.supervisor}
                </div>
              </div>
            ))}
            <div className="text-[11px] text-stone-500 pt-1">
              Total completed coursework tasks: {assignments.filter((a) => a.isSubmitted).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
