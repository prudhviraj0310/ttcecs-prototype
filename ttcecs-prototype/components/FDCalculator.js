// components/FDCalculator.js
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import CountUp from 'react-countup';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function FDCalculator() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const getTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };
    getTheme();
    const observer = new MutationObserver(getTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';
  const [principal, setPrincipal] = useState(50000);
  const [years, setYears] = useState(3);
  const [rate] = useState(14.40);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    // FD formula: A = P × (1 + r/400)^(4×t) for quarterly compounding
    const amount = principal * Math.pow(1 + rate / 400, 4 * years);
    setMaturityAmount(amount);
    setInterest(amount - principal);
  }, [principal, years, rate]);

  // Generate growth data for chart
  const generateChartData = () => {
    const labels = [];
    const principalData = [];
    const totalData = [];

    for (let year = 0; year <= years; year++) {
      labels.push(`Year ${year}`);
      principalData.push(principal);
      const amount = principal * Math.pow(1 + rate / 400, 4 * year);
      totalData.push(amount);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Principal Amount',
          data: principalData,
          borderColor: 'rgba(159, 176, 200, 0.5)',
          backgroundColor: 'rgba(159, 176, 200, 0.1)',
          borderWidth: 2,
          fill: true,
        },
        {
          label: 'Total Value',
          data: totalData,
          borderColor: '#00d9ff',
          backgroundColor: 'rgba(0, 217, 255, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#9fb0c8',
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(7, 20, 40, 0.9)',
        titleColor: '#00d9ff',
        bodyColor: '#fff',
        borderColor: '#00d9ff',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9fb0c8',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9fb0c8',
          callback: (value) => `₹${(value / 1000).toFixed(0)}K`,
        },
      },
    },
  };

  return (
    <section id="calculator" className={`py-24 ${isDark ? "bg-gradient-to-b from-[#071428] to-[#03121f]" : "bg-gradient-to-b from-white to-[#F5FAFF]"} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(39,169,225,0.15)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Calculate Your FD Returns</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            See how your investment grows with THECOS Fixed Deposits at 14.40% per annum. Minimum deposit: ₹500, tenure: 1-10 years
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-2xl space-y-8"
          >
            {/* Principal Input */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-semibold text-muted">Investment Amount</label>
                <span className="text-electric font-bold">
                  ₹ <CountUp end={principal} duration={0.5} separator="," />
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="1000000"
                step="500"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-electric"
              />
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>₹500</span>
                <span>₹10L</span>
              </div>
            </div>

            {/* Duration Input */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-semibold text-muted">Investment Period</label>
                <span className="text-electric font-bold">{years} {years === 1 ? 'Year' : 'Years'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-electric"
              />
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>1 Year</span>
                <span>10 Years</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-muted">Interest Rate (p.a.)</label>
                <span className="text-2xl font-black text-electric">{rate}%</span>
              </div>
              <p className="text-xs text-muted mt-2">Quarterly compounded</p>
            </div>

            {/* Results */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Total Interest</span>
                <span className="text-xl font-bold text-green-400">
                  + ₹ <CountUp end={interest} duration={1} separator="," decimals={0} />
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-electric/10 rounded-xl">
                <span className="text-sm font-semibold">Maturity Amount</span>
                <span className="text-2xl font-black text-electric">
                  ₹ <CountUp end={maturityAmount} duration={1} separator="," decimals={0} />
                </span>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-electric text-[#00121a] py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-electric/50 transition-shadow"
            >
              Open Fixed Deposit Account
            </motion.button>
          </motion.div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Growth Visualization</h3>
            <div className="h-[350px]">
              <Line data={generateChartData()} options={chartOptions} />
            </div>
            
            {/* Growth Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-electric">
                  {((interest / principal) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted mt-1">Total Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-electric">
                  ₹{(interest / years / 12).toFixed(0)}
                </div>
                <div className="text-xs text-muted mt-1">Monthly Gain</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-electric">{years}x</div>
                <div className="text-xs text-muted mt-1">Time Period</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
