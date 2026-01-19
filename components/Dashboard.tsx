
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { INITIAL_CURRENCIES, INVESTMENTS } from '../constants';
import { getMarketInsight } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState("Sincronizando modelos de análise...");
  const [isInsightExpanded, setIsInsightExpanded] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      const dataStr = INITIAL_CURRENCIES.map(c => `${c.symbol}: ${c.price}`).join(", ");
      const res = await getMarketInsight(dataStr);
      setInsight(res);
    };
    fetchInsight();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 px-4">
        <div className="space-y-1">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Market Overview</h2>
          <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em] opacity-60">Inteligência de mercado integrada em tempo real.</p>
        </div>
        
        <motion.div 
          layout
          onClick={() => setIsInsightExpanded(!isInsightExpanded)}
          className={`cursor-pointer w-full xl:max-w-md bg-white p-5 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden group transition-all duration-500 ease-in-out ${isInsightExpanded ? 'ring-2 ring-blue-500/20' : 'hover:border-blue-500/30'}`}
        >
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
             <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M12 2v4"/><path d="m16.2 4.2 2.8 2.8"/><path d="M18 12h4"/><path d="m16.2 19.8 2.8-2.8"/><path d="M12 18v4"/><path d="m4.2 19.8 2.8-2.8"/><path d="M2 12h4"/><path d="m4.2 4.2 2.8 2.8"/></svg>
          </div>

          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-colors duration-500 ${isInsightExpanded ? 'bg-blue-600' : 'bg-slate-900'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 block">AI Financial Insight</span>
              {!isInsightExpanded && (
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 animate-pulse">Toque para analisar insight</p>
              )}
            </div>
            <motion.div 
              animate={{ rotate: isInsightExpanded ? 180 : 0 }}
              className="text-slate-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </motion.div>
          </div>

          <AnimatePresence>
            {isInsightExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-4 border-t border-slate-50">
                  <p className="text-sm md:text-base text-slate-800 font-bold leading-relaxed italic">
                    "{insight}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Currency Grid - High Fidelity Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
        {INITIAL_CURRENCIES.map((currency, idx) => (
          <motion.div 
            key={currency.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all flex flex-col group"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner transition-colors ${currency.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {currency.symbol.split('/')[0]}
                </div>
                <div>
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">{currency.symbol}</p>
                  <h3 className="font-black text-slate-900 text-lg tracking-tight">{currency.name}</h3>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 transition-colors ${currency.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                <span className="animate-pulse">{currency.trend === 'up' ? '▲' : '▼'}</span>
                {currency.change}%
              </div>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">
                {currency.symbol.includes('BRL') ? 'R$' : '$'} {currency.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="h-24 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currency.history}>
                  <defs>
                    <linearGradient id={`colorValue-${currency.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currency.trend === 'up' ? '#10b981' : '#f43f5e'} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={currency.trend === 'up' ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={currency.trend === 'up' ? '#10b981' : '#f43f5e'} 
                    strokeWidth={3.5} 
                    fillOpacity={1} 
                    fill={`url(#colorValue-${currency.id})`}
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Analytics & Rankings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-4 pb-12">
        {/* Comparison Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-7 bg-white p-10 rounded-[3.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100"
        >
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-4 tracking-tight">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
              Performance Analytics
            </h3>
            <div className="bg-slate-50 p-1.5 rounded-2xl flex border border-slate-100">
               <button className="px-5 py-2 bg-white rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-900">YTD</button>
               <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">12M</button>
            </div>
          </div>
          
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...INVESTMENTS].sort((a,b) => b.returnYTD - a.returnYTD)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={9} fontWeight={900} tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} dy={15} hide={window.innerWidth < 640} />
                <YAxis axisLine={false} tickLine={false} fontSize={9} fontWeight={900} tick={{fill: '#cbd5e1'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px' }}
                />
                <Bar dataKey="returnYTD" radius={[12, 12, 12, 12]} barSize={32}>
                  {INVESTMENTS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.returnYTD > 15 ? '#2563eb' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Assets Ranking with Dark Professional UI */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000"></div>
          
          <h3 className="text-xl font-black mb-10 flex items-center gap-4 relative z-10 tracking-tight">
             <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 backdrop-blur-md">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="m2 9 3 3-3 3"/><path d="m22 9-3 3 3 3"/></svg>
             </div>
             Asset Alpha Ranking
          </h3>

          <div className="space-y-5 relative z-10">
            {INVESTMENTS.sort((a,b) => b.returnYTD - a.returnYTD).map((item, idx) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 transition-all cursor-pointer group/item"
              >
                <div className="flex items-center space-x-5">
                  <span className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-sm shadow-xl shadow-blue-500/30">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-black text-base text-white group-hover/item:text-blue-400 transition-colors leading-tight">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-blue-400 tracking-tighter">+{item.returnYTD}%</div>
                  <div className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-lg inline-block mt-2 ${
                    item.risk === 'Baixo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    item.risk === 'Médio' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {item.risk} Risk
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-10 py-5 rounded-[2rem] bg-blue-600 hover:bg-blue-700 transition-all text-[11px] font-black uppercase tracking-[0.3em] relative z-10 shadow-xl shadow-blue-500/20">
            Download Pro Report
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
