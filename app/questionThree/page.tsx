'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';

const patientData = {
    patientRegister: [
        {
            id: "PatientID",
            name: "Patient Name",
            birthDate: "YYYY-MM-DD",
            diagnoses: [
                {
                    diagnosisID: "DiagnosisID",
                    date: "YYYY-MM-DD",
                    basis: "Diagnosis Basis",
                    cancerType: "Type of Cancer"
                }
            ],
            treatments: [
                {
                    treatmentID: "TreatmentID",
                    date: "YYYY-MM-DD",
                    type: "Treatment Type",
                    details: "Treatment Details",
                    surgery: [
                        {
                            surgeryID: "SurgeryID",
                            date: "YYYY-MM-DD",
                            operationCode: "Operation Code",
                            surgeryOutcome: "Outcome of the Surgery"
                        }
                    ]
                }
            ],
            wellbeing: [
                {
                    recordID: "RecordID",
                    date: "YYYY-MM-DD",
                    ECOGScore: 0
                }
            ]
        }
    ]
};


const patientDataJS =
    `const patientData = {
        patientRegister: [
          {
            id: "PatientID",
            name: "Patient Name",
            birthDate: "YYYY-MM-DD",
            diagnoses: [
              {
                diagnosisID: "DiagnosisID",
                date: "YYYY-MM-DD",
                basis: "Diagnosis Basis",
                cancerType: "Type of Cancer"
              }
            ],
            treatments: [
              {
                treatmentID: "TreatmentID",
                date: "YYYY-MM-DD",
                type: "Treatment Type",
                details: "Treatment Details",
                surgery: [
                  {
                    surgeryID: "SurgeryID",
                    date: "YYYY-MM-DD",
                    operationCode: "Operation Code",
                    surgeryOutcome: "Outcome of the Surgery"
                  }
                ]
              }
            ],
            wellbeing: [
              {
                recordID: "RecordID",
                date: "YYYY-MM-DD",
                ECOGScore: 0
              }
            ]
          }
        ]
      };      
`;

export default function JavascriptObjectPage() {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold underline my-4">Javascript och JSON</h1>
            <p className="mb-4">
                Här är ett javascript objekt och json sida vid sida <br />
                som visar hur man kan strukturera det på frontend sidan
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                    <h2 className="text-xl font-bold">JavaScript Object</h2>
                    <pre>
                        <code ref={codeRef} className="language-js">
                            {patientDataJS}
                        </code>
                    </pre>
                </div>
                <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                    <h2 className="text-xl font-bold">JSON Format</h2>
                    <pre>
                        <code ref={codeRef} className="language-json">
                            {JSON.stringify(patientData, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>

            <div className="fixed bottom-4 right-4 flex space-x-4">
                <Link href="/questionTwo">
                    <div className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer">
                        Go Back
                    </div>
                </Link>
                <Link href="/application">
                    <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
                        Go to Next Part
                    </div>
                </Link>
            </div>
        </div>
    );
}
