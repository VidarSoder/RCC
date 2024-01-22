'use client'
import React, { useState } from 'react';
import { Diagnosis, Patient, Treatment, ValidationErrors, Wellbeing } from './types/patientDataTypes';
import TreatmentsSection from './components/TreatmentSection';
import PatientInformationSection from './components/PatientInformation';
import WellbeingSection from './components/WellbeingSection';
import CancerReportTab from './components/CancerReportTab';
import DiagnosisSection from './components/DiagnosisSection';
import { surgeryChange, generateId, validatePatientData } from './_helpers';

export default function FormPage() {
    const initialDiagnosis: Diagnosis = { id: generateId(), date: '', basis: '', cancerType: '' };
    const initialTreatment: Treatment = { id: generateId(), date: '', type: '', details: '', surgery: [] };
    const initialWellbeing: Wellbeing = { id: generateId(), date: '', ECOGScore: 0 };

    const [formErrors, setFormErrors] = useState<ValidationErrors>({
        wellbeing: [],
        treatments: [],
        patientInfo: {}
    });
    const [activeTab, setActiveTab] = useState('form');
    const [formData, setFormData] = useState<Patient>({
        id: generateId(),
        name: '',
        birthDate: '',
        diagnosis: initialDiagnosis,
        treatments: [initialTreatment],
        wellbeing: [initialWellbeing]
    });

    const handleChange = (e: any, section: keyof Patient, index?: number) => {
        if (index !== undefined) {
            const updatedSection = formData[section] as any[];
            updatedSection[index] = { ...updatedSection[index], [e.target.name]: e.target.value };
            setFormData({ ...formData, [section]: updatedSection });
        }
    };

    const handlePatientInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDiagnosisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, diagnosis: { ...formData.diagnosis, [e.target.name]: e.target.value } });
    };

    const addItem = (section: keyof Patient, newItem: any) => {
        setFormData(prevFormData => {
            const newState = { ...prevFormData };

            if (section === 'treatments') {
                newState.treatments = [...(prevFormData.treatments as Treatment[]), { ...newItem, id: generateId() }];
            } else if (section === 'wellbeing') {
                newState.wellbeing = [...(prevFormData.wellbeing as Wellbeing[]), { ...newItem, id: generateId() }];
            }

            return newState;
        });
    };

    const removeItem = (section: keyof Patient, index: number) => {
        const updatedSection = formData[section] as any[];
        setFormData(prevFormData => ({
            ...prevFormData,
            [section]: updatedSection.filter((_, i) => i !== index)
        }));
    };

    const handleSurgeryChange = (e: React.ChangeEvent<HTMLInputElement>, treatmentIndex: number, surgeryIndex?: number) => {
        const updatedTreatments = [...formData.treatments];
        const surgeryDetails = surgeryChange(formData, e, treatmentIndex, surgeryIndex);

        updatedTreatments[treatmentIndex].surgery = surgeryDetails;
        setFormData({ ...formData, treatments: updatedTreatments });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validatePatientData(formData);
        setFormErrors(errors);

        // Check for non-empty error objects in the array
        const hasWellbeingErrors = errors.wellbeing.some(errorObj => Object.keys(errorObj).length > 0);
        const hasSurgeryErrors = errors.treatments.some(treatment =>
            treatment.surgery.some(surgeryError => Object.keys(surgeryError).length > 0)
        );
        const hasPatientInfoErrors = Object.keys(errors.patientInfo).length > 0;

        if (hasWellbeingErrors || hasSurgeryErrors || hasPatientInfoErrors) {
            console.error('Validation errors', errors);
            return; // Prevent form submission if there are errors
        }

        console.log(formData);
        window.inca = { patientRegister: [formData] };
        alert('Data saved successfully.');
    };


    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-10">
            <div className="w-full max-w-4xl">
                {/* Tab Buttons */}
                <div className="flex justify-center border-b">
                    <button
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'form' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                        onClick={() => setActiveTab('form')}>
                        Form
                    </button>
                    <button
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'report' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                        onClick={() => setActiveTab('report')}>
                        Canceranmälan
                    </button>
                </div>
                <div className="bg-white p-6 rounded shadow-lg mt-4" style={{ height: '100%', overflowY: 'auto' }}>
                    {activeTab === 'form' ? (
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg space-y-8 max-w-4xl w-full">
                            <h1 className="text-2xl font-bold text-center mb-6">Patient Data Form</h1>

                            {/* Patient Information */}
                            <PatientInformationSection
                                patientData={formData}
                                handleChange={handlePatientInfoChange}
                                errors={formErrors.patientInfo}
                            />

                            {/* Diagnosis Section */}
                            <DiagnosisSection
                                diagnosis={formData.diagnosis}
                                handleChange={handleDiagnosisChange}
                            />

                            {/* Treatments Section */}
                            <TreatmentsSection
                                treatments={formData.treatments}
                                handleChange={(e, index) => handleChange(e, 'treatments', index)}
                                handleSurgeryChange={handleSurgeryChange}
                                addTreatment={() => addItem('treatments', initialTreatment)}
                                removeTreatment={(index) => removeItem('treatments', index)}
                                errors={formErrors.treatments}
                            />

                            {/* Wellbeing Section */}
                            <WellbeingSection
                                wellbeing={formData.wellbeing}
                                handleChange={(e, index) => handleChange(e, 'wellbeing', index)}
                                addWellbeingRecord={() => addItem('wellbeing', { recordID: '', date: '', ECOGScore: 0 })}
                                removeWellbeingRecord={(index) => removeItem('wellbeing', index)}
                                errors={formErrors.wellbeing}
                            />

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-4">Spara</button>
                        </form>
                    ) : (
                        <CancerReportTab />
                    )}
                </div>
            </div>
        </div>
    );
}

