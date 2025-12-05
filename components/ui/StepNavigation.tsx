'use client';

import { motion } from 'framer-motion';

interface StepNavigationProps {
    onBack?: () => void;
    onNext?: () => void;
    onSubmit?: () => void;
    isFirstStep?: boolean;
    isLastStep?: boolean;
    isLoading?: boolean;
    nextLabel?: string;
    backLabel?: string;
    disabled?: boolean;
}

export default function StepNavigation({
    onBack,
    onNext,
    onSubmit,
    isFirstStep = false,
    isLastStep = false,
    isLoading = false,
    nextLabel = 'Next',
    backLabel = 'Back',
    disabled = false,
}: StepNavigationProps) {
    const handleNext = () => {
        if (isLastStep && onSubmit) {
            onSubmit();
        } else if (onNext) {
            onNext();
        }
    };

    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            {!isFirstStep && onBack ? (
                <motion.button
                    type="button"
                    onClick={onBack}
                    className="btn-outline"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                >
                    ← {backLabel}
                </motion.button>
            ) : (
                <div />
            )}

            <motion.button
                type="button"
                onClick={handleNext}
                className={isLastStep ? 'btn-secondary' : 'btn-primary'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={disabled || isLoading}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Processing...
                    </span>
                ) : (
                    <>
                        {isLastStep ? '✓ Complete' : nextLabel}
                        {!isLastStep && ' →'}
                    </>
                )}
            </motion.button>
        </div>
    );
}
