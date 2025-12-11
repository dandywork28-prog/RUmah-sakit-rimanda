import { Receivable, Patient, ClinicalNote } from '../types';

export const MOCK_RECEIVABLES: Receivable[] = [
  { id: 'REC-001', debtorName: 'BPJS Kesehatan - Claim Jan', amount: 500000000, ageMonths: 2, status: 'Lancar' },
  { id: 'REC-002', debtorName: 'Asuransi Swasta A', amount: 150000000, ageMonths: 7, status: 'Kurang Lancar' },
  { id: 'REC-003', debtorName: 'Pasien Umum (Cicilan)', amount: 25000000, ageMonths: 14, status: 'Macet' },
  { id: 'REC-004', debtorName: 'Kemenkes - Program TB', amount: 100000000, ageMonths: 4, status: 'Lancar' },
  { id: 'REC-005', debtorName: 'Asuransi Swasta B', amount: 75000000, ageMonths: 9, status: 'Kurang Lancar' },
];

export const MOCK_ASSETS_FIXED = {
  buildings: 15000000000,
  equipment: 5000000000,
  accumulatedDepreciation: 4500000000,
};

export const MOCK_LIABILITIES = {
  shortTerm: 2000000000,
  longTerm: 8500000000,
};

export const MOCK_PATIENTS: Patient[] = [
  { id: 'P-101', name: 'Budi Santoso', gender: 'Male', birthDate: '1980-05-12', mrn: 'MR-2024-8821' },
  { id: 'P-102', name: 'Siti Aminah', gender: 'Female', birthDate: '1992-11-20', mrn: 'MR-2024-9932' },
];

export const MOCK_NOTES: ClinicalNote[] = [
  {
    id: 'N-551',
    patientId: 'P-101',
    date: '2024-05-20',
    author: 'dr. Spesialis Penyakit Dalam',
    text: `Patient presents with 3-day history of high fever (39C), productive cough with yellowish sputum, and shortness of breath upon exertion. 
    History of hypertension (controlled with Amlodipine 5mg). 
    Physical exam: Crackles heard in right lower lobe. SpO2 94% room air. BP 130/85. 
    Lab results: Leukocytosis (WBC 16.000). CXR confirms infiltration in RLL compatible with pneumonia. 
    Plan: Start IV Ceftriaxone 1g q12h, Azithromycin 500mg daily. Nebulizer Combivent q8h. Monitor O2 sat.`
  }
];