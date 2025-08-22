export interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Step 2: Education Background
  currentLevel: string;
  institution: string;
  graduationYear: string;

  // Step 3: Study Preferences
  preferredProgram: string;
  fieldOfStudy: string;
  preferredUniversities: string;
  intendedStartDate: string;

  // Step 4: Additional Information
  hasPassport: boolean;
  previousApplications: boolean;
  budgetRange: string;
  additionalQuestions: string;
}

export interface FormErrors {
  [key: string]: string;
}