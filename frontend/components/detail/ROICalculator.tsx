"use client";

import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Calculator, IndianRupee, TrendingUp, HelpCircle } from 'lucide-react';

interface ROICalculatorProps {
  collegeName: string;
  defaultFee: number;
  defaultSalary: number;
}

export function ROICalculator({ collegeName, defaultFee, defaultSalary }: ROICalculatorProps) {
  const [tuitionFee, setTuitionFee] = useState(defaultFee);
  const [startingSalary, setStartingSalary] = useState(defaultSalary);
  const [salaryGrowth, setSalaryGrowth] = useState(10); // 10% annual growth
  
  const data = useMemo(() => {
    let cumulativeCost = tuitionFee;
    let cumulativeEarnings = 0;
    const chartData = [];
    
    // Calculate for 10 years after graduation
    for (let year = 1; year <= 10; year++) {
      const currentSalary = startingSalary * Math.pow(1 + salaryGrowth / 100, year - 1);
      cumulativeEarnings += currentSalary;
      
      chartData.push({
        year: `Year ${year}`,
        NetWorth: Math.round(cumulativeEarnings - cumulativeCost),
        Cost: cumulativeCost,
        Earnings: Math.round(cumulativeEarnings),
      });
    }
    return chartData;
  }, [tuitionFee, startingSalary, salaryGrowth]);

  const breakEvenYear = data.findIndex(d => d.NetWorth > 0) + 1;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 border border-white/10 rounded-xl shadow-xl">
          <p className="font-label-caps text-on-surface font-bold mb-2">{label}</p>
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex items-center gap-2 font-body-md text-[13px]">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-on-surface-variant capitalize">{p.dataKey}:</span>
              <span className="text-on-surface font-semibold">₹{(p.value / 100000).toFixed(1)}L</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-[2rem] p-6 lg:p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-headline-md text-[24px] text-on-surface flex items-center gap-2">
            <Calculator size={24} className="text-primary" />
            Dynamic ROI Calculator
          </h2>
          <p className="font-body-md text-on-surface-variant mt-1 text-[14px]">
            Calculate your true return on investment for {collegeName}
          </p>
        </div>
        <div className="hidden sm:flex h-12 w-12 rounded-xl bg-primary/10 items-center justify-center border border-primary/20 text-primary">
          <TrendingUp size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant flex items-center justify-between mb-2">
              Total Course Fee (₹)
            </label>
            <div className="relative">
              <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
              <input 
                type="number"
                value={tuitionFee}
                onChange={(e) => setTuitionFee(Number(e.target.value))}
                className="w-full glass-panel border-white/10 rounded-xl py-3 pl-10 pr-4 text-on-surface font-headline-md text-[18px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant flex items-center justify-between mb-2">
              Expected Starting Salary (₹)
            </label>
            <div className="relative">
              <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
              <input 
                type="number"
                value={startingSalary}
                onChange={(e) => setStartingSalary(Number(e.target.value))}
                className="w-full glass-panel border-white/10 rounded-xl py-3 pl-10 pr-4 text-on-surface font-headline-md text-[18px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant flex items-center justify-between mb-2">
              Expected Annual Growth (%)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range"
                min="0"
                max="30"
                value={salaryGrowth}
                onChange={(e) => setSalaryGrowth(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="font-headline-md text-[18px] text-on-surface min-w-[3rem] text-right">
                {salaryGrowth}%
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
              <p className="font-label-caps text-[10px] uppercase tracking-widest text-primary mb-1">Estimated Break-Even</p>
              <div className="font-headline-lg text-[32px] text-on-surface">
                {breakEvenYear > 0 ? `${breakEvenYear} Years` : 'Never'}
              </div>
              <p className="font-body-md text-[12px] text-on-surface-variant mt-1">
                after graduation to recover full college cost.
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border-white/5 p-4 sm:p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="year" 
                stroke="#ffffff40" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#ffffff40" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `₹${value / 100000}L`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#ffffff40" strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="NetWorth" 
                stroke="#4EDEA3" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#bg-base', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#4EDEA3', stroke: '#0F0F13', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
