import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../store/expenseSlice';
import { Expense, Category } from '../types';
import { Trash2, ShoppingBag, Utensils, Truck, Receipt, Play, MoreHorizontal, Calendar, Notebook } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import gsap from 'gsap';

interface ExpenseItemProps {
  expense: Expense;
  index: number;
}

const CategoryIcon = ({ category }: { category: Category }) => {
  switch (category) {
    case "Food": return <Utensils className="w-4 h-4" />;
    case "Transport": return <Truck className="w-4 h-4" />;
    case "Shopping": return <ShoppingBag className="w-4 h-4" />;
    case "Bills": return <Receipt className="w-4 h-4" />;
    case "Entertainment": return <Play className="w-4 h-4" />;
    default: return <MoreHorizontal className="w-4 h-4" />;
  }
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, index }) => {
  const dispatch = useDispatch();
  const itemRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          dispatch(deleteExpense(expense.id));
        }
      });
    } else {
      dispatch(deleteExpense(expense.id));
    }
  };

  return (
    <div 
      ref={itemRef}
      className="group bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all mb-3 relative overflow-hidden"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${
          expense.category === 'Food' ? 'bg-orange-100 text-orange-600' :
          expense.category === 'Transport' ? 'bg-blue-100 text-blue-600' :
          expense.category === 'Shopping' ? 'bg-purple-100 text-purple-600' :
          expense.category === 'Bills' ? 'bg-red-100 text-red-600' :
          expense.category === 'Entertainment' ? 'bg-green-100 text-green-600' :
          'bg-gray-100 text-gray-600'
        }`}>
          <CategoryIcon category={expense.category} />
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            {expense.title}
            {expense.note && (
              <span className="text-gray-400 font-normal text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Notebook className="w-3 h-3" />
                {expense.note}
              </span>
            )}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(expense.date)}
            </span>
            <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100">
              {expense.category}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-gray-900">
          -{formatCurrency(expense.amount)}
        </span>
        <button 
          title="Delete"
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-all active:scale-90"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
