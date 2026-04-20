import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpenses } from '../../hooks/useExpenses';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const PieChart: React.FC = () => {
  const { summary } = useExpenses();

  const data = Object.entries(summary.byCategory).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) return (
    <div className="card border-none bg-surface/50 h-full flex flex-col items-center justify-center text-gray-400 py-12">
      <PieIcon className="w-16 h-16 mb-4 opacity-10" />
      <p className="font-bold tracking-tight">No data to visualize</p>
    </div>
  );

  return (
    <div className="card border-none bg-surface/80 h-full group">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-secondary/10 text-secondary rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all duration-500">
            <PieIcon className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Category Mix</h2>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
          Distribution
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={105}
              paddingAngle={8}
              dataKey="value"
              animationBegin={0}
              animationDuration={2000}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '1.5rem', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '1rem'
              }}
              itemStyle={{ fontWeight: 800 }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">{value}</span>}
            />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
