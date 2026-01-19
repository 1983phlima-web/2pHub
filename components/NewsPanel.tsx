
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
      whileHover={{ y: -8, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all group flex flex-col h-full overflow-hidden"
    >
      {/* Image Header with Skeleton Loader feel */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-slate-100">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611974717483-9b4372993888?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
        
        {isRanked && (
          <div className="absolute top-6 right-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.7l3.09 6.26L22 8.91l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 1.7z"/></svg>
              Rankeadas
            </motion.div>
          </div>
        )}

        <div className="absolute bottom-6 left-6">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-full">
            {item.source}
          </span>
        </div>
      </div>

      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-6">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.category === 'economy' ? 'text-blue-600' : 'text-amber-600'}`}>
            {item.category === 'economy' ? 'Financial Sector' : 'Political Pulse'}
          </span>
          <span className="text-[11px] font-bold text-slate-300">{item.timestamp}</span>
        </div>
        
        <h4 className="font-black text-slate-900 text-2xl mb-5 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
          {item.title}
        </h4>
        
        <p className="text-base text-slate-500 leading-relaxed flex-grow line-clamp-3 mb-10 font-medium">
          {item.summary}
        </p>
        
        <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-[12px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
          >
            Análise Pro
            <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </motion.button>
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">AI</div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-16 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600">Terminal de Dados</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">Press Room</h2>
          <p className="text-slate-400 font-bold mt-4 uppercase text-[13px] tracking-widest opacity-60">Curadoria algorítmica em tempo real.</p>
        </div>
        <div className="flex bg-white p-2.5 rounded-[2rem] border border-slate-100 shadow-xl">
          <button className="px-8 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg">Global</button>
          <button className="px-8 py-3 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors">Brasil</button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16 px-4">
        {/* Economy Section */}
        <section className="space-y-12">
          <div className="flex items-center space-x-5 px-2">
            <div className="w-12 h-12 rounded-[1.25rem] bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Econômico</h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Mercado de Capitais & Índices</p>
            </div>
          </div>
          
          <div className="space-y-10">
            <AnimatePresence>
              {news.filter(n => n.category === 'economy').map((item, idx) => (
                <NewsCard key={item.id} item={item} isRanked={idx === 0} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Politics Section */}
        <section className="space-y-12">
          <div className="flex items-center space-x-5 px-2">
            <div className="w-12 h-12 rounded-[1.25rem] bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M12 12L12 8"/><path d="M12 12L16 12"/></svg>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Político</h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Geopolítica & Governança</p>
            </div>
          </div>

          <div className="space-y-10">
            <AnimatePresence>
              {news.filter(n => n.category === 'politics').map((item, idx) => (
                <NewsCard key={item.id} item={item} isRanked={idx === 0} />
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsPanel;
