import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/expenseSlice';
import { Category, Expense } from '../types';
import { PlusCircle, ShoppingBag, Utensils, Truck, Receipt, Play, MoreHorizontal } from 'lucide-react';
import { generateId } from '../utils/helpers';
import gsap from 'gsap';

const CATEGORIES: Category[] = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

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

const AddExpenseForm: React.FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food' as Category,
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.2
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || parseFloat(formData.amount) <= 0) return;

    const newExpense: Expense = {
      id: generateId(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note
    };

    dispatch(addExpense(newExpense));
    
    // Reset form with animation
    gsap.to(formRef.current, {
      y: -10,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
      onComplete: () => {
        setFormData({
          title: '',
          amount: '',
          category: 'Food' as Category,
          date: new Date().toISOString().split('T')[0],
          note: ''
        });
      }
    });
  };

  return (
    <div ref={formRef} className="card h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <PlusCircle className="text-primary w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold">Add New Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="What did you spend on?"
            className="input-field"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="input-field"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="input-field"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat })}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border ${
                  formData.category === cat 
                    ? 'bg-primary border-primary text-white shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'
                }`}
              >
                <CategoryIcon category={cat} />
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
          <textarea
            placeholder="Add a little detail..."
            className="input-field h-20 resize-none"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
          <PlusCircle className="w-5 h-5" />
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
