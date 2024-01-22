import React from 'react';
import { Patient } from '../types/patientDataTypes';

type PatientInformationSectionProps = {
    patientData: Patient;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: {
        name?: string;
    };
};

const PatientInformationSection: React.FC<PatientInformationSectionProps> = ({
    patientData,
    handleChange,
    errors
}) => {
    return (
        <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Patient Information</h2>
            {errors.name && (
                <span className="text-red-500 text-xs">{errors.name}</span>
            )}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={patientData.name}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                        placeholder="Patient Name"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block mb-2">Birthyear</label>
                    <input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        name="birthDate"
                        value={patientData.birthDate}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                        placeholder="Birth Date"
                    />
                </div>
            </div>
        </div >
    );
};

export default PatientInformationSection;
