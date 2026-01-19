
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: 'dashboard' | 'news' | 'robot';
  setActiveTab: (tab: 'dashboard' | 'news' | 'robot') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen, isLoggedIn, onLogout }) => {
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
      )
    },
    { 
      id: 'news', 
      label: 'Notícias', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
      )
    },
    { 
      id: 'robot', 
      label: 'Bot Trader', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      )
    },
  ];

  const sidebarContent = (
    <motion.div 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-white p-6 flex flex-col z-[60] shadow-2xl border-r border-white/5"
    >
      <div className="mb-12 px-2 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <motion.h1 
            className="text-2xl font-black text-white tracking-tighter"
          >
            2p Hub
          </motion.h1>
          <p className="text-blue-500 text-[8px] mt-1.5 font-black tracking-[0.3em] uppercase opacity-80">Intelligence v4.8</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      <nav className="flex-1 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className="w-full relative group"
          >
            <div
              className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all duration-300 relative z-10 ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span className={`transition-colors duration-300 ${activeTab === tab.id ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-300'}`}>
                {tab.icon}
              </span>
              <span className="font-black text-[11px] uppercase tracking-widest">{tab.label}</span>
            </div>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="sidebar-pill"
                className="absolute inset-0 bg-blue-600/10 border-r-4 border-blue-500 rounded-2xl"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        {isLoggedIn && (
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all text-rose-500 hover:text-rose-400 hover:bg-rose-500/5 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            <span className="font-black text-[10px] uppercase tracking-[0.2em]">Logout Terminal</span>
          </button>
        )}
        
        <div className="pt-6 border-t border-slate-800">
           <div>
             <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">© 2026</p>
                <a 
                  href="https://2ptec-production.up.railway.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-500 font-black uppercase tracking-widest hover:text-blue-400 transition-colors"
                >
                  2p Co.
                </a>
             </div>
             <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Secure Core System</p>
           </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="hidden lg:block">
        {sidebarContent}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 lg:hidden"
            />
            {sidebarContent}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
