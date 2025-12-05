'use client';

import { motion } from 'framer-motion';
import { ONBOARDING_STEPS } from '@/lib/constants';
import { OnboardingStep } from '@/types/onboarding';

interface ProgressBarProps {
    currentStep: OnboardingStep;
    completedSteps: OnboardingStep[];
}

export default function ProgressBar({ currentStep, completedSteps }: ProgressBarProps) {
    const currentStepIndex = ONBOARDING_STEPS.findIndex((s) => s.id === currentStep);
    const progress = ((currentStepIndex + 1) / ONBOARDING_STEPS.length) * 100;

    return (
        <div className="w-full mb-8">
            {/* Progress percentage */}
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                    Step {currentStepIndex + 1} of {ONBOARDING_STEPS.length}
                </span>
                <span className="text-sm font-medium gradient-text">
                    {Math.round(progress)}% Complete
                </span>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-accent-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mt-4">
                {ONBOARDING_STEPS.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isCurrent = step.id === currentStep;
                    const isPast = index < currentStepIndex;

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${isCompleted || isPast
                                        ? 'bg-primary-600 text-white'
                                        : isCurrent
                                            ? 'bg-accent-600 text-white'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: isCurrent ? 1.1 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isCompleted || isPast ? '✓' : index + 1}
                            </motion.div>
                            <span
                                className={`text-xs text-center hidden md:block ${isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
                                    }`}
                            >
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
