
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

  // Parallax suave para o fundo, mantendo o conteúdo legível
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -30]);

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

      <div className={`flex flex-1 transition-all duration-1000 ease-in-out ${!isLoggedIn ? 'blur-3xl scale-110 opacity-30 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          isLoggedIn={isLoggedIn}
          onLogout={() => setIsLoggedIn(false)}
        />
        
        {/* Main Content Area com pt-12 para garantir que nada seja cortado no topo */}
        <main ref={mainRef} className="flex-1 lg:ml-64 p-6 md:p-10 xl:p-14 pt-12 md:pt-16 xl:pt-20 relative min-h-screen w-full">
          
          {/* Mobile Header Refinado */}
          <div className="lg:hidden flex items-center justify-between mb-10 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3.5 text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-95 border border-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <div className="flex flex-col items-center">
              <span className="font-black text-slate-900 tracking-tighter text-2xl uppercase leading-none">2p Hub</span>
              <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest mt-1">Intelligence</span>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          <motion.div 
            style={{ y: yParallax }}
            className="max-w-[1440px] mx-auto pb-48"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'news' && <NewsPanel />}
                {activeTab === 'robot' && <TradingBot />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Global Footer Status Bar Refinado */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white/80 backdrop-blur-3xl border-t border-slate-100 p-5 px-8 md:px-14 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 z-40 shadow-[0_-10px_50px_-15px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center space-x-8">
            <div className="flex -space-x-4">
              <motion.div whileHover={{ y: -8, rotate: -5 }} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 border-2 border-white flex items-center justify-center text-[9px] md:text-[11px] text-white font-black shadow-xl cursor-pointer">API</motion.div>
              <motion.div whileHover={{ y: -8, rotate: 5 }} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800 border-2 border-white flex items-center justify-center text-[9px] md:text-[11px] text-white font-black shadow-xl cursor-pointer">BOT</motion.div>
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-none mb-1.5">
                Rede Operacional <span className="text-blue-500 font-black">2p Intelligence</span>
              </p>
              <div className="flex items-center gap-3">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">© 2026</p>
                <div className="h-1 w-1 bg-slate-300 rounded-full" />
                <a 
                  href="https://2ptec-production.up.railway.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:text-blue-400 transition-all border-b border-transparent hover:border-blue-400 pb-0.5"
                >
                  2p Co.
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
             <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Latency: 14ms</span>
             </div>
             <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
             <motion.div 
               whileHover={{ scale: 1.05, backgroundColor: '#2563eb', color: '#fff' }}
               className="text-[11px] font-black text-blue-600 bg-blue-50 px-5 py-2.5 rounded-2xl uppercase tracking-[0.2em] border border-blue-100 transition-all cursor-default shadow-sm"
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
