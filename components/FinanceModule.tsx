import React, { useMemo, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_RECEIVABLES, MOCK_ASSETS_FIXED, MOCK_LIABILITIES } from '../services/mockData';
import { analyzeFinancialHealth } from '../services/geminiService';

const FinanceModule: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('Generating AI Analysis of financial position...');

  // BLU Logic: Calculate Allowance based on Age
  // 6-12 months: 50%, > 12 months: 100%
  const receivablesData = useMemo(() => {
    let totalGross = 0;
    let totalAllowance = 0;

    const details = MOCK_RECEIVABLES.map(rec => {
      let allowanceRate = 0;
      if (rec.ageMonths > 12) allowanceRate = 1.0;
      else if (rec.ageMonths >= 6) allowanceRate = 0.5;
      
      const allowance = rec.amount * allowanceRate;
      totalGross += rec.amount;
      totalAllowance += allowance;

      return { ...rec, allowance, net: rec.amount - allowance };
    });

    return { details, totalGross, totalAllowance, net: totalGross - totalAllowance };
  }, []);

  const financialSummary = useMemo(() => {
    const fixedAssetsNet = MOCK_ASSETS_FIXED.buildings + MOCK_ASSETS_FIXED.equipment - MOCK_ASSETS_FIXED.accumulatedDepreciation;
    const totalAssets = receivablesData.net + fixedAssetsNet + 5000000000; // Adding arbitrary Cash for demo
    const totalLiabilities = MOCK_LIABILITIES.shortTerm + MOCK_LIABILITIES.longTerm;
    const equity = totalAssets - totalLiabilities;

    return {
      assets: totalAssets,
      liabilities: totalLiabilities,
      equity: equity,
      fixedAssetsNet
    };
  }, [receivablesData]);

  useEffect(() => {
    analyzeFinancialHealth({
        receivables: receivablesData.totalGross,
        allowance: receivablesData.totalAllowance,
        equity: financialSummary.equity
    }).then(setAiAnalysis);
  }, [financialSummary, receivablesData]);

  const chartData = [
    { name: 'Assets', value: financialSummary.assets },
    { name: 'Liabilities', value: financialSummary.liabilities },
    { name: 'Equity', value: financialSummary.equity },
  ];

  const COLORS = ['#10B981', '#EF4444', '#3B82F6'];

  const formatIDR = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Laporan Posisi Keuangan (BLU Standard)</h2>
        
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-600 font-medium">Total Aset</p>
            <p className="text-2xl font-bold text-emerald-800">{formatIDR(financialSummary.assets)}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-red-600 font-medium">Total Kewajiban</p>
            <p className="text-2xl font-bold text-red-800">{formatIDR(financialSummary.liabilities)}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Ekuitas</p>
            <p className="text-2xl font-bold text-blue-800">{formatIDR(financialSummary.equity)}</p>
          </div>
        </div>

        <div className="h-80 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(val) => `Rp${(val/1000000000).toFixed(0)}M`} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => formatIDR(Number(value))} />
                    <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* AI Insight for Finance */}
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <h3 className="font-semibold text-indigo-900">AI Financial Executive Summary</h3>
            </div>
            <p className="text-sm text-indigo-800 italic">
                {aiAnalysis}
            </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-3">Analisa Umur Piutang & Penyisihan (Allowance)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debitur</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Umur (Bulan)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Piutang</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Penyisihan</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Buku Bersih</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receivablesData.details.map((rec) => (
                <tr key={rec.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rec.debtorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{rec.ageMonths}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatIDR(rec.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 text-right font-medium">
                    {rec.ageMonths > 12 ? '100%' : rec.ageMonths >= 6 ? '50%' : '0%'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 text-right font-bold">{formatIDR(rec.net)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td colSpan={2} className="px-6 py-4 text-right">TOTAL</td>
                <td className="px-6 py-4 text-right">{formatIDR(receivablesData.totalGross)}</td>
                <td className="px-6 py-4 text-right text-red-600">({formatIDR(receivablesData.totalAllowance)})</td>
                <td className="px-6 py-4 text-right text-emerald-700">{formatIDR(receivablesData.net)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;