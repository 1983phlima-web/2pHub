
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NewsPanel from './components/NewsPanel';
import TradingBot from './components/TradingBot';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'robot'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        
        <main className="flex-1 lg:ml-64 p-4 md:p-8 xl:p-12 relative min-h-screen w-full">
          {/* Mobile Header - High Fidelity */}
          <div className="lg:hidden flex items-center justify-between mb-8 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">2p Hub</span>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-slate-900/20">
              AI
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto pb-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'news' && <NewsPanel />}
                {activeTab === 'robot' && <TradingBot />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Global Footer Status Bar */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white/80 backdrop-blur-2xl border-t border-slate-100 p-4 md:p-5 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 z-40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center space-x-5">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 border-2 border-white flex items-center justify-center text-[8px] md:text-[10px] text-white font-black shadow-xl">API</div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 border-2 border-white flex items-center justify-center text-[8px] md:text-[10px] text-white font-black shadow-xl">BOT</div>
            </div>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest hidden xs:block">
              Rede Operacional <span className="text-blue-500 font-black">2p Intelligence</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Latency: 14ms</span>
             </div>
             <div className="h-4 w-px bg-slate-200"></div>
             <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">v4.8 Stable</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
