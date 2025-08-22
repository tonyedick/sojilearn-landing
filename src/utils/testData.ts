import { FormData } from '../types/form';

export const generateTestData = (): FormData => {
  const testDataSets = [
    {
      firstName: 'Adebayo',
      lastName: 'Ogundimu',
      email: 'adebayo.ogundimu@gmail.com',
      phone: '+234 803 123 4567',
      currentLevel: 'waec_graduate',
      institution: 'Lagos State Model College',
      graduationYear: '2025',
      preferredProgram: 'undergraduate',
      fieldOfStudy: 'Computer Science',
      preferredUniversities: 'University of Manchester, King\'s College London',
      intendedStartDate: 'september_2025',
      hasPassport: true,
      previousApplications: false,
      budgetRange: '20k_30k',
      additionalQuestions: 'I\'m interested in scholarships and would like guidance on the application process.'
    },
    {
      firstName: 'Funmilayo',
      lastName: 'Adebisi',
      email: 'funmi.adebisi@yahoo.com',
      phone: '+234 701 987 6543',
      currentLevel: 'undergraduate',
      institution: 'University of Lagos',
      graduationYear: '2024',
      preferredProgram: 'postgraduate',
      fieldOfStudy: 'Business Administration',
      preferredUniversities: 'London Business School, Imperial College London',
      intendedStartDate: 'january_2026',
      hasPassport: false,
      previousApplications: true,
      budgetRange: '30k_40k',
      additionalQuestions: 'I need help with visa requirements and accommodation options.'
    },
    {
      firstName: 'Chinedu',
      lastName: 'Okwu',
      email: 'chinedu.okwu@outlook.com',
      phone: '+234 812 456 7890',
      currentLevel: 'graduate',
      institution: 'Covenant University',
      graduationYear: '2023',
      preferredProgram: 'postgraduate',
      fieldOfStudy: 'Data Science',
      preferredUniversities: 'University of Edinburgh, University of Warwick',
      intendedStartDate: 'september_2025',
      hasPassport: true,
      previousApplications: false,
      budgetRange: '40k_50k',
      additionalQuestions: 'Looking for programs with industry partnerships and internship opportunities.'
    },
    {
      firstName: 'Kemi',
      lastName: 'Afolabi',
      email: 'kemi.afolabi@gmail.com',
      phone: '+234 909 234 5678',
      currentLevel: 'working_professional',
      institution: 'Obafemi Awolowo University',
      graduationYear: '2020',
      preferredProgram: 'postgraduate',
      fieldOfStudy: 'International Relations',
      preferredUniversities: 'Oxford University, Cambridge University, LSE',
      intendedStartDate: 'january_2026',
      hasPassport: true,
      previousApplications: true,
      budgetRange: 'over_50k',
      additionalQuestions: 'I have 4 years work experience and need guidance on how to leverage this in my application.'
    },
    {
      firstName: 'Tunde',
      lastName: 'Bakare',
      email: 'tunde.bakare@hotmail.com',
      phone: '+234 706 345 6789',
      currentLevel: 'waec_graduate',
      institution: 'Federal Government College',
      graduationYear: '2025',
      preferredProgram: 'foundation',
      fieldOfStudy: 'Engineering',
      preferredUniversities: '',
      intendedStartDate: 'september_2025',
      hasPassport: false,
      previousApplications: false,
      budgetRange: 'need_guidance',
      additionalQuestions: 'This is my first time applying abroad. I need complete guidance on the entire process.'
    }
  ];

  // Return a random test data set
  const randomIndex = Math.floor(Math.random() * testDataSets.length);
  return testDataSets[randomIndex];
};

export const getTestDataByProfile = (profile: 'waec_graduate' | 'undergraduate' | 'graduate' | 'working_professional'): FormData => {
  const testData = generateTestData();
  
  switch (profile) {
    case 'waec_graduate':
      return {
        ...testData,
        firstName: 'Blessing',
        lastName: 'Adeyemi',
        currentLevel: 'waec_graduate',
        graduationYear: '2025',
        preferredProgram: 'foundation',
        fieldOfStudy: 'Medicine',
        hasPassport: false,
        previousApplications: false,
        budgetRange: 'need_guidance'
      };
    
    case 'undergraduate':
      return {
        ...testData,
        firstName: 'David',
        lastName: 'Okafor',
        currentLevel: 'undergraduate',
        graduationYear: '2024',
        preferredProgram: 'undergraduate',
        fieldOfStudy: 'Economics',
        hasPassport: true,
        previousApplications: false,
        budgetRange: '20k_30k'
      };
    
    case 'graduate':
      return {
        ...testData,
        firstName: 'Grace',
        lastName: 'Eze',
        currentLevel: 'graduate',
        graduationYear: '2023',
        preferredProgram: 'postgraduate',
        fieldOfStudy: 'Public Health',
        hasPassport: true,
        previousApplications: true,
        budgetRange: '30k_40k'
      };
    
    case 'working_professional':
      return {
        ...testData,
        firstName: 'Samuel',
        lastName: 'Adamu',
        currentLevel: 'working_professional',
        graduationYear: '2019',
        preferredProgram: 'postgraduate',
        fieldOfStudy: 'MBA',
        hasPassport: true,
        previousApplications: false,
        budgetRange: 'over_50k'
      };
    
    default:
      return testData;
  }
};