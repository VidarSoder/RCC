export type Diagnosis = {
    id: string;
    date: string;
    basis: string;
    cancerType: string;
};

export type Treatment = {
    id: string;
    date: string;
    type: string;
    details: string;
    surgery?: SurgeryDetail[];
};


export type SurgeryDetail = {
    id: string;
    operationCode: string;
    surgeryDate: string;
    surgeryOutcome: string;
};

export type Wellbeing = {
    id: string;
    date: string;
    ECOGScore: number;
};

export type Patient = {
    id: string;
    name: string;
    birthDate: string;
    diagnosis: Diagnosis;
    treatments: Treatment[];
    wellbeing: Wellbeing[];
};

export type ValidationErrors = {
    wellbeing: Array<{ date?: string, ECOGScore?: string }>;
    treatments: Array<{
        surgery: Array<Partial<SurgeryDetail>>;
    }>;
    patientInfo: {
        name?: string;
        date?: string;
    };
};
