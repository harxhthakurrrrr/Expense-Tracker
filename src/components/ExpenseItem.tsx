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
    case "Food": return <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500"><Utensils className={iconClass} /></div>;
    case "Transport": return <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500"><Truck className={iconClass} /></div>;
    case "Shopping": return <div className="p-3 bg-pink-50 text-pink-500 rounded-2xl group-hover:bg-pink-500 group-hover:text-white transition-colors duration-500"><ShoppingBag className={iconClass} /></div>;
    case "Bills": return <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-colors duration-500"><Receipt className={iconClass} /></div>;
    case "Entertainment": return <div className="p-3 bg-violet-50 text-violet-500 rounded-2xl group-hover:bg-violet-500 group-hover:text-white transition-colors duration-500"><Play className={iconClass} /></div>;
    default: return <div className="p-3 bg-gray-50 text-gray-500 rounded-2xl group-hover:bg-gray-500 group-hover:text-white transition-colors duration-500"><MoreHorizontal className={iconClass} /></div>;
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
      className="group flex items-center justify-between p-4 bg-white hover:bg-gray-50/50 border border-transparent hover:border-gray-100 rounded-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <CategoryIcon category={expense.category} />
        <div>
          <h4 className="font-bold text-gray-900 group-hover:text-[#6366f1] transition-colors">{expense.title}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
              {t(`categories.${expense.category}`)}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
              <Calendar className="w-3 h-3" />
              {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-black text-gray-900">{formatCurrency(expense.amount)}</p>
          {expense.note && (
            <p className="text-[10px] text-gray-400 truncate max-w-[100px]">{expense.note}</p>
          )}
        </div>
        <button 
          onClick={handleDelete}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
