import React, { useEffect, useRef } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseItem from './ExpenseItem';
import { ListFilter, Search, Download } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { exportToCSV } from '../utils/helpers';

const ExpenseList: React.FC = () => {
  const { t } = useTranslation();
  const { expenses } = useExpenses();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current && expenses.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.expense-item-anim', {
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }, listRef);
      return () => ctx.revert();
    }
  }, [expenses.length]); // Re-animate on length change

  return (
    <div className="card border-white/5 bg-white/5 h-full flex flex-col shadow-neon">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-xl font-black text-white tracking-tighter flex items-center gap-3 uppercase italic">
          <span className="text-primary">//</span> {t('list.title')}
          <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20 mono">
            {expenses.length}
          </span>
        </h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t('list.placeholder_search')}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 focus:bg-white/10 focus:border-primary/50 rounded-xl text-sm transition-all outline-none text-white mono"
            />
          </div>
          <button 
            onClick={() => exportToCSV(expenses)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black hover:shadow-neon-strong rounded-xl transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">{t('list.download')}</span>
          </button>
        </div>
      </div>

      <div ref={listRef} className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {expenses.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center h-full">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">{t('list.no_data')}</p>
            <p className="text-sm text-gray-400 mt-1">{t('list.add_first')}</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="expense-item-anim">
              <ExpenseItem expense={expense} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
