
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
      className="space-y-10 md:space-y-14"
    >
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 px-4">
        <div className="space-y-3">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">Market Overview</h2>
          <p className="text-slate-400 font-bold uppercase text-[12px] tracking-[0.25em] opacity-60">Inteligência de mercado integrada em tempo real.</p>
        </div>
        
        <motion.div 
          layout
          onClick={() => setIsInsightExpanded(!isInsightExpanded)}
          className={`cursor-pointer w-full xl:max-w-md bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden group transition-all duration-500 ease-in-out ${isInsightExpanded ? 'ring-2 ring-blue-500/20' : 'hover:border-blue-500/30'}`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
             <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M12 2v4"/><path d="m16.2 4.2 2.8 2.8"/><path d="M18 12h4"/><path d="m16.2 19.8 2.8-2.8"/><path d="M12 18v4"/><path d="m4.2 19.8 2.8-2.8"/><path d="M2 12h4"/><path d="m4.2 4.2 2.8 2.8"/></svg>
          </div>

          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors duration-500 ${isInsightExpanded ? 'bg-blue-600' : 'bg-slate-900'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 block">AI Financial Insight</span>
              {!isInsightExpanded && (
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1 animate-pulse">Toque para analisar insight</p>
              )}
            </div>
            <motion.div 
              animate={{ rotate: isInsightExpanded ? 180 : 0 }}
              className="text-slate-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </motion.div>
          </div>

          <AnimatePresence>
            {isInsightExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-8 mt-6 border-t border-slate-50">
                  <p className="text-base md:text-lg text-slate-800 font-bold leading-relaxed italic pr-4">
                    "{insight}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Grid de Moedas - Melhorado para preencher melhor o espaço */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-4">
        {INITIAL_CURRENCIES.map((currency, idx) => (
          <motion.div 
            key={currency.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            className="bg-white p-10 rounded-[3.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_30px_90px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all flex flex-col group"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center font-black text-base shadow-inner transition-colors ${currency.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {currency.symbol.split('/')[0]}
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">{currency.symbol}</p>
                  <h3 className="font-black text-slate-900 text-xl tracking-tight">{currency.name}</h3>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-2xl text-[11px] font-black flex items-center gap-2.5 transition-colors ${currency.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                <span className="animate-pulse text-[14px]">{currency.trend === 'up' ? '▲' : '▼'}</span>
                {currency.change}%
              </div>
            </div>

            <div className="mb-10">
              <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                {currency.symbol.includes('BRL') ? 'R$' : '$'} {currency.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="h-28 -mx-4 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currency.history}>
                  <defs>
                    <linearGradient id={`colorValue-${currency.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currency.trend === 'up' ? '#10b981' : '#f43f5e'} stopOpacity={0.25}/>
                      <stop offset="95%" stopColor={currency.trend === 'up' ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={currency.trend === 'up' ? '#10b981' : '#f43f5e'} 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill={`url(#colorValue-${currency.id})`}
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Seção de Analytics e Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4">
        {/* Gráfico de Performance */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-7 bg-white p-12 rounded-[4rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-5 tracking-tight">
              <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
              Performance Analytics
            </h3>
            <div className="bg-slate-50 p-2 rounded-[1.5rem] flex border border-slate-100 shadow-inner">
               <button className="px-7 py-2.5 bg-white rounded-2xl shadow-sm text-[11px] font-black uppercase tracking-widest text-slate-900">YTD</button>
               <button className="px-7 py-2.5 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">12M</button>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...INVESTMENTS].sort((a,b) => b.returnYTD - a.returnYTD)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} fontWeight={900} tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} dy={20} hide={window.innerWidth < 768} />
                <YAxis axisLine={false} tickLine={false} fontSize={10} fontWeight={900} tick={{fill: '#cbd5e1'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '2.5rem', border: 'none', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15)', padding: '24px' }}
                />
                <Bar dataKey="returnYTD" radius={[14, 14, 14, 14]} barSize={38}>
                  {INVESTMENTS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.returnYTD > 15 ? '#2563eb' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Assets Ranking */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 bg-slate-900 p-12 rounded-[4rem] shadow-2xl text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[120px] group-hover:bg-blue-600/20 transition-all duration-1000"></div>
          
          <h3 className="text-2xl font-black mb-12 flex items-center gap-5 relative z-10 tracking-tight">
             <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 backdrop-blur-xl border border-white/10">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="m2 9 3 3-3 3"/><path d="m22 9-3 3 3 3"/></svg>
             </div>
             Alpha Assets
          </h3>

          <div className="space-y-6 relative z-10">
            {INVESTMENTS.sort((a,b) => b.returnYTD - a.returnYTD).map((item, idx) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 12, backgroundColor: 'rgba(255,255,255,0.08)' }}
                className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white/5 border border-white/5 transition-all cursor-pointer group/item"
              >
                <div className="flex items-center space-x-6">
                  <span className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-base shadow-xl shadow-blue-500/40">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-black text-lg text-white group-hover/item:text-blue-400 transition-colors leading-tight">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.25em] mt-1.5">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-blue-400 tracking-tighter">+{item.returnYTD}%</div>
                  <div className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl inline-block mt-3 ${
                    item.risk === 'Baixo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    item.risk === 'Médio' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {item.risk} Risk
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-12 py-6 rounded-[2.5rem] bg-blue-600 hover:bg-blue-700 transition-all text-[12px] font-black uppercase tracking-[0.4em] relative z-10 shadow-2xl shadow-blue-500/30">
            Download Pro Report
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
