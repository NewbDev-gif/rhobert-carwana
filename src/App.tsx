import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  Send, FileText, Moon, Sun, Check, Award, X as CloseIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import profilePic from './Profile.jpg';

// --- TYPES ---
interface Project {
  title: string;
  desc: string;
  tags: string[];
  img: string;
  github: string;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  img: string; 
}

interface GlassCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  onClick?: () => void;
}

// --- DATA ---
const PROJECTS: Project[] = [
  { 
    title: "AI Posture Coach", 
    desc: "Desktop app that helps with posture when using computer.", 
    tags: ["HTML","CSS", "JS","ElectronJS"],
    img: "/images/posture-coach.png",
    github: "https://github.com/Rays30/posture-desktop-app",
  },
  { 
    title: "LW Minimart", 
    desc: "Minimart with POS", 
    tags: ["Tauri", "Vite"],
    img: "/images/lw-minimart.png",
    github: "https://github.com/NewbDev-gif/lw-mart-manager",
  },
  { 
    title: "Lifewood Website", 
    desc: "Recreated the Lifewood website.", 
    tags: ["Firebase", "HTML", "CSS", "JavaScript"],
    img: "/images/lifewood-website.png",
    github: "https://github.com/NewbDev-gif/lifewood",
  },
  { 
    title: "Laundry Management System", 
    desc: "Mobile laundry booking app", 
    tags: ["Firebase", "OpenStreetMap","Flutter", "Dart"],
    img: "/images/laundry-app.png",
    github: "https://github.com/NewbDev-gif",
  }
];

const CERTIFICATES: Certificate[] = [
  {
    title: "ProWeaver, Inc. PromptQuest",
    issuer: "ProWeaver, Inc.",
    date: "Sep 2025",
    img: "/images/cert-hackathon.png"
  },
  {
    title: "Software/Fullstack Internship",
    issuer: "Lifewood Data Technology Ltd.",
    date: "Jan 2026",
    img: "/images/cert-lifewood.png"
  }
];

// --- BRAND ICONS ---
const GithubLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

