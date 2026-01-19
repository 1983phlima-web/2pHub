
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotConfig } from '../types';

const TradingBot: React.FC = () => {
  const [config, setConfig] = useState<BotConfig>({
    name: '2p-Apollo v2.4',
    riskProfile: 'Moderate',
    targetBanks: ['Banco Inter', 'Nubank'],
    autoTrade: false,
    maxDrawdown: 5.0,
    pairPrimary: 'USD/BRL'
  });

  const [active, setActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] System kernel initialized.`,
    `[${new Date().toLocaleTimeString()}] Secure API tunnel established.`
  ]);

  useEffect(() => {
    if (active) {
      const timer = setInterval(() => {
        const events = [
          `Monitorando ${config.pairPrimary} | Volatilidade: 0.14%`,
          `Verificando spread em ${config.targetBanks[Math.floor(Math.random() * config.targetBanks.length)]}`,
          `Sinal de RSI em 44.2 - Neutro.`,
          `Análise de sentimento: 72% Bullish.`
        ];
        const newLog = `[${new Date().toLocaleTimeString()}] ${events[Math.floor(Math.random() * events.length)]}`;
        setLogs(prev => [newLog, ...prev].slice(0, 50));
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [active, config.pairPrimary, config.targetBanks]);

  const toggleBank = (bank: string) => {
    setConfig(prev => ({
      ...prev,
      targetBanks: prev.targetBanks.includes(bank) 
        ? prev.targetBanks.filter(b => b !== bank)
        : [...prev.targetBanks, bank]
    }));
  };

  return (
    <div className="space-y-6 md:space-y-10 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Bot Trader</h2>
          <p className="text-slate-500 text-sm md:text-base font-medium">Automatização avançada com execução proprietária 2p.</p>
        </div>
        <motion.div 
          animate={{ 
            backgroundColor: active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(241, 245, 249, 1)',
            borderColor: active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(226, 232, 240, 1)'
          }}
          className="w-full md:w-auto px-5 py-2.5 rounded-2xl border font-black flex items-center justify-center md:justify-start space-x-3 transition-colors"
        >
          <div className={`w-3 h-3 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse' : 'bg-slate-400'}`}></div>
          <span className={`text-[10px] md:text-xs tracking-widest uppercase ${active ? 'text-emerald-700' : 'text-slate-500'}`}>
            {active ? 'Sistema Operante' : 'Módulo em Standby'}
          </span>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Settings */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 md:space-y-8"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-4 md:pb-6">
              <h3 className="text-base md:text-lg font-black text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>
                Configurações
              </h3>
              <span className="text-[8px] md:text-[10px] font-black text-blue-500 bg-blue-50 px-2 md:px-3 py-1 rounded-full uppercase tracking-widest">v2.4 Final</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identificação</label>
                <input 
                  type="text" 
                  value={config.name} 
                  onChange={(e) => setConfig({...config, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 md:px-5 py-3 md:py-3.5 focus:ring-2 ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 text-sm md:text-base"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ativo Principal</label>
                <select 
                  value={config.pairPrimary}
                  onChange={(e) => setConfig({...config, pairPrimary: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 md:px-5 py-3 md:py-3.5 focus:ring-2 ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer text-sm md:text-base"
                >
                  <option>USD/BRL (Forex)</option>
                  <option>EUR/BRL (Forex)</option>
                  <option>BTC/USD (Crypto)</option>
                  <option>ETH/USD (Crypto)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gerenciamento de Risco</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {['Conservative', 'Moderate', 'Aggressive'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setConfig({...config, riskProfile: r as any})}
                    className={`relative py-3 md:py-4 rounded-2xl border font-black text-[10px] md:text-xs transition-all ${
                      config.riskProfile === r 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                      : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {r === 'Conservative' ? 'CONSERVADOR' : r === 'Moderate' ? 'MODERADO' : 'AGRESSIVO'}
                    {config.riskProfile === r && (
                      <motion.div layoutId="risk-dot" className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nós Bancários</label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-2.5">
                {['Banco Inter', 'Nubank', 'BTG Pactual', 'XP', 'Binance', 'Kraken'].map((bank) => (
                  <button
                    key={bank}
                    onClick={() => toggleBank(bank)}
                    className={`px-3 md:px-4 py-2 md:py-2.5 rounded-xl border flex items-center justify-center md:justify-start space-x-2 md:space-x-2.5 transition-all text-[8px] md:text-[10px] font-black uppercase tracking-tighter ${
                      config.targetBanks.includes(bank)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <span className="opacity-70">{config.targetBanks.includes(bank) ? '●' : '○'}</span>
                    <span>{bank}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 md:pt-4">
               <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(!active)}
                  className={`w-full py-4 md:py-5 rounded-2xl md:rounded-3xl font-black text-xs md:text-sm tracking-[0.2em] uppercase transition-all shadow-xl ${
                    active 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
                  }`}
                >
                  {active ? 'Encerrar Atividades' : 'Ativar Algoritmo'}
               </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Console / Monitoring */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 text-slate-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-blue-500/10 blur-[80px] md:blur-[100px] pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-[8px] md:text-[10px] font-black text-emerald-400 tracking-[0.3em] uppercase">Live Console</h3>
              <div className="flex gap-1.5">
                <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-slate-800"></div>
              </div>
            </div>

            <div className="flex-1 font-mono text-[10px] md:text-[11px] leading-relaxed space-y-2 overflow-y-auto no-scrollbar max-h-[300px] md:max-h-[450px]">
              <AnimatePresence initial={false}>
                {logs.map((log, i) => (
                  <motion.p 
                    key={log + i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${i === 0 ? 'text-white font-bold' : 'text-slate-500 opacity-80'}`}
                  >
                    <span className="text-slate-700">#</span> {log}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-900">
              <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 md:mb-3">
                <span>Drawdown Alvo</span>
                <span className="text-white">{config.maxDrawdown}%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 md:h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: active ? '38%' : '5%' }}
                  className="bg-blue-500 h-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingBot;
