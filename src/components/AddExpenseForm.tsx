import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/expenseSlice';
import { PlusCircle, Tag, IndianRupee, Calendar, MessageSquare } from 'lucide-react';
import gsap from 'gsap';

const AddExpenseForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    dispatch(addExpense({
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category,
      date,
      note
    }));

    // Success animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setTitle('');
        setAmount('');
        setCategory('');
        setNote('');
      }
    });
  };

  return (
    <div ref={formRef} className="card border-none shadow-xl shadow-gray-200/50 p-8 sticky top-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#6366f1]/10 text-[#6366f1] rounded-xl">
          <PlusCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Add Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
            Title
          </label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="What did you spend on?"
              className="input-field pl-12 bg-gray-50/50 border-transparent focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
              Amount
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                placeholder="0.00"
                className="input-field pl-12 bg-gray-50/50 border-transparent focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
              Category
            </label>
            <select
              className="input-field bg-gray-50/50 border-transparent focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="input-field pl-12 bg-gray-50/50 border-transparent focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
            Note (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
            <textarea
              placeholder="Add some details..."
              className="input-field pl-12 pt-3 min-h-[100px] bg-gray-50/50 border-transparent focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all resize-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <button
          ref={buttonRef}
          type="submit"
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
