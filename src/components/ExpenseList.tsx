import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setCategory } from '../store/expenseSlice';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseItem from './ExpenseItem';
import { Category } from '../types';
import { Filter, Inbox } from 'lucide-react';
import gsap from 'gsap';

const CATEGORIES: (Category | "All")[] = ["All", "Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

const ExpenseList: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredExpenses, filteredCategory } = useExpenses();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { 
          y: 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.5, 
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }
  }, [filteredExpenses.length, filteredCategory]);

  return (
    <div className="card h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="text-primary w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                filteredCategory === cat
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="space-y-1">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense, index) => (
            <ExpenseItem 
              key={expense.id} 
              expense={expense} 
              index={index} 
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
              <Inbox className="w-10 h-10" />
            </div>
            <p className="font-medium">No expenses found</p>
            <p className="text-sm">Try changing filters or adding a new expense</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
