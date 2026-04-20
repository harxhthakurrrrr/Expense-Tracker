import React, { useEffect, useRef } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { formatCurrency } from '../utils/helpers';
import { TrendingDown, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';

const SummaryCards: React.FC = () => {
  const { summary, expenses } = useExpenses();
  const containerRef = useRef<HTMLDivElement>(null);

  const totalBudget = 50000; // Mock budget for now
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalBudget - totalSpent;

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)',
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Balance */}
      <div className="card bg-gradient-to-br from-primary to-blue-700 text-white border-none">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            Current Balance
          </span>
        </div>
        <h3 className="text-3xl font-bold mb-1">{formatCurrency(balance)}</h3>
        <p className="text-white/70 text-sm flex items-center gap-1">
          Budget: {formatCurrency(totalBudget)}
        </p>
      </div>

      {/* Total Expenses */}
      <div className="card border-l-4 border-l-danger">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <TrendingDown className="w-5 h-5 text-danger" />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-red-50 text-danger rounded-full border border-red-100 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            +2.4%
          </span>
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-1">{formatCurrency(totalSpent)}</h3>
        <p className="text-gray-500 text-sm">Total Expenses</p>
      </div>

      {/* Filtered Total */}
      <div className="card border-l-4 border-l-secondary">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-green-50 text-secondary rounded-full border border-green-100 flex items-center gap-1">
            <ArrowDownRight className="w-3 h-3" />
            -1.2%
          </span>
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-1">{formatCurrency(summary.total)}</h3>
        <p className="text-gray-500 text-sm">Filtered Total</p>
      </div>
    </div>
  );
};

export default SummaryCards;
