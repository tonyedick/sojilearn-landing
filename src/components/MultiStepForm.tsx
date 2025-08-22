import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, User, GraduationCap, Target, FileText, Loader2 } from 'lucide-react';
import { FormData, FormErrors } from '../types/form';
import { supabase } from '../lib/supabase';
// import { generateTestData, getTestDataByProfile } from '../utils/testData';

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  currentLevel: '',
  institution: '',
  graduationYear: '',
  preferredProgram: '',
  fieldOfStudy: '',
  preferredUniversities: '',
  intendedStartDate: '',
  hasPassport: false,
  previousApplications: false,
  budgetRange: '',
  additionalQuestions: '',
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Education', icon: GraduationCap },
    { number: 3, title: 'Preferences', icon: Target },
    { number: 4, title: 'Final Details', icon: FileText },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    setSubmitError(''); // Clear any previous submit errors

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        else if (formData.firstName.trim().length < 2) newErrors.firstName = 'First name must be at least 2 characters';
        
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        else if (formData.lastName.trim().length < 2) newErrors.lastName = 'Last name must be at least 2 characters';
        
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid phone number';
        break;
        
      case 2:
        if (!formData.currentLevel) newErrors.currentLevel = 'Current level is required';
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        break;
        
      case 3:
        if (!formData.preferredProgram) newErrors.preferredProgram = 'Preferred program is required';
        if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
        else if (formData.fieldOfStudy.trim().length < 3) newErrors.fieldOfStudy = 'Field of study must be at least 3 characters';
        if (!formData.intendedStartDate) newErrors.intendedStartDate = 'Start date is required';
        break;
        
      case 4:
        if (!formData.budgetRange) newErrors.budgetRange = 'Budget range is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // const fillTestData = (profile?: 'waec_graduate' | 'undergraduate' | 'graduate' | 'working_professional') => {
  //   const testData = profile ? getTestDataByProfile(profile) : generateTestData();
  //   setFormData(testData);
  //   setErrors({});
  //   setSubmitError('');
  // };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          current_level: formData.currentLevel,
          institution: formData.institution || null,
          graduation_year: formData.graduationYear,
          preferred_program: formData.preferredProgram,
          field_of_study: formData.fieldOfStudy,
          preferred_universities: formData.preferredUniversities || null,
          intended_start_date: formData.intendedStartDate,
          has_passport: formData.hasPassport,
          previous_applications: formData.previousApplications,
          budget_range: formData.budgetRange,
          additional_questions: formData.additionalQuestions || null,
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setSubmitError(`Failed to submit form: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your application has been submitted successfully. Our team will review your information and contact you within 24 hours.
          </p>
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Our counselors will review your profile</li>
              <li>• We'll schedule a consultation call</li>
              <li>• Begin your fast-track UK journey!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Get Started Today</h2>
            <span className="text-blue-100">Step {currentStep} of 4</span>
          </div>
          <div className="flex items-center space-x-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-white border-white text-blue-600' 
                        : 'border-blue-300 text-blue-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-white' : 'text-blue-200'
                  }`}>
                    {step.title}
                  </span>
                  {step.number < 4 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Test Data Generator - Only show in development */}
          {/* {import.meta.env.DEV && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">🧪 Test Data Generator (Dev Only)</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fillTestData()}
                  className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 text-xs rounded-lg transition-colors"
                >
                  Random Test Data
                </button>
                <button
                  onClick={() => fillTestData('waec_graduate')}
                  className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-blue-800 text-xs rounded-lg transition-colors"
                >
                  WAEC Graduate
                </button>
                <button
                  onClick={() => fillTestData('undergraduate')}
                  className="px-3 py-1 bg-green-200 hover:bg-green-300 text-green-800 text-xs rounded-lg transition-colors"
                >
                  Undergraduate
                </button>
                <button
                  onClick={() => fillTestData('graduate')}
                  className="px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-800 text-xs rounded-lg transition-colors"
                >
                  Graduate
                </button>
                <button
                  onClick={() => fillTestData('working_professional')}
                  className="px-3 py-1 bg-orange-200 hover:bg-orange-300 text-orange-800 text-xs rounded-lg transition-colors"
                >
                  Professional
                </button>
              </div>
            </div>
          )} */}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">Let's start with your basic details</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Education Background */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Education Background</h3>
                <p className="text-gray-600">Tell us about your current education status</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Education Level *
                </label>
                <select
                  value={formData.currentLevel}
                  onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.currentLevel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your current level</option>
                  <option value="waec_graduate">WAEC Graduate (2024/2025)</option>
                  <option value="undergraduate">Current Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Postgraduate</option>
                  <option value="working_professional">Working Professional</option>
                </select>
                {errors.currentLevel && <p className="text-red-500 text-sm mt-1">{errors.currentLevel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current/Previous Institution
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your school/university name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Year *
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.graduationYear ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select graduation year</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="before_2020">Before 2020</option>
                </select>
                {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Study Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Study Preferences</h3>
                <p className="text-gray-600">What would you like to study in the UK?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Program Level *
                </label>
                <select
                  value={formData.preferredProgram}
                  onChange={(e) => handleInputChange('preferredProgram', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.preferredProgram ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select program level</option>
                  <option value="alevels">A Levels</option>
                  <option value="foundation">Foundation Course</option>
                  <option value="undergraduate">Undergraduate (Bachelor's)</option>
                  <option value="postgraduate">Postgraduate (Master's)</option>
                  <option value="mres">MRes (Master by Research)</option>
                  <option value="phd">PhD</option>
                  <option value="professional">Professional Course</option>
                </select>
                {errors.preferredProgram && <p className="text-red-500 text-sm mt-1">{errors.preferredProgram}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study *
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Computer Science, Business, Medicine"
                />
                {errors.fieldOfStudy && <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Universities (Optional)
                </label>
                <textarea
                  value={formData.preferredUniversities}
                  onChange={(e) => handleInputChange('preferredUniversities', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="List any specific universities you're interested in"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intended Start Date *
                </label>
                <select
                  value={formData.intendedStartDate}
                  onChange={(e) => handleInputChange('intendedStartDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.intendedStartDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select start date</option>
                  <option value="september_2025">September 2025</option>
                  <option value="january_2026">January 2026</option>
                  <option value="march_2026">March 2026</option>
                  <option value="may_2026">May 2026</option>
                  <option value="september_2026">September 2026</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.intendedStartDate && <p className="text-red-500 text-sm mt-1">{errors.intendedStartDate}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Final Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Final Details</h3>
                <p className="text-gray-600">Just a few more questions to help us serve you better</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasPassport"
                    checked={formData.hasPassport}
                    onChange={(e) => handleInputChange('hasPassport', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasPassport" className="text-sm font-medium text-gray-700">
                    I have a valid passport
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="previousApplications"
                    checked={formData.previousApplications}
                    onChange={(e) => handleInputChange('previousApplications', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="previousApplications" className="text-sm font-medium text-gray-700">
                    I have previously applied to UK universities
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range (Annual Tuition + Living) *
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.budgetRange ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select budget range</option>
                  <option value="under_20k">Under £20,000</option>
                  <option value="20k_30k">£20,000 - £30,000</option>
                  <option value="30k_40k">£30,000 - £40,000</option>
                  <option value="40k_50k">£40,000 - £50,000</option>
                  <option value="over_50k">Over £50,000</option>
                  <option value="need_guidance">Need guidance on budgeting</option>
                </select>
                {errors.budgetRange && <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Questions or Comments
                </label>
                <textarea
                  value={formData.additionalQuestions}
                  onChange={(e) => handleInputChange('additionalQuestions', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Any specific questions or additional information you'd like to share?"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            {/* Submit Error Display */}
            {submitError && (
              <div className="w-full mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}
            
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}