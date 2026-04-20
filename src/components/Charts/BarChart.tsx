import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useExpenses } from '../../hooks/useExpenses';
import { BarChart as BarIcon } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const BarChart: React.FC = () => {
  const { filteredExpenses } = useExpenses();

  // Group by date
  const dataMap = filteredExpenses.reduce((acc, curr) => {
    const dateStr = curr.date;
    acc[dateStr] = (acc[dateStr] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(dataMap)
    .map(([date, amount]) => ({
      date: formatDate(date),
      amount,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7); // Last 7 days

  if (data.length === 0) return (
    <div className="card h-full flex flex-col items-center justify-center text-gray-400 py-12">
      <BarIcon className="w-12 h-12 mb-4 opacity-20" />
      <p>No data to visualize</p>
    </div>
  );

  return (
    <div className="card h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BarIcon className="text-primary w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold">Daily Spending</h2>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
            <Bar 
              dataKey="amount" 
              fill="#3b82f6" 
              radius={[6, 6, 0, 0]}
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
              ))}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
