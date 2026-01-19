
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  onLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin }) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulação de delay de rede para autenticação
    setTimeout(() => {
      setIsLoading(false);
      if (isLoginTab) {
        // IDs Permitidos
        const allowedEmails = ['adminBuz@2p.com.br', 'phlima@2p.com.br'];
        
        if (allowedEmails.includes(email) && password === 'admin123') {
          onLogin();
        } else {
          setError('Credenciais inválidas. Verifique seu ID e Senha.');
        }
      } else {
        // Fluxo de solicitação de conta (apenas visual para este demo)
        setError('Solicitação enviada para análise do administrador.');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xl"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-[3rem] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 blur-[80px] pointer-events-none" />

        <div className="p-10 md:p-12 relative z-10 flex flex-col items-center">
          <header className="text-center mb-12 w-full">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Acesso Restrito <span className="text-blue-500">2pHub</span></h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 mb-2 rounded-full"></div>
            <p className="text-slate-400 text-xs font-bold tracking-[0.3em] uppercase opacity-60">Segurança 2p Intelligence</p>
          </header>

          <div className="flex w-full bg-slate-950/50 p-1.5 rounded-2xl mb-8 border border-white/5 shadow-inner">
            <button 
              onClick={() => { setIsLoginTab(true); setError(null); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${isLoginTab ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Autenticar
            </button>
            <button 
              onClick={() => { setIsLoginTab(false); setError(null); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${!isLoginTab ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Solicitar Conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <AnimatePresence mode="wait">
              {!isLoginTab && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Nome de Operador</label>
                  <input 
                    type="text" 
                    placeholder="Seu nome completo"
                    className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl px-5 py-4 focus:ring-2 ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all font-bold text-white text-sm placeholder:text-slate-700"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Terminal ID (E-mail)</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operador@2ptec.io"
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl px-5 py-4 focus:ring-2 ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all font-bold text-white text-sm placeholder:text-slate-700"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Cripto-Senha</label>
              </div>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl px-5 py-4 focus:ring-2 ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all font-bold text-white text-sm placeholder:text-slate-700"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 text-[10px] font-black uppercase text-center tracking-widest bg-rose-500/10 py-3 rounded-xl border border-rose-500/20"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full relative group mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 py-5 rounded-2xl font-black text-[11px] text-white tracking-[0.3em] uppercase flex items-center justify-center gap-3 shadow-xl transition-transform active:scale-95">
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                    <span>{isLoginTab ? 'Inicializar Sessão' : 'Solicitar Acesso'}</span>
                  </>
                )}
              </div>
            </button>
          </form>

          <footer className="mt-10 text-center">
            <div className="h-px w-20 bg-slate-800 mx-auto mb-6" />
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.25em] leading-relaxed max-w-[240px] mx-auto opacity-50">
              Protocolo de segurança <br/> criptografado 2p-v2.
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
