'use client';

import { AnimatePresence } from 'framer-motion';
import { useOnboardingState } from '@/hooks/useOnboardingState';
import ProgressBar from '@/components/ui/ProgressBar';
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import IdentityVerificationStep from '@/components/onboarding/IdentityVerificationStep';
import TaxDeclarationStep from '@/components/onboarding/TaxDeclarationStep';
import BankingSetupStep from '@/components/onboarding/BankingSetupStep';
import CapitalAllocationStep from '@/components/onboarding/CapitalAllocationStep';
import GoalSettingStep from '@/components/onboarding/GoalSettingStep';
import CompletionStep from '@/components/onboarding/CompletionStep';
import { ONBOARDING_STEPS } from '@/lib/constants';
import { OnboardingStep } from '@/types/onboarding';

export default function OnboardingPage() {
    const { data, updateData, setCurrentStep, completeStep } = useOnboardingState();

    const handleNext = (stepData: any) => {
        // Update data based on current step
        updateData(stepData);
        completeStep(data.currentStep);

        // Move to next step
        const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.id === data.currentStep);
        if (currentIndex < ONBOARDING_STEPS.length - 1) {
            setCurrentStep(ONBOARDING_STEPS[currentIndex + 1].id as OnboardingStep);
        }
    };

    const handleBack = () => {
        const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.id === data.currentStep);
        if (currentIndex > 0) {
            setCurrentStep(ONBOARDING_STEPS[currentIndex - 1].id as OnboardingStep);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Mobile App Header */}
            {data.currentStep !== 'welcome' && data.currentStep !== 'completion' && (
                <div className="px-6 pt-6 pb-4 border-b border-border bg-background sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={handleBack}
                            className="text-primary-600 text-base font-medium"
                        >
                            ← Back
                        </button>
                        <h2 className="text-base font-semibold">Account Setup</h2>
                        <div className="w-16" /> {/* Spacer for centering */}
                    </div>
                    <ProgressBar currentStep={data.currentStep} completedSteps={data.completedSteps} />
                </div>
            )}

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {data.currentStep === 'welcome' && (
                        <WelcomeStep
                            key="welcome"
                            onNext={() => setCurrentStep('identity')}
                        />
                    )}

                    {data.currentStep === 'identity' && (
                        <IdentityVerificationStep
                            key="identity"
                            initialData={data.identity}
                            onNext={(identityData) => handleNext({ identity: identityData })}
                            onBack={handleBack}
                        />
                    )}

                    {data.currentStep === 'tax' && (
                        <TaxDeclarationStep
                            key="tax"
                            initialData={data.tax}
                            onNext={(taxData) => handleNext({ tax: taxData })}
                            onBack={handleBack}
                        />
                    )}

                    {data.currentStep === 'banking' && (
                        <BankingSetupStep
                            key="banking"
                            initialData={data.banking}
                            onNext={(bankingData) => handleNext({ banking: bankingData })}
                            onBack={handleBack}
                        />
                    )}

                    {data.currentStep === 'allocation' && (
                        <CapitalAllocationStep
                            key="allocation"
                            initialData={data.allocation}
                            onNext={(allocationData) => handleNext({ allocation: allocationData })}
                            onBack={handleBack}
                        />
                    )}

                    {data.currentStep === 'goals' && (
                        <GoalSettingStep
                            key="goals"
                            initialData={data.goals}
                            onNext={(goalsData) => {
                                handleNext({ goals: goalsData });
                                setCurrentStep('completion');
                            }}
                            onBack={handleBack}
                        />
                    )}

                    {data.currentStep === 'completion' && (
                        <CompletionStep key="completion" data={data} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
