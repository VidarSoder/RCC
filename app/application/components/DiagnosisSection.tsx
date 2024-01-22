import React from 'react';
import { Diagnosis } from '../types/patientDataTypes';

type DiagnosisSectionProps = {
    diagnosis: Diagnosis;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({
    diagnosis,
    handleChange
}) => {
    return (
        <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Diagnosis</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label htmlFor="diagnosisDate" className="block mb-2">Diagnosis Date:</label>
                    <input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        id="diagnosisDate"
                        name="date"
                        value={diagnosis.date}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="diagnosisBasis" className="block mb-2">Diagnosis Basis:</label>
                    <input
                        type="text"
                        id="diagnosisBasis"
                        name="basis"
                        value={diagnosis.basis}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="cancerType" className="block mb-2">Cancer Type:</label>
                    <input
                        type="text"
                        id="cancerType"
                        name="cancerType"
                        value={diagnosis.cancerType}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default DiagnosisSection;
