import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import PieChart from './components/Charts/PieChart';
import BarChart from './components/Charts/BarChart';
import gsap from 'gsap';

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Main container entry animation
      const tl = gsap.timeline();
      
      tl.from(contentRef.current, {
        opacity: 0,
        duration: 0.5,
      })
      .from(".animate-section", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main ref={contentRef} className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Row */}
        <div className="animate-section">
          <SummaryCards />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Form & Charts */}
          <div className="lg:col-span-4 space-y-8">
            <div className="animate-section">
              <AddExpenseForm />
            </div>
            
            <div className="animate-section">
              <PieChart />
            </div>

            <div className="animate-section">
              <BarChart />
            </div>
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="animate-section">
              <ExpenseList />
            </div>
          </div>

        </div>
      </main>

      <footer className="py-12 text-center text-gray-400 text-sm">
        <p>© 2026 ExpenseTracker. Built with React + TypeScript + GSAP</p>
      </footer>
    </div>
  );
};

export default App;
