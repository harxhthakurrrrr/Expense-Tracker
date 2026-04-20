import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useExpenses } from '../../hooks/useExpenses';
import { BarChart as BarIcon } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

const BarChart: React.FC = () => {
  const { t } = useTranslation();
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
    <div className="card border-none bg-surface/50 h-full flex flex-col items-center justify-center text-gray-400 py-12">
      <BarIcon className="w-16 h-16 mb-4 opacity-10" />
      <p className="font-bold tracking-tight">{t('charts.no_data')}</p>
    </div>
  );

  return (
    <div className="card border-none bg-surface/80 h-full group">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <BarIcon className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">{t('charts.daily')}</h2>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
          {t('charts.last_7')}
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '1.5rem', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '1rem'
              }}
              itemStyle={{ fontWeight: 800, color: '#6366f1' }}
            />
            <Bar 
              dataKey="amount" 
              radius={[10, 10, 0, 0]}
              animationBegin={0}
              animationDuration={2000}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 ? '#6366f1' : '#818cf8'} 
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
