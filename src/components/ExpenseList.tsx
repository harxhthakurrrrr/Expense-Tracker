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
    <div className="card border-none shadow-xl shadow-gray-200/50 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          {t('list.title')}
          <span className="text-xs font-bold bg-[#6366f1]/10 text-[#6366f1] px-2 py-1 rounded-lg">
            {expenses.length}
          </span>
        </h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
            <input 
              type="text" 
              placeholder={t('list.placeholder_search')}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:shadow-md focus:shadow-[#6366f1]/5 rounded-xl text-sm transition-all outline-none"
            />
          </div>
          <button className="p-2.5 text-gray-500 hover:text-[#6366f1] hover:bg-[#6366f1]/10 rounded-xl transition-colors">
            <ListFilter className="w-5 h-5" />
          </button>
          <button 
            onClick={() => exportToCSV(expenses)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all font-bold text-sm"
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
