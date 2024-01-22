import React from 'react';
import { Treatment } from '../types/patientDataTypes';
import SurgeryDetailsSection from './SurgeryDetailSection';

type TreatmentsSectionProps = {
    treatments: Treatment[];
    handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => void;
    handleSurgeryChange: (e: React.ChangeEvent<HTMLInputElement>, treatmentIndex: number, surgeryIndex: number) => void;
    addTreatment: () => void;
    removeTreatment: (index: number) => void;
    errors: {
        surgery: Array<{ operationCode?: string }>;
    }[];
};

const treatmentTypes = ["kirurgi", "strålbehandling", "cytostatikabehandling"];

const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
    treatments,
    errors,
    handleChange,
    handleSurgeryChange,
    addTreatment,
    removeTreatment
}) => {

    return (
        <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Treatments</h2>
            {treatments.map((treatment, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor={`treatmentDate-${index}`} className="block mb-2">Treatment Date:</label>
                        <input
                            type="date"
                            id={`treatmentDate-${index}`}
                            name="date"
                            value={treatment.date}
                            onChange={(e) => handleChange(e, index)}
                            className="border px-2 py-1 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor={`treatmentType-${index}`} className="block mb-2">Treatment Type:</label>
                        <select
                            id={`treatmentType-${index}`}
                            name="type"
                            value={treatment.type}
                            onChange={(e) => handleChange(e, index)}
                            className="border px-2 py-1 w-full">
                            <option value="">Select Type</option>
                            {treatmentTypes.map((type, idx) => (
                                <option key={idx} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor={`treatmentDetails-${index}`} className="block mb-2">Treatment Details:</label>
                        <input
                            type="text"
                            id={`treatmentDetails-${index}`}
                            name="details"
                            value={treatment.details}
                            onChange={(e) => handleChange(e, index)}
                            className="border px-2 py-1 w-full"
                        />
                    </div>
                    {index !== 0 ? (
                        <div className="flex justify-start">
                            <button
                                type="button"
                                onClick={() => removeTreatment(index)}
                                className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                                style={{ fontSize: '0.75rem', lineHeight: '1rem' }}>
                                &minus;
                            </button>
                        </div>
                    ) : <div> </div>}

                    {treatment.type === 'kirurgi' && (
                        <div className="mt-4">
                            <SurgeryDetailsSection
                                surgeryDetails={treatment.surgery || []}
                                handleChange={(e, surgeryIndex) => handleSurgeryChange(e, index, surgeryIndex)}
                                errors={errors[index]?.surgery || []}
                            />
                        </div>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={addTreatment}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">
                +
            </button>
        </div>
    );
};

export default TreatmentsSection;
