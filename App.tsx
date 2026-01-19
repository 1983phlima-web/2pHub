
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NewsPanel from './components/NewsPanel';
import TradingBot from './components/TradingBot';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'robot'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const mainRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"]
  });

  // Parallax background effect for the main container
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Close sidebar on window resize if it's desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <AnimatePresence>
        {!isLoggedIn && (
          <AuthModal onLogin={() => setIsLoggedIn(true)} />
        )}
      </AnimatePresence>

      <div className={`flex flex-1 transition-all duration-700 ${!isLoggedIn ? 'blur-2xl scale-105 opacity-50 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          isLoggedIn={isLoggedIn}
          onLogout={() => setIsLoggedIn(false)}
        />
        
        <main ref={mainRef} className="flex-1 lg:ml-64 p-4 md:p-8 xl:p-12 relative min-h-screen w-full">
          {/* Mobile Header - High Fidelity (Removed AI Icon as requested) */}
          <div className="lg:hidden flex items-center justify-between mb-8 bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-95 border border-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <span className="font-black text-slate-900 tracking-tighter text-xl uppercase">2p Hub</span>
            <div className="w-10 h-10" /> {/* Placeholder for alignment */}
          </div>

          <motion.div 
            style={{ y: yParallax }}
            className="max-w-[1400px] mx-auto pb-40"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'news' && <NewsPanel />}
                {activeTab === 'robot' && <TradingBot />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Global Footer Status Bar */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white/90 backdrop-blur-3xl border-t border-slate-100 p-4 md:p-5 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 z-40 shadow-[0_-10px_50px_-15px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center space-x-6">
            <div className="flex -space-x-3">
              <motion.div whileHover={{ y: -5 }} className="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 border-2 border-white flex items-center justify-center text-[8px] md:text-[10px] text-white font-black shadow-xl cursor-default">API</motion.div>
              <motion.div whileHover={{ y: -5 }} className="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800 border-2 border-white flex items-center justify-center text-[8px] md:text-[10px] text-white font-black shadow-xl cursor-default">BOT</motion.div>
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
                Rede Operacional <span className="text-blue-500 font-black">2p Intelligence</span>
              </p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">© 2026</p>
                <a 
                  href="https://2ptec-production.up.railway.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:text-blue-400 transition-all border-b border-blue-600/20 hover:border-blue-400"
                >
                  2p Co.
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
             <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Latency: 14ms</span>
             </div>
             <div className="h-5 w-px bg-slate-200"></div>
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="text-[11px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-100"
             >
               v4.8 Stable
             </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
