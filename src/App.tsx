import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import PieChart from './components/Charts/PieChart';
import BarChart from './components/Charts/BarChart';
import gsap from 'gsap';

const App: React.FC = () => {
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
    <div className="min-h-screen bg-[#fdfdff] selection:bg-indigo-100">
      <Navbar />
      <main ref={mainRef} className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
        <div className="dashboard-item">
          <SummaryCards />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-4 dashboard-item">
            <AddExpenseForm />
          </div>
          <div className="lg:col-span-8 dashboard-item">
            <ExpenseList />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10 dashboard-item">
          <BarChart />
          <PieChart />
        </div>
      </main>
      
      <footer className="py-12 text-center opacity-30 dashboard-item">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Built with React & GSAP • 2026</p>
      </footer>
    </div>
  );
};

export default App;