import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import PieChart from './components/Charts/PieChart';
import BarChart from './components/Charts/BarChart';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dashboard-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-appBg selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <main ref={mainRef} className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
        <div className="dashboard-item">
          <SummaryCards />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-10 mt-10">
          <div className="lg:col-span-4 dashboard-item">
            <AddExpenseForm />
          </div>
          <div className="lg:col-span-8 dashboard-item">
            <ExpenseList />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-10 dashboard-item">
          <BarChart />
          <PieChart />
        </div>
      </main>
      
      <footer className="py-12 text-center opacity-20 dashboard-item border-t border-white/5 mt-20">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] mono text-primary">SYSTEM :: OPERATIONAL // 2026</p>
      </footer>
    </div>
  );
};

export default App;