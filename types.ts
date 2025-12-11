export enum AssetType {
  CURRENT = 'Aset Lancar',
  FIXED = 'Aset Tetap',
}

export interface Receivable {
  id: string;
  debtorName: string;
  amount: number;
  ageMonths: number; // Age of debt in months
  status: 'Lancar' | 'Kurang Lancar' | 'Macet';
}

export interface FinancialSummary {
  cash: number;
  receivables: {
    total: number;
    allowance: number; // Penyisihan piutang
    net: number;
  };
  fixedAssets: {
    cost: number;
    depreciation: number;
    bookValue: number;
  };
  liabilities: {
    shortTerm: number;
    longTerm: number;
  };
  equity: number;
}

// FHIR-like simple types for prototype
export interface Patient {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  mrn: string; // Medical Record Number
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  date: string;
  text: string;
  author: string;
}

export interface AIAnalysisResult {
  summary: string;
  keyConditions: string[];
  recommendations: string[];
  disclaimer: string;
}