// --- REUSABLE GLASS CARD ---
const GlassCard = ({ children, index = 0, className = "", onClick }: GlassCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1 }} 
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-8 backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-white/[0.07] ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <motion.div className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.2), transparent 80%)` }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// --- PAGES ---
const HomePage = ({ onSelectCert }: { onSelectCert: (cert: Certificate) => void }) => {
  const [copied, setCopied] = useState(false);
  const email = "rhobertcarwana@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <GlassCard className="md:col-span-2 flex flex-col md:flex-row items-center gap-10">
          <img src={profilePic} alt="Profile" className="h-40 w-40 md:h-52 md:w-52 rounded-full border-4 border-white dark:border-white/10 object-cover object-top shadow-2xl" />
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Rhobert Carwana</span>
            </h1>
            <p className="mt-4 text-slate-700 dark:text-slate-400 max-sm:text-sm font-medium">"It's not about visuals it's about functionality and simplicity."</p>
            <div className="mt-6 flex items-center gap-2 px-4 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20 text-[10px] font-bold uppercase w-fit">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Available for hire
            </div>
          </div>
        </GlassCard>
        
        <div className="grid grid-cols-1 gap-4">
            <GlassCard className="flex flex-col items-center justify-center text-center py-10">
              <span className="text-4xl font-black text-black dark:text-white">{PROJECTS.length}</span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest mt-2"> Projects Completed</span>
            </GlassCard>
            <button onClick={handleCopy} className="group relative flex flex-col items-center justify-center rounded-[32px] bg-blue-600 text-white hover:scale-[0.98] transition-all py-10 shadow-lg overflow-hidden active:scale-95">
              <AnimatePresence mode="wait">
                {!copied ? (
                  <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Contact Me</span>
                    <Send size={20} className="mt-2" />
                  </motion.div>
                ) : (
                  <motion.div key="copied" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="flex flex-col items-center">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Email Copied!</span>
                    <Check size={20} className="mt-2 text-green-300" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4 italic">/ About Me</h2>
          <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed">I am an aspiring Fullstack Developer focused on <span className="text-black dark:text-white font-bold">solving real world problems with technology</span>. I love exploring new technologies to improve my skills.</p>
        </GlassCard>
        <GlassCard>
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-4 italic">/ Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {['React', 'Node.js', 'TypeScript', 'MySQL', 'Tailwind', 'Html', 'CSS','Flutter', 'Dart'].map(tech => (
              <span key={tech} className="px-3 py-1.5 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/5 rounded-xl text-[10px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-tighter">{tech}</span>
            ))}
          </div>
        </GlassCard>
      </div>

      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-6 italic">/ Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATES.map((cert, i) => (
          <GlassCard key={i} onClick={() => onSelectCert(cert)} className="flex items-center gap-6 p-4 md:p-6 group">
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900">
               <img src={cert.img} alt="preview" className="h-full w-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <Award size={20} className="text-blue-600 dark:text-blue-400 drop-shadow-lg" />
               </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">{cert.title}</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-2">{cert.issuer} • {cert.date}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;
  const currentProjects = PROJECTS.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);
  const totalPages = Math.ceil(PROJECTS.length / projectsPerPage);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400 mb-8 italic">/ Selected Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <AnimatePresence mode="wait">
          {currentProjects.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <GlassCard index={i} className="flex flex-col p-0 overflow-hidden h-full">
                <div className="h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800"><img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-400 mb-6 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">{p.tags.map(t => <span key={t} className="text-[9px] font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg uppercase">{t}</span>)}</div>
                  <div className="flex gap-4 border-t border-slate-200 dark:border-white/5 pt-6">
                     <a href={p.github} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"><GithubLogo size={14}/> CODE</a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className={`p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}`}><ChevronLeft size={20} /></button>
        <div className="px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Page {currentPage} / {totalPages}</div>
        <button onClick={() => setCurrentPage(2)} disabled={currentPage === totalPages} className={`p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}`}><ChevronRight size={20} /></button>
      </div>
    </motion.div>
  );
};

const ExperiencePage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400 mb-8 italic">/ Professional Path</h2>
    <GlassCard className="max-w-4xl">
       <div className="flex justify-between items-start mb-6">
          <div><h3 className="text-xl font-bold text-black dark:text-white">Lifewood Data Technology Ltd.</h3><p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">Fullstack Dev Intern</p></div>
          <span className="text-slate-500 dark:text-slate-500 text-[10px] font-bold">JUN 2025 - JAN 2026</span>
       </div>
       <ul className="text-xs text-slate-800 dark:text-slate-300 space-y-3">
          <li>• Led the CEC interns in creating the LW Minimart.</li>
          <li>• Participated in Game Development using Unity Game Engine.</li>
          <li>• Collaborated with other interns to create AI Posture Coach.</li>
       </ul>
    </GlassCard>
  </motion.div>
);

// --- MAIN APP ---
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'experience'>('home');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-500 font-sans select-none overflow-hidden ${isDark ? 'bg-[#050505] text-white' : 'bg-slate-50 text-black'}`}>
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-[120px]" />
      </div>

      {/* NAVBAR with State Navigation */}
      {!selectedCert && (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 bg-white/80 dark:bg-black/20 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-full shadow-2xl">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all duration-300 ${activeTab === 'home' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'}`}
          >
            HOME
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all duration-300 ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'}`}
          >
            PROJECTS
          </button>
          <button 
            onClick={() => setActiveTab('experience')} 
            className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all duration-300 ${activeTab === 'experience' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'}`}
          >
            EXPERIENCE
          </button>
          
          <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/10 mx-1" />
          
          <div className="flex items-center gap-1">
            <a href="https://github.com/NewbDev-gif" target="_blank" rel="noreferrer" className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors" title="GitHub"><GithubLogo size={18}/></a>
            <a href="./pdf/Rhobert-Carwana-Resume.pdf" target="_blank" className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors" title="Resume"><FileText size={18}/></a>
            <button onClick={() => setIsDark(!isDark)} className="p-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-110 transition-transform cursor-pointer">
              {isDark ? <Sun size={12} fill="currentColor" /> : <Moon size={12} fill="currentColor" />}
            </button>
          </div>
        </nav>
      )}

      {/* Main Content using State switching */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomePage onSelectCert={setSelectedCert} />
            </motion.div>
          )}
          {activeTab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectsPage />
            </motion.div>
          )}
          {activeTab === 'experience' && (
            <motion.div key="experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ExperiencePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!selectedCert && (
        <footer className="relative z-10 mx-auto max-w-6xl px-6 border-t border-slate-200 dark:border-white/5 py-10 flex justify-between items-center text-slate-500 dark:text-slate-400">
          <span className="text-[10px] font-bold uppercase tracking-widest">© 2026 Rhobert Christopher Carwana</span>
          <div className="flex gap-4">
            <a href="https://github.com/NewbDev-gif" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><GithubLogo size={18}/></a>
          </div>
        </footer>
      )}

      {/* FULL SCREEN MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} className="absolute inset-0 bg-black/95 backdrop-blur-2xl cursor-zoom-out" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center justify-center p-4 md:p-12">
              <button onClick={() => setSelectedCert(null)} className="absolute top-6 right-6 z-[210] p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:rotate-90 active:scale-90"><CloseIcon size={32} /></button>
              <img src={selectedCert.img} alt={selectedCert.title} className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(59,130,246,0.2)] rounded-lg" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}