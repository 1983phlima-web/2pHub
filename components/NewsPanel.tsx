
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchFinanceNews } from '../services/geminiService';
import { NewsItem } from '../types';

const NewsPanel: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await fetchFinanceNews();
      setNews(data);
      setLoading(false);
    };
    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-[3px] border-blue-500/20 border-t-blue-600 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-slate-900 font-black text-xl tracking-tighter uppercase">Processando Feed AI</p>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-60">Sincronizando agências internacionais</p>
        </div>
      </div>
    );
  }

  const NewsCard: React.FC<{ item: NewsItem; isRanked?: boolean }> = ({ item, isRanked }) => (
    <motion.div 
      layout
      whileHover={{ y: -8 }}
      className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all group flex flex-col h-full overflow-hidden"
    >
      {/* Image Header */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611974717483-9b4372993888?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Ranked Tag - Integrated into Image */}
        {isRanked && (
          <div className="absolute top-4 right-4">
            <div className="bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-xl backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.7l3.09 6.26L22 8.91l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 1.7z"/></svg>
              Rankeadas
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full">
            {item.source}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${item.category === 'economy' ? 'text-blue-600' : 'text-amber-600'}`}>
            {item.category === 'economy' ? 'Financial Sector' : 'Political Pulse'}
          </span>
          <span className="text-[10px] font-bold text-slate-300">{item.timestamp}</span>
        </div>
        
        <h4 className="font-black text-slate-900 text-xl mb-4 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
          {item.title}
        </h4>
        
        <p className="text-sm text-slate-500 leading-relaxed flex-grow line-clamp-3 mb-8 font-medium">
          {item.summary}
        </p>
        
        <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
          <button className="text-[11px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2 transition-all">
            Análise Pro
            <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </button>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400">AI</div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Terminal de Dados</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Press Room</h2>
          <p className="text-slate-400 font-bold mt-2 uppercase text-[11px] tracking-widest opacity-60">Curadoria algorítmica em tempo real.</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Global</button>
          <button className="px-6 py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors">Brasil</button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 px-4">
        {/* Economy Section */}
        <section className="space-y-8">
          <div className="flex items-center space-x-4 px-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Econômico</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Mercado de Capitais & Índices</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <AnimatePresence>
              {news.filter(n => n.category === 'economy').map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <NewsCard item={item} isRanked={idx === 0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Politics Section */}
        <section className="space-y-8">
          <div className="flex items-center space-x-4 px-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M12 12L12 8"/><path d="M12 12L16 12"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Político</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Geopolítica & Governança</p>
            </div>
          </div>

          <div className="space-y-8">
            <AnimatePresence>
              {news.filter(n => n.category === 'politics').map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.15) }}
                >
                  <NewsCard item={item} isRanked={idx === 0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsPanel;
