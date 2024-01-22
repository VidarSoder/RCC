import { Patient, ValidationErrors, Wellbeing } from "./types/patientDataTypes";

export const generateId = () => {
    return Math.random().toString(36).substr(2, 15);
};

export function surgeryChange(formData: Patient, e: React.ChangeEvent<HTMLInputElement>, treatmentIndex: number, surgeryIndex?: number) {

    const updatedTreatments = [...formData.treatments];
    let surgeryDetails = updatedTreatments[treatmentIndex].surgery || [];

    if (surgeryIndex === undefined || surgeryDetails.length === 0) {
        surgeryDetails = [{ id: generateId(), operationCode: '', surgeryOutcome: '', surgeryDate: '' }];
    } else {
        surgeryDetails = surgeryDetails.map((detail, index) => {
            if (index === surgeryIndex) {
                return { ...detail, [e.target.name]: e.target.value };
            }
            return detail;
        });
    }

    return surgeryDetails;
}

export const validatePatientData = (patientData: Patient): ValidationErrors => {
    let errors: ValidationErrors = {
        wellbeing: [],
        treatments: patientData.treatments.map(() => ({ surgery: [] })),
        patientInfo: {}
    };

    //validate name
    if (!patientData.name || patientData.name.trim() === '') {
        errors.patientInfo.name = 'Name is required.';
    }

    // Validate patientData
    patientData.wellbeing.forEach((record, index) => {
        let wellbeingError: { date?: string, ECOGScore?: string } = {};

        if (record.ECOGScore && !record.date) {
            wellbeingError.date = 'A date must be provided if a score is entered.';
        }

        if ((record.ECOGScore < 1 || record.ECOGScore > 5) && record.ECOGScore !== 0) {
            wellbeingError.ECOGScore = 'ECOGScore must be between 1 and 5.';
        }

        if (Object.keys(wellbeingError).length > 0) {
            errors.wellbeing[index] = wellbeingError;
        }
    });

    // Validate surgery details
    patientData.treatments.forEach((treatment, treatmentIndex) => {
        treatment.surgery?.forEach((surgery, surgeryIndex) => {
            let surgeryError: { operationCode?: string } = {};

            if (!/^[A-Z]{2}\d{4}$/.test(surgery.operationCode)) {
                surgeryError.operationCode = 'Operation code must be two letters followed by four digits (e.g., AB1234).';
            }

            errors.treatments[treatmentIndex].surgery[surgeryIndex] = surgeryError;
        });
    });

    // Can add more validation here with the same principel

    return errors;
};
