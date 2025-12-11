import React, { useState } from 'react';
import { MOCK_PATIENTS, MOCK_NOTES } from '../services/mockData';
import { summarizeClinicalNote } from '../services/geminiService';
import EthicalWarning from './EthicalWarning';
import ReactMarkdown from 'react-markdown';

const ClinicalModule: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState(MOCK_PATIENTS[0]);
  const [noteText, setNoteText] = useState(MOCK_NOTES[0].text);
  const [summary, setSummary] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSummarize = async () => {
    setIsProcessing(true);
    const result = await summarizeClinicalNote(noteText);
    setSummary(result);
    setIsProcessing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {/* Left Col: Patient List & Info */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">Vertex AI Search (Simulated)</h3>
            <div className="relative mb-4">
                <input 
                    type="text" 
                    placeholder="Search FHIR Resources..." 
                    className="w-full pl-8 pr-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            
            <div className="space-y-2">
                {MOCK_PATIENTS.map(p => (
                    <div 
                        key={p.id}
                        onClick={() => setSelectedPatient(p)}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${selectedPatient.id === p.id ? 'bg-teal-50 border border-teal-200' : 'hover:bg-gray-50 border border-transparent'}`}
                    >
                        <div className="flex justify-between items-start">
                            <span className="font-semibold text-gray-800">{p.name}</span>
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">{p.gender}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">MRN: {p.mrn} | DOB: {p.birthDate}</div>
                    </div>
                ))}
            </div>
        </div>

        {/* FHIR Quick View */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Current Conditions</h4>
            <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full border border-red-100">J18.9 Pneumonia</span>
                <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-100">I10 Hypertension</span>
            </div>
        </div>
      </div>

      {/* Right Col: Note Input & AI Output */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-700">Clinical Documentation (Progress Note)</h3>
                <span className="text-xs text-gray-400">Source: {selectedPatient.name}</span>
            </div>
            <textarea
                className="w-full flex-1 p-3 border rounded-md font-mono text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type clinical notes here..."
            />
            <div className="mt-3 flex justify-end">
                <button
                    onClick={handleSummarize}
                    disabled={isProcessing}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white font-medium transition-colors ${
                        isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span>Generate After Visit Summary</span>
                        </>
                    )}
                </button>
            </div>
        </div>

        {summary && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
                <EthicalWarning />
                <h3 className="text-lg font-bold text-teal-800 mb-3 border-b border-teal-100 pb-2">
                    AI Generated Summary (Draft)
                </h3>
                {/* We render Markdown from Gemini */}
                <div className="prose prose-sm prose-teal max-w-none text-gray-700 bg-gray-50 p-4 rounded-md">
                     {/* In a real app, use a markdown renderer. For this example, we display text nicely. */}
                     <pre className="whitespace-pre-wrap font-sans">{summary}</pre>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalModule;