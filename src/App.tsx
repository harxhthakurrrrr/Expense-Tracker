import React from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import PieChart from './components/Charts/PieChart';
import BarChart from './components/Charts/BarChart';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <SummaryCards />
        
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <AddExpenseForm />
          </div>
          <div className="lg:col-span-2">
            <ExpenseList />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <BarChart />
          <PieChart />
        </div>
      </main>
    </div>
  );
};

export default App;