import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FinanceModule from './components/FinanceModule';
import ClinicalModule from './components/ClinicalModule';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 rounded-xl shadow-lg text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome, Administrator.</h1>
              <p className="opacity-90">SIMRS Regu-AI Dashboard v1.0.0 (Prototype)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setActiveTab('finance')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">BLU Accounting</h3>
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Manage Assets, calculate Receivable Allowances (Penyisihan Piutang), and generate compliant Financial Position reports.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('clinical')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Clinical AI Assistant</h3>
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Process FHIR data and use GenAI to summarize clinical notes into "After Visit Summaries" with ethical guardrails.
                </p>
              </div>
            </div>
          </div>
        );
      case 'finance':
        return <FinanceModule />;
      case 'clinical':
        return <ClinicalModule />;
      default:
        return <div>Not Implemented</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar currentTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;