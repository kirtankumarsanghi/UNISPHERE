"use client";

import { useState, useMemo, useEffect } from "react";
import { Calculator, TrendingUp, IndianRupee, Clock, ArrowRight, Wallet, PieChart, Building2, Search, ChevronDown, Check } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

type College = {
  id: string;
  name: string;
  annualFees: number;
  placements?: { avgPackage: number };
};

export default function ROICalculatorPage() {
  // Inputs
  const [tuitionFees, setTuitionFees] = useState<number>(1000000); // 10 Lakhs
  const [livingExpenses, setLivingExpenses] = useState<number>(400000); // 4 Lakhs
  const [expectedSalary, setExpectedSalary] = useState<number>(1200000); // 12 Lakhs
  const [salaryGrowth, setSalaryGrowth] = useState<number>(10); // 10% annual growth
  
  // Real Data Integration
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("custom");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/colleges?limit=100&sortBy=popular")
      .then(res => res.json())
      .then(data => {
        if (data.colleges && data.colleges.length > 0) {
          setColleges(data.colleges);
          
          // Auto-select the top college on load to show real data instantly
          const topCollege = data.colleges[0];
          setSelectedCollegeId(topCollege.id);
          setTuitionFees((topCollege.annualFees * 4) || 0);
          if (topCollege.placements?.avgPackage) {
            setExpectedSalary(topCollege.placements.avgPackage);
          }
        }
      })
      .catch(console.error);
  }, []);

  const handleCollegeSelect = (id: string) => {
    setSelectedCollegeId(id);
    if (id !== "custom") {
      const college = colleges.find(c => c.id === id);
      if (college) {
        setTuitionFees((college.annualFees * 4) || 0); // Assuming 4 year degree
        if (college.placements?.avgPackage) {
          setExpectedSalary(college.placements.avgPackage);
        }
      }
    }
  };

  // Loan Details
  const [loanPercentage, setLoanPercentage] = useState<number>(80); // 80% of total cost
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% interest
  const [loanTenure, setLoanTenure] = useState<number>(5); // 5 years

  // Derived Values
  const totalCost = tuitionFees + livingExpenses;
  const loanAmount = (totalCost * loanPercentage) / 100;
  const upfrontCost = totalCost - loanAmount;

  // EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    if (loanAmount === 0 || loanTenure === 0) return 0;
    if (interestRate === 0) return loanAmount / (loanTenure * 12);
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const monthlyEMI = calculateEMI();
  const totalAmountPaid = monthlyEMI * loanTenure * 12;
  const totalInterest = totalAmountPaid - loanAmount;

  // 10-Year Projection
  const generateProjection = () => {
    let currentSalary = expectedSalary;
    let cumulativeCash = -upfrontCost;
    let remainingDebt = loanAmount;

    const yearlyData = [];

    for (let year = 1; year <= 10; year++) {
      // Rough tax estimation (10% average)
      const tax = currentSalary * 0.10;
      
      // Rough living expenses post-grad (30% of salary)
      const living = currentSalary * 0.30;

      let yearlyEMI = 0;
      if (remainingDebt > 0) {
        const interestForYear = remainingDebt * (interestRate / 100);
        yearlyEMI = monthlyEMI * 12;
        let principalForYear = yearlyEMI - interestForYear;
        
        // Handle final year overpayment
        if (principalForYear >= remainingDebt) {
          principalForYear = remainingDebt;
          yearlyEMI = remainingDebt + interestForYear;
        }
        remainingDebt -= principalForYear;
        if (remainingDebt < 0) remainingDebt = 0;
      }

      const yearlySavings = currentSalary - tax - living - yearlyEMI;
      cumulativeCash += yearlySavings;

      yearlyData.push({
        year,
        salary: currentSalary,
        savings: yearlySavings,
        netWealth: cumulativeCash - remainingDebt,
      });

      // Increase salary for next year
      currentSalary = currentSalary * (1 + salaryGrowth / 100);
    }
    return yearlyData;
  };

  const projection = useMemo(() => generateProjection(), [expectedSalary, salaryGrowth, loanTenure, monthlyEMI, upfrontCost, loanAmount, interestRate]);
  const breakEvenYear = projection.findIndex(p => p.netWealth >= 0) + 1;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="pt-2">
          <BackButton fallback="/" />
        </div>
        <div className="text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 font-label-caps text-label-caps uppercase tracking-widest text-primary ring-1 ring-primary/20">
            <Calculator size={12} /> Financial Planner
          </div>
          <h1 className="font-display-xl text-[48px] sm:text-[64px] text-on-surface leading-[1.1]">
            ROI Calculator
          </h1>
          <p className="mt-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Calculate the true cost of your degree, estimate your loan EMIs, and visualize how long it will take to break even and build wealth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
        
        {/* Main Calculator Area */}
        <div className="space-y-6">
          
          {/* College Selection */}
          <div className="rounded-[2rem] glass-card p-6 sm:p-8 relative z-50">
            <h2 className="font-headline-md text-xl text-on-surface mb-6 flex items-center gap-2">
              <Building2 size={20} className="text-primary" /> Select Institution
            </h2>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                Autofill from Database
              </label>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface outline-none transition-all hover:bg-white/5 focus:ring-1 focus:ring-primary/50"
              >
                <span>{selectedCollegeId === 'custom' ? 'Custom Inputs (Manual)' : colleges.find(c => c.id === selectedCollegeId)?.name || 'Select College...'}</span>
                <ChevronDown size={16} className={`text-on-surface-variant transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-xl bg-[#0f111a] border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
                  <div className="p-3 border-b border-white/10 flex items-center gap-2">
                    <Search size={16} className="text-on-surface-variant" />
                    <input 
                      type="text" 
                      placeholder="Search colleges..." 
                      className="bg-transparent w-full text-sm outline-none text-on-surface"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                    <button 
                      onClick={() => { handleCollegeSelect("custom"); setIsDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${selectedCollegeId === 'custom' ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-white/5 text-on-surface-variant hover:text-on-surface'}`}
                    >
                      Custom Inputs (Manual)
                    </button>
                    {colleges.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                      <button 
                        key={c.id}
                        onClick={() => { handleCollegeSelect(c.id); setIsDropdownOpen(false); }}
                        className={`w-full flex justify-between items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${selectedCollegeId === c.id ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-white/5 text-on-surface-variant hover:text-on-surface'}`}
                      >
                        <span className="truncate pr-2 text-left">{c.name}</span>
                        {selectedCollegeId === c.id && <Check size={14} className="shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="mt-3 text-[12px] text-on-surface-variant/70">
              Selecting a college automatically fills average 4-year tuition and expected starting salary based on our placement records.
            </p>
          </div>

          {/* Degree Costs */}
          <div className="rounded-[2rem] glass-card p-6 sm:p-8">
            <h2 className="font-headline-md text-xl text-on-surface mb-6 flex items-center gap-2">
              <IndianRupee size={20} className="text-emerald-400" /> College Expenses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex justify-between mb-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                  <span>Tuition Fees (Total)</span>
                  <span className="text-on-surface font-bold">{formatCurrency(tuitionFees)}</span>
                </label>
                <input 
                  type="range" min="0" max="5000000" step="50000" 
                  value={tuitionFees} onChange={(e) => { setTuitionFees(Number(e.target.value)); setSelectedCollegeId("custom"); }}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div>
                <label className="flex justify-between mb-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                  <span>Living Expenses (Total)</span>
                  <span className="text-on-surface font-bold">{formatCurrency(livingExpenses)}</span>
                </label>
                <input 
                  type="range" min="0" max="2000000" step="50000" 
                  value={livingExpenses} onChange={(e) => setLivingExpenses(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
              <span className="font-headline-md text-on-surface-variant">Total Cost of Degree</span>
              <span className="font-display-md text-2xl text-emerald-400 font-bold">{formatCurrency(totalCost)}</span>
            </div>
          </div>

          {/* Education Loan */}
          <div className="rounded-[2rem] glass-card p-6 sm:p-8">
            <h2 className="font-headline-md text-xl text-on-surface mb-6 flex items-center gap-2">
              <PieChart size={20} className="text-blue-400" /> Education Loan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="flex justify-between mb-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                  <span>Loan %</span>
                  <span className="text-on-surface font-bold">{loanPercentage}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" step="5" 
                  value={loanPercentage} onChange={(e) => setLoanPercentage(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div>
                <label className="flex justify-between mb-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                  <span>Interest Rate</span>
                  <span className="text-on-surface font-bold">{interestRate}%</span>
                </label>
                <input 
                  type="range" min="5" max="15" step="0.1" 
                  value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div>
                <label className="flex justify-between mb-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                  <span>Tenure (Years)</span>
                  <span className="text-on-surface font-bold">{loanTenure} Yrs</span>
                </label>
                <input 
                  type="range" min="1" max="15" step="1" 
                  value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Post-Graduation Career */}
          <div className="rounded-[2rem] glass-card p-6 sm:p-8">
            <h2 className="font-headline-md text-xl text-on-surface mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-purple-400" /> Post-Graduation Income
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex justify-between mb-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                  <span>Expected Starting Salary</span>
                  <span className="text-on-surface font-bold">{formatCurrency(expectedSalary)}</span>
                </label>
                <input 
                  type="range" min="300000" max="10000000" step="100000" 
                  value={expectedSalary} onChange={(e) => { setExpectedSalary(Number(e.target.value)); setSelectedCollegeId("custom"); }}
                  className="w-full accent-purple-500"
                />
              </div>
              <div>
                <label className="flex justify-between mb-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                  <span>Annual Salary Growth</span>
                  <span className="text-on-surface font-bold">{salaryGrowth}%</span>
                </label>
                <input 
                  type="range" min="0" max="30" step="1" 
                  value={salaryGrowth} onChange={(e) => setSalaryGrowth(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="rounded-[2rem] glass-card p-6 bg-gradient-to-b from-bg-surface to-bg-base relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            
            <h3 className="font-headline-md text-lg text-on-surface mb-6">Financial Summary</h3>
            
            <div className="space-y-6 relative z-10">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-1">Estimated Monthly EMI</p>
                <p className="font-display-md text-3xl text-on-surface font-bold">{monthlyEMI > 0 ? formatCurrency(Math.round(monthlyEMI)) : "₹0"}</p>
                {monthlyEMI > 0 && <p className="text-xs text-on-surface-variant mt-1">For {loanTenure * 12} months</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <p className="font-label-caps text-[9px] uppercase tracking-widest text-on-surface-variant/70 mb-1">Loan Amount</p>
                  <p className="font-body-md font-bold text-on-surface">{formatCurrency(loanAmount)}</p>
                </div>
                <div>
                  <p className="font-label-caps text-[9px] uppercase tracking-widest text-on-surface-variant/70 mb-1">Total Interest</p>
                  <p className="font-body-md font-bold text-red-400">{formatCurrency(Math.round(totalInterest))}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-2">Break-Even Time</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30">
                    <Clock size={18} />
                  </div>
                  <div>
                    {breakEvenYear > 0 ? (
                      <p className="font-headline-md text-xl text-emerald-400">{breakEvenYear} Years</p>
                    ) : (
                      <p className="font-headline-md text-xl text-amber-400">> 10 Years</p>
                    )}
                    <p className="text-[11px] text-on-surface-variant">after graduation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 10 Year Wealth Projection */}
          <div className="rounded-[2rem] glass-card p-6">
            <h3 className="font-headline-md text-lg text-on-surface mb-4">10-Year Wealth Projection</h3>
            <p className="text-xs text-on-surface-variant mb-6">Net wealth after deducting EMI, estimated tax (15%), and living costs (30%).</p>
            
            <div className="space-y-3">
              {[1, 3, 5, 10].map(year => {
                const data = projection.find(p => p.year === year);
                if (!data) return null;
                const isPositive = data.netWealth >= 0;
                return (
                  <div key={year} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant">Year {year}</span>
                    <span className={`font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{formatCurrency(Math.round(data.netWealth))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
