'use client'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-sql';

export default function DatabasePage() {
  const codeRef = useRef(null);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, []);

  const openFullscreenImage = () => setIsImageFullscreen(true);
  const closeFullscreenImage = () => setIsImageFullscreen(false);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold underline my-4">Databas struktur</h1>
      <p className="mb-4">
        Fråga 1. Här har jag visualiserat en simpel databasstruktur,
        inkluderade även hur jag skulle lägga upp databasmodellen.
        <br />
        All data finns inte men grundstommen finns.
        <br />
        Koden är <span className="font-bold text-blue-600">highlightad</span> med hjälp av biblioteket <span className="font-bold text-green-600">Prism</span>, är bilden liten går den att <span className="font-bold text-red-600">klicka</span> på för att få större.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div onClick={openFullscreenImage} className="cursor-pointer">
          <Image src="/database.png" alt="Database Structure Flowchart" width={800} height={800} />
        </div>

        {/* Fullscreen image modal */}
        {isImageFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeFullscreenImage}>
            <Image src="/database.png" alt="Database Structure Flowchart" layout="fill" objectFit="contain" />
          </div>
        )}
        <div>
          <pre className="overflow-x-auto">
            <code ref={codeRef} className="language-sql">
              {
                `
              CREATE TABLE Patients (
                PatientID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                BirthDate DATE NOT NULL,
                Gender VARCHAR(50),
                Address VARCHAR(255),
                ContactNumber VARCHAR(50)
              );

              CREATE TABLE Diagnoses (
                DiagnosisID SERIAL PRIMARY KEY,
                PatientID INTEGER REFERENCES Patients(PatientID),
                DiagnosisDate DATE NOT NULL,
                DiagnosisBasis VARCHAR(255),
                CancerType VARCHAR(255)
              );

              CREATE TABLE Treatments (
                TreatmentID SERIAL PRIMARY KEY,
                PatientID INTEGER REFERENCES Patients(PatientID),
                TreatmentType VARCHAR(255),
                TreatmentDate DATE NOT NULL,
                TreatmentDetails TEXT
              );

              CREATE TABLE SurgeryDetails (
                SurgeryID SERIAL PRIMARY KEY,
                TreatmentID INTEGER REFERENCES Treatments(TreatmentID),
                OperationCode VARCHAR(255) NOT NULL,
                SurgeryDate DATE,
                SurgeryOutcome VARCHAR(255)
              );

              CREATE TABLE PatientWellbeing (
                RecordID SERIAL PRIMARY KEY,
                PatientID INTEGER REFERENCES Patients(PatientID),
                RecordDate DATE NOT NULL,
                ECOGScore INTEGER CHECK (ECOGScore BETWEEN 0 AND 5)
              );`}
            </code>
          </pre>
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <Link href="/questionTwo">
          <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
            Go to Next Part
          </div>
        </Link>
      </div>
    </div>
  );
}
