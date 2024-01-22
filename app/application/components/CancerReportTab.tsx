import React from 'react';

const CancerReportTab = () => {
    const patientData = window.inca?.patientRegister[0];

    if (!patientData) {
        return (
            <div className="text-center py-6">
                <p className="text-xl text-gray-600">No cancer report data available.</p>
            </div>
        );
    }

    const diagnosisDate = patientData.diagnosis.date || 'N/A';
    const highestECOG = patientData.wellbeing?.reduce((max: number, current: { ECOGScore: number; }) => current.ECOGScore > max ? current.ECOGScore : max, 0) || 'N/A';

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Canceranmälan</h2>
            <div className="bg-white p-4 shadow rounded-lg">
                <div className="mb-2">
                    <span className="font-semibold">Diagnosis Date: </span>
                    <span className="text-gray-700">{diagnosisDate}</span>
                </div>
                <div>
                    <span className="font-semibold">Highest ECOG Score: </span>
                    <span className="text-gray-700">{highestECOG}</span>
                </div>
            </div>
        </div>
    );
};

export default CancerReportTab;
