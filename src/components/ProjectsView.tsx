import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Plus,
  CheckCircle,
  Clock,
  Search,
  User,
  X,
  FileText,
} from 'lucide-react';
import { CollegeProject } from '../types';

export const ProjectsView: React.FC = () => {
  const { projects, submitProject, user, setActivePage } = useCollege();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  // Form state
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Full-Stack Web Application');
  const [abstract, setAbstract] = useState('');
  const [techStackStr, setTechStackStr] = useState('Python, Flask, MySQL, HTML5, CSS3');
  const [supervisor, setSupervisor] = useState('Prof. S. Kulkarni');
  const [githubUrl, setGithubUrl] = useState('https://github.com/student/my-college-project');
  const [demoUrl, setDemoUrl] = useState('');

  const domains = [
    'all',
    'Full-Stack Web Application',
    'Internet of Things (IoT) & Cloud',
    'Artificial Intelligence & Operations',
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedDomain !== 'all' && p.domain !== selectedDomain) return false;
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !abstract) return;

    submitProject({
      title,
      domain,
      abstract,
      techStack: techStackStr.split(',').map((s) => s.trim()).filter(Boolean),
      studentName: user?.name || 'KRISHNA KAMALA PRASAD VISHWAKARMA',
      studentId: user?.studentId || 'IT-2023-042',
      department: user?.department || 'Information Technology',
      supervisor,
      year: '2026',
      githubUrl: githubUrl || undefined,
      demoUrl: demoUrl || undefined,
    });

    setTitle('');
    setAbstract('');
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">College Projects</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Browse semester capstone projects, research papers, and submit your project proposal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Project</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-[#EBF5EE] text-[#1B5E38] font-semibold border border-[#1B5E38]/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {dom === 'all' ? 'All Domains' : dom}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, stack, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:border-stone-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Domain & Status unboxed metadata */}
              <div className="flex items-center justify-between gap-2 text-xs mb-2">
                <span className="font-semibold text-[#1B5E38] text-[11px] uppercase tracking-wide truncate">
                  {proj.domain}
                </span>
                <span
                  className={`text-[11px] font-medium flex items-center gap-1 ${
                    proj.status === 'Approved'
                      ? 'text-[#1B5E38]'
                      : proj.status === 'Under Review'
                      ? 'text-amber-600'
                      : 'text-stone-500'
                  }`}
                >
                  {proj.status === 'Approved' && <CheckCircle className="w-3.5 h-3.5 inline" />}
                  {proj.status === 'Under Review' && <Clock className="w-3.5 h-3.5 inline" />}
                  <span>{proj.status}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-[#1E1E1E] leading-snug">
                {proj.title}
              </h3>

              <p className="text-xs text-[#6B7280] mt-2 line-clamp-3 leading-relaxed">
                {proj.abstract}
              </p>

              {/* Tech Stack subtle list */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {proj.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 bg-stone-100 text-stone-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom details */}
            <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="truncate">By: {proj.studentName}</span>
                <span className="font-mono text-[11px] text-stone-400">{proj.studentId}</span>
              </div>
              <div className="text-[11px] text-stone-500">
                Supervisor: <strong>{proj.supervisor}</strong>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3 pt-2">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-stone-700 hover:text-[#1B5E38] font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#1B5E38] hover:underline font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h2 className="text-base font-bold text-[#1E1E1E]">Submit College Project Proposal</h2>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Sensor Telemetry & IoT Dashboard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Domain / Field *
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] bg-white"
                  >
                    <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                    <option value="Internet of Things (IoT) & Cloud">Internet of Things (IoT) & Cloud</option>
                    <option value="Artificial Intelligence & Operations">Artificial Intelligence & Operations</option>
                    <option value="Cyber Security & Networking">Cyber Security & Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Faculty Supervisor *
                  </label>
                  <input
                    type="text"
                    required
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Project Abstract / Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the problem statement, objectives, architecture, and expected outcomes..."
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Technologies Used (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Python, Flask, MySQL, HTML5, CSS3, Docker"
                  value={techStackStr}
                  onChange={(e) => setTechStackStr(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    GitHub / Source Code URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/project"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Live Demo / Video Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://collegehub.internal.edu"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1B5E38] hover:bg-[#14472B] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
