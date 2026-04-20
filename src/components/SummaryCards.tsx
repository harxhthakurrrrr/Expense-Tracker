import React, { useEffect, useRef, useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { formatCurrency } from '../utils/helpers';
import { TrendingDown, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, PieChart as PieChartIcon, AlertCircle, Sparkles, BrainCircuit } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getAiInsights } from '../utils/aiCategorize';

const SummaryCards: React.FC = () => {
  const { t } = useTranslation();
  const { summary, expenses } = useExpenses();
  const budgets = useSelector((state: RootState) => state.expenses.budgets);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aiInsights, setAiInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (expenses.length >= 3) {
        setLoadingInsights(true);
        const insights = await getAiInsights(expenses);
        setAiInsights(insights);
        setLoadingInsights(false);
      }
    };
    fetchInsights();
  }, [expenses.length]);

  const totalBudget = Object.values(budgets).reduce((acc, curr) => acc + curr, 0);
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalBudget - totalSpent;

  // Check if any category exceeded 80%
  const budgetWarnings = Object.entries(budgets).filter(([category, budget]) => {
    const spent = summary.byCategory[category] || 0;
    return spent >= budget * 0.8;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.summary-card', {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.4)',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -8,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      duration: 0.3,
      ease: 'power2.in',
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgetWarnings.length > 0 && (
          <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl flex items-center gap-4 shadow-neon">
            <div className="p-3 bg-rose-500 text-white rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.5)]">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-rose-500 uppercase tracking-wider">SYSTEM ALERT // BUDGET</h4>
              <p className="text-xs text-rose-400 font-bold mono">
                {budgetWarnings.map(([cat]) => t(`categories.${cat}`)).join(', ')} limit reached!
              </p>
            </div>
          </div>
        )}

        <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl flex items-center gap-4 shadow-neon relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform duration-500">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <div className="p-3 bg-primary text-black rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.5)]">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 mono">NEURAL INSIGHTS // ANALYZING</h4>
            <p className="text-xs text-gray-400 font-bold leading-relaxed italic">
              {loadingInsights ? (
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              ) : aiInsights || "Tracking shuru karo, fir insights milegi! 🚀"}
            </p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance */}
      <div 
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="summary-card relative overflow-hidden bg-black p-8 rounded-2xl text-white border border-primary/30 shadow-neon group cursor-pointer"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
            <Wallet className="w-7 h-7 text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary mono">
            DATA // BALANCE
          </span>
        </div>
        <div className="relative z-10">
          <h3 className="text-5xl font-black mb-4 tracking-tighter text-primary neon-text">{formatCurrency(balance)}</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-80 mono">
              <span>USAGE</span>
              <span className="text-primary">{Math.round((totalSpent / totalBudget) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,255,65,0.5)] ${
                  totalSpent / totalBudget >= 0.9 ? 'bg-rose-500' : 'bg-primary'
                }`}
                style={{ width: `${totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div 
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="summary-card card border-white/5 bg-white/5 p-8 group cursor-pointer hover:border-secondary/30 transition-colors"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="p-4 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(255,0,60,0.2)]">
            <TrendingDown className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-secondary px-3 py-1.5 bg-secondary/10 rounded-full flex items-center gap-1.5 border border-secondary/20 mono">
              <ArrowUpRight className="w-3.5 h-3.5" />
              2.4%
            </span>
            <span className="text-[9px] font-bold text-gray-500 mt-2 uppercase tracking-widest mono">OUTFLOW</span>
          </div>
        </div>
        <h3 className="text-4xl font-black text-white mb-2 tracking-tighter group-hover:text-secondary transition-colors">{formatCurrency(totalSpent)}</h3>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{t('summary.expenses')}</p>
      </div>

      {/* Filtered Total */}
      <div 
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="summary-card card border-white/5 bg-white/5 p-8 group cursor-pointer hover:border-accent/30 transition-colors"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="p-4 bg-accent/10 text-accent rounded-xl group-hover:bg-accent group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-accent px-3 py-1.5 bg-accent/10 rounded-full flex items-center gap-1.5 border border-accent/20 mono">
              <ArrowDownRight className="w-3.5 h-3.5" />
              1.2%
            </span>
            <span className="text-[9px] font-bold text-gray-500 mt-2 uppercase tracking-widest mono">ANALYSIS</span>
          </div>
        </div>
        <h3 className="text-4xl font-black text-white mb-2 tracking-tighter group-hover:text-accent transition-colors">{formatCurrency(summary.total)}</h3>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{t('summary.filtered')}</p>
      </div>
    </div>
  </div>
);
};

export default SummaryCards;
