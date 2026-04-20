import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../store/expenseSlice';
import { Expense } from '../types';
import { formatCurrency } from '../utils/helpers';
import { Trash2, ShoppingBag, Utensils, Truck, Receipt, Play, MoreHorizontal, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

interface ExpenseItemProps {
  expense: Expense;
}

const CategoryIcon = ({ category }: { category: string }) => {
  const iconClass = "w-5 h-5";
  switch (category) {
    case "Food": return <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-black transition-colors duration-500 shadow-neon"><Utensils className={iconClass} /></div>;
    case "Transport": return <div className="p-3 bg-accent/10 text-accent rounded-xl group-hover:bg-accent group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(0,240,255,0.2)]"><Truck className={iconClass} /></div>;
    case "Shopping": return <div className="p-3 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(255,0,60,0.2)]"><ShoppingBag className={iconClass} /></div>;
    case "Bills": return <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl group-hover:bg-yellow-500 group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]"><Receipt className={iconClass} /></div>;
    case "Entertainment": return <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl group-hover:bg-purple-500 group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]"><Play className={iconClass} /></div>;
    default: return <div className="p-3 bg-white/5 text-white rounded-xl group-hover:bg-white group-hover:text-black transition-colors duration-500"><MoreHorizontal className={iconClass} /></div>;
  }
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const itemRef = React.useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    gsap.to(itemRef.current, {
      x: 100,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        dispatch(deleteExpense(expense.id));
      }
    });
  };

  return (
    <div 
      ref={itemRef}
      className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/20 rounded-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <CategoryIcon category={expense.category} />
        <div>
          <h4 className="font-bold text-white group-hover:text-primary transition-colors tracking-tight">{expense.title}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 mono">
              {t(`categories.${expense.category}`)}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-gray-600 mono">
              <Calendar className="w-3 h-3" />
              {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-black text-primary neon-text mono">{formatCurrency(expense.amount)}</p>
          {expense.note && (
            <p className="text-[9px] text-gray-600 truncate max-w-[120px] italic">{expense.note}</p>
          )}
        </div>
        <button 
          onClick={handleDelete}
          className="p-2 text-gray-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
