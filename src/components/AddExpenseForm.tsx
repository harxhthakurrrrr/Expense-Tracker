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
    <div ref={formRef} className="card border-none shadow-xl shadow-gray-200/50 p-8 sticky top-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#6366f1]/10 text-[#6366f1] rounded-xl">
          <PlusCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">{t('form.title')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
            {t('form.label_title')}
          </label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('form.placeholder_title')}
              className="input-field pl-12 bg-gray-50/50 border-transparent focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
              {t('form.label_amount')}
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
            <div className="flex justify-between items-center pr-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
                {t('form.label_category')}
              </label>
              {isAiLoading && (
                <span className="flex items-center gap-1 text-[9px] font-black text-[#6366f1] bg-[#6366f1]/5 px-2 py-0.5 rounded-full animate-pulse">
                  <Loader2 className="w-2 h-2 animate-spin" />
                  AI THINKING
                </span>
              )}
              {aiSuggested && !isAiLoading && (
                <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-2 h-2" />
                  AI PICKED
                </span>
              )}
            </div>
            <select
              className="input-field bg-gray-50/50 border-transparent focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              required
            >
              <option value="">{t('form.select_category')}</option>
              <option value="Food">{t('categories.Food')}</option>
              <option value="Transport">{t('categories.Transport')}</option>
              <option value="Shopping">{t('categories.Shopping')}</option>
              <option value="Entertainment">{t('categories.Entertainment')}</option>
              <option value="Bills">{t('categories.Bills')}</option>
              <option value="Other">{t('categories.Other')}</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">
            {t('form.label_date')}
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
            {t('form.label_note')}
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
            <textarea
              placeholder={t('form.placeholder_note')}
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
          {t('form.button_save')}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
