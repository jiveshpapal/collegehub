import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { BookOpen, User, Mail, Lock, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login, demoLogin, signup } = useCollege();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('krishna.v@college.edu');
  const [loginPassword, setLoginPassword] = useState('student123');

  // Sign up form state
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [department, setDepartment] = useState('Information Technology');
  const [yearSemester, setYearSemester] = useState('Year 3, Semester 5');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(
      {
        name: fullName,
        studentId: studentId,
        email: signupEmail,
        department: department,
        yearSemester: yearSemester,
      },
      signupPassword
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1B5E38] text-white shadow-xs mb-3">
          <BookOpen className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">CollegeHub</h1>
        <p className="mt-1 text-xs text-[#6B7280]">
          Academic Portal, Notes Library & College Projects System
        </p>
      </div>

      {/* Main Auth Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-stone-200 rounded-xl sm:px-8">
          {/* Segmented Auth Mode Switch */}
          <div className="flex p-1 bg-stone-100 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#1E1E1E] shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#1E1E1E] shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Quick Demo Login Callout */}
          {mode === 'login' && (
            <div className="mb-6 p-3 bg-[#EBF5EE] border border-[#1B5E38]/20 rounded-lg flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-[#1B5E38]">Instant Student Access</div>
                <div className="text-[11px] text-stone-600">
                  Log in as test student: Krishna Kamala Prasad
                </div>
              </div>
              <button
                type="button"
                onClick={demoLogin}
                className="px-3 py-1.5 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                Demo Login &rarr;
              </button>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-stone-300 text-[#1B5E38] focus:ring-[#1B5E38]"
                  />
                  <span>Keep session active</span>
                </label>
                <a href="#reset" onClick={(e) => e.preventDefault()} className="hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                Sign in to Dashboard
              </button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KRISHNA KAMALA PRASAD VISHWAKARMA"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Student ID / Roll No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IT-2023-042"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white font-mono text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Department / Course *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Telecomm">Electronics & Telecomm</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Year & Semester *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Year 3, Semester 5"
                  value={yearSemester}
                  onChange={(e) => setYearSemester(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="krishna.v@college.edu"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer mt-2"
              >
                Register & Enter Dashboard &rarr;
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-[#6B7280] mt-6">
          CollegeHub Student Academic Management System · Python Flask & MySQL Ready
        </p>
      </div>
    </div>
  );
};
