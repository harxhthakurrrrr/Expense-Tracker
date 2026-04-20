import React, { useEffect, useRef } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { formatCurrency } from '../utils/helpers';
import { TrendingDown, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, PieChart as PieChartIcon } from 'lucide-react';
import gsap from 'gsap';

const SummaryCards: React.FC = () => {
  const { summary, expenses } = useExpenses();
  const containerRef = useRef<HTMLDivElement>(null);

  const totalBudget = 50000; // Mock budget for now
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalBudget - totalSpent;

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
            Total Balance
          </span>
        </div>
        <div className="relative z-10">
          <h3 className="text-5xl font-black mb-4 tracking-tighter">{formatCurrency(balance)}</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-80">
              <span>Budget Used</span>
              <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
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
            <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Growth Rate</span>
          </div>
        </div>
        <h3 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter group-hover:text-[#ec4899] transition-colors">{formatCurrency(totalSpent)}</h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Expenses</p>
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
            <span className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Trend Analysis</span>
          </div>
        </div>
        <h3 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter group-hover:text-[#6366f1] transition-colors">{formatCurrency(summary.total)}</h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Filtered Balance</p>
      </div>
    </div>
  );
};

export default SummaryCards;
