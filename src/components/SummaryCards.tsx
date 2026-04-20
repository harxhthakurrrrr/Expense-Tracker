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
          <div className="bg-rose-50 border border-rose-100 p-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-rose-500 text-white rounded-2xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-rose-900 uppercase tracking-wider">Budget Alert!</h4>
              <p className="text-xs text-rose-600 font-bold">
                {budgetWarnings.map(([cat]) => t(`categories.${cat}`)).join(', ')} limit reached!
              </p>
            </div>
          </div>
        )}

        <div className="bg-[#6366f1]/5 border border-[#6366f1]/10 p-5 rounded-3xl flex items-center gap-4 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform duration-500">
            <Sparkles className="w-12 h-12 text-[#6366f1]" />
          </div>
          <div className="p-3 bg-[#6366f1] text-white rounded-2xl shadow-lg shadow-indigo-500/30">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black text-[#6366f1] uppercase tracking-[0.2em] mb-1">AI Financial Insights</h4>
            <p className="text-xs text-gray-700 font-bold leading-relaxed italic">
              {loadingInsights ? (
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#6366f1] rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-[#6366f1] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-[#6366f1] rounded-full animate-bounce [animation-delay:0.4s]"></span>
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
        className="summary-card relative overflow-hidden bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#ec4899] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-500/20 group cursor-pointer"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-xl border border-white/30">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-white/20 rounded-full backdrop-blur-xl border border-white/20">
            {t('summary.balance')}
          </span>
        </div>
        <div className="relative z-10">
          <h3 className="text-5xl font-black mb-4 tracking-tighter">{formatCurrency(balance)}</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-80">
              <span>{t('summary.budget_used')}</span>
              <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)] ${
                  totalSpent / totalBudget >= 0.9 ? 'bg-rose-400' : 'bg-white'
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
        className="summary-card card border-none bg-white p-8 group cursor-pointer"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="p-4 bg-[#ec4899]/10 text-[#ec4899] rounded-2xl group-hover:bg-[#ec4899] group-hover:text-white transition-all duration-500 shadow-lg shadow-[#ec4899]/5">
            <TrendingDown className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-[#ec4899] px-3 py-1.5 bg-[#ec4899]/10 rounded-full flex items-center gap-1.5 border border-[#ec4899]/20">
              <ArrowUpRight className="w-3.5 h-3.5" />
              2.4%
            </span>
            <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{t('summary.growth')}</span>
          </div>
        </div>
        <h3 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter group-hover:text-[#ec4899] transition-colors">{formatCurrency(totalSpent)}</h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{t('summary.expenses')}</p>
      </div>

      {/* Filtered Total */}
      <div 
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="summary-card card border-none bg-white p-8 group cursor-pointer"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="p-4 bg-[#6366f1]/10 text-[#6366f1] rounded-2xl group-hover:bg-[#6366f1] group-hover:text-white transition-all duration-500 shadow-lg shadow-[#6366f1]/5">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-[#6366f1] px-3 py-1.5 bg-[#6366f1]/10 rounded-full flex items-center gap-1.5 border border-[#6366f1]/20">
              <ArrowDownRight className="w-3.5 h-3.5" />
              1.2%
            </span>
            <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{t('summary.trend')}</span>
          </div>
        </div>
        <h3 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter group-hover:text-[#6366f1] transition-colors">{formatCurrency(summary.total)}</h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{t('summary.filtered')}</p>
      </div>
    </div>
  </div>
);
};

export default SummaryCards;
