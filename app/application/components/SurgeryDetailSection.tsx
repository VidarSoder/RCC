import React from 'react';
import { SurgeryDetail } from '../types/patientDataTypes';

type SurgeryDetailsSectionProps = {
    surgeryDetails: SurgeryDetail[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, surgeryIndex: number) => void;
    errors: Array<{ operationCode?: string }>;
};

const SurgeryDetailsSection: React.FC<SurgeryDetailsSectionProps> = ({
    surgeryDetails,
    handleChange,
    errors,
}) => {
    const surgery = surgeryDetails[0] || {};
    const error = errors[0] || {};

    return (
        <div>
            {error.operationCode && (
                <span className="text-red-500 text-xs">{error.operationCode}</span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label htmlFor="operationCode" className="block mb-2">Operation Code:</label>
                    <input
                        type="text"
                        name="operationCode"
                        value={surgery.operationCode || ''}
                        onChange={(e) => handleChange(e, 0)}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="surgeryOutcome" className="block mb-2">Surgery Outcome:</label>
                    <input
                        type="text"
                        name="surgeryOutcome"
                        value={surgery.surgeryOutcome || ''}
                        onChange={(e) => handleChange(e, 0)}
                        className="border px-2 py-1 w-full"
                    />
                </div>
            </div>
        </div>

    );
};

export default SurgeryDetailsSection;
