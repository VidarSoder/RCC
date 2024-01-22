'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';

const xmlData = `
<PatientRegister>
  <Patient id="PatientID">
    <Name>Patient Name</Name>
    <BirthDate>YYYY-MM-DD</BirthDate>
    <Diagnoses>
      <Diagnosis>
        <DiagnosisID>DiagnosisID</DiagnosisID>
        <Date>YYYY-MM-DD</Date>
        <Basis>Diagnosis Basis</Basis>
        <CancerType>Type of Cancer</CancerType>
      </Diagnosis>
    </Diagnoses>
    <Treatments>
      <Treatment>
        <TreatmentID>TreatmentID</TreatmentID>
        <Date>YYYY-MM-DD</Date>
        <Type>Treatment Type</Type>
        <Details>Treatment Details</Details>
        <Surgery>
          <SurgeryID>SurgeryID</SurgeryID>
          <Date>YYYY-MM-DD</Date>
          <OperationCode>Operation Code</OperationCode>
          <SurgeryOutcome>Outcome of the Surgery</SurgeryOutcome>
        </Surgery>
      </Treatment>
    </Treatments>
    <Wellbeing>
      <Record>
        <RecordID>RecordID</RecordID>
        <Date>YYYY-MM-DD</Date>
        <ECOGScore>0</ECOGScore>
      </Record>
    </Wellbeing>
  </Patient>
</PatientRegister>
`;


export default function XmlPage() {

    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold underline my-4">XML Format</h1>
            <p className="mb-4">
                XML-format<br />
                Här är ett exempel på hur man kan strukturera upp det med XML <br />
                det inkluderar inte all data men den generella strukturen
            </p>

            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                <code ref={codeRef} className="language-xml">
                    {xmlData}
                </code>
            </pre>

            <div className="fixed bottom-4 right-4 flex space-x-4">
                <Link href="/">
                    <div className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer">
                        Go Back
                    </div>
                </Link>
                <Link href="/questionThree">
                    <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
                        Go to Next Part
                    </div>
                </Link>
            </div>
        </div>
    );
}
