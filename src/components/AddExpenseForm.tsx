import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/expenseSlice';
import { PlusCircle, Tag, IndianRupee, Calendar, MessageSquare, Sparkles, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { aiCategorize } from '../utils/aiCategorize';
import { Category } from '../types';

const AddExpenseForm: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggested, setAiSuggested] = useState(false);
  
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value.length >= 3) {
      setIsAiLoading(true);
      const suggestedCategory = await aiCategorize(value);
      setCategory(suggestedCategory);
      setIsAiLoading(false);
      setAiSuggested(true);
      
      // Reset suggestion badge after 3 seconds
      setTimeout(() => setAiSuggested(false), 3000);
    }
  };

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
    <div ref={formRef} className="card border-white/5 bg-white/5 p-8 sticky top-24 shadow-neon">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary text-black rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.4)]">
          <PlusCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">{t('form.title')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 group">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors mono">
            // {t('form.label_title')}
          </label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={t('form.placeholder_title')}
              className="input-field pl-12"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors mono">
              // {t('form.label_amount')}
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="number"
                placeholder="0.00"
                className="input-field pl-12"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <div className="flex justify-between items-center pr-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors mono">
                // {t('form.label_category')}
              </label>
              {isAiLoading && (
                <span className="flex items-center gap-1 text-[8px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full animate-pulse mono">
                  THINKING...
                </span>
              )}
              {aiSuggested && !isAiLoading && (
                <span className="flex items-center gap-1 text-[8px] font-black text-black bg-primary px-2 py-0.5 rounded-full mono">
                  AI_PICKED
                </span>
              )}
            </div>
            <select
              className="input-field appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              required
            >
              <option value="" className="bg-cyber-black">{t('form.select_category')}</option>
              <option value="Food" className="bg-cyber-black">{t('categories.Food')}</option>
              <option value="Transport" className="bg-cyber-black">{t('categories.Transport')}</option>
              <option value="Shopping" className="bg-cyber-black">{t('categories.Shopping')}</option>
              <option value="Entertainment" className="bg-cyber-black">{t('categories.Entertainment')}</option>
              <option value="Bills" className="bg-cyber-black">{t('categories.Bills')}</option>
              <option value="Other" className="bg-cyber-black">{t('categories.Other')}</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors mono">
            // {t('form.label_date')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input
              type="date"
              className="input-field pl-12 [color-scheme:dark]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-primary transition-colors mono">
            // {t('form.label_note')}
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
            <textarea
              placeholder={t('form.placeholder_note')}
              className="input-field pl-12 pt-3 min-h-[100px] resize-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <button
          ref={buttonRef}
          type="submit"
          className="btn-primary w-full py-4 flex items-center justify-center gap-3 group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <PlusCircle className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-500" />
          <span className="relative z-10">{t('form.button_save')}</span>
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
