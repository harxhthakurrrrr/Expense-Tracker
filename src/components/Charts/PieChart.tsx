import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpenses } from '../../hooks/useExpenses';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

const PieChart: React.FC = () => {
  const { summary } = useExpenses();

  const data = Object.entries(summary.byCategory).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) return (
    <div className="card h-full flex flex-col items-center justify-center text-gray-400 py-12">
      <PieIcon className="w-12 h-12 mb-4 opacity-20" />
      <p>No data to visualize</p>
    </div>
  );

  return (
    <div className="card h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <PieIcon className="text-primary w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold">Category Breakdown</h2>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
