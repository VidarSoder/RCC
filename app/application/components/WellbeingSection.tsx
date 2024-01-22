import React from 'react';
import { Wellbeing } from '../types/patientDataTypes';

type WellbeingSectionProps = {
    wellbeing: Wellbeing[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    addWellbeingRecord: () => void;
    removeWellbeingRecord: (index: number) => void;
    errors: Array<{ date?: string; ECOGScore?: string }>;
};

const WellbeingSection: React.FC<WellbeingSectionProps> = ({
    wellbeing,
    errors,
    handleChange,
    addWellbeingRecord,
    removeWellbeingRecord
}) => {
    return (
        <div className="space-y-4">
            <h2 className="font-bold text-lg">Patient Wellbeing</h2>
            {wellbeing.map((record, index) => (
                <div key={index}>
                    {errors[index] && errors[index].date && (
                        <span className="text-red-500 text-xs">{errors[index].date}</span>
                    )}
                    {errors[index] && errors[index].ECOGScore && (
                        <span className="text-red-500 text-xs">{errors[index].ECOGScore}</span>
                    )}

                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <input
                            type="date"
                            name="date"
                            value={record.date}
                            onChange={(e) => handleChange(e, index)}
                            className="border px-2 py-1 w-full"
                        />
                        <input
                            type="number"
                            name="ECOGScore"
                            value={record.ECOGScore}
                            onChange={(e) => handleChange(e, index)}
                            className="border px-2 py-1 w-full"
                            min="0"
                            max="5"
                        />
                        {index !== 0 && (
                            <div className="flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => removeWellbeingRecord(index)}
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                                    style={{ fontSize: '0.75rem', lineHeight: '1rem' }}>
                                    &minus;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addWellbeingRecord}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">
                Add Record
            </button>
        </div>
    );
};

export default WellbeingSection;
