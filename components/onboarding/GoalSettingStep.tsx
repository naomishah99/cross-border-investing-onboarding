'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { goalsSchema } from '@/lib/validation';
import { GoalData } from '@/types/onboarding';
import Select from '@/components/ui/Select';
import StepNavigation from '@/components/ui/StepNavigation';
import {
    INVESTMENT_GOALS,
    VISA_STATUS_OPTIONS,
    RISK_TOLERANCE_OPTIONS,
    TIME_HORIZON_OPTIONS,
} from '@/lib/constants';

interface GoalSettingStepProps {
    initialData?: GoalData;
    onNext: (data: GoalData) => void;
    onBack: () => void;
}

export default function GoalSettingStep({
    initialData,
    onNext,
    onBack,
}: GoalSettingStepProps) {
    const [selectedGoal, setSelectedGoal] = useState<
        'us-retirement' | 'india-retirement' | 'wealth-building' | null
    >(initialData?.primaryGoal || null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GoalData>({
        resolver: zodResolver(goalsSchema),
        defaultValues: initialData,
    });

    const handleGoalSelect = (goal: 'us-retirement' | 'india-retirement' | 'wealth-building') => {
        setSelectedGoal(goal);
        setValue('primaryGoal', goal);
    };

    const onSubmit = (data: GoalData) => {
        onNext(data);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Investment Goals</h2>
                <p className="text-muted-foreground">
                    Set your long-term objectives to help us tailor your investment strategy.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Primary Goal Selection */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">What's your primary investment goal?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(
                            Object.keys(INVESTMENT_GOALS) as Array<
                                'us-retirement' | 'india-retirement' | 'wealth-building'
                            >
                        ).map((key) => (
                            <motion.button
                                key={key}
                                type="button"
                                onClick={() => handleGoalSelect(key)}
                                className={`card p-5 text-left transition-all ${selectedGoal === key
                                        ? 'border-primary-600 bg-primary-600/10'
                                        : 'hover:border-primary-600/50'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="text-4xl mb-3">{INVESTMENT_GOALS[key].icon}</div>
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold">{INVESTMENT_GOALS[key].title}</h4>
                                    {selectedGoal === key && <span className="text-primary-600">✓</span>}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {INVESTMENT_GOALS[key].description}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                    {errors.primaryGoal && (
                        <p className="text-sm text-error-500 mt-2">{errors.primaryGoal.message}</p>
                    )}
                </div>

                {/* Reassurance Message */}
                {selectedGoal && (
                    <motion.div
                        className="bg-success-600/10 border border-success-600/20 rounded-lg p-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex gap-3">
                            <svg
                                className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-sm">
                                <p className="font-medium text-foreground mb-1">Peace of mind</p>
                                <p className="text-muted-foreground">
                                    {INVESTMENT_GOALS[selectedGoal].reassurance}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Additional Details */}
                <div className="card-glass space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Additional Details</h3>

                    <Select
                        label="Current Visa Status"
                        options={VISA_STATUS_OPTIONS}
                        {...register('visaStatus')}
                        error={errors.visaStatus?.message}
                        required
                    />

                    <Select
                        label="Investment Time Horizon"
                        options={TIME_HORIZON_OPTIONS}
                        {...register('timeHorizon')}
                        error={errors.timeHorizon?.message}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                            Risk Tolerance <span className="text-error-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {RISK_TOLERANCE_OPTIONS.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-start gap-3 p-3 border border-border rounded-lg hover:border-primary-600 cursor-pointer transition-colors"
                                >
                                    <input
                                        type="radio"
                                        value={option.value}
                                        {...register('riskTolerance')}
                                        className="mt-1"
                                    />
                                    <div>
                                        <div className="font-medium">{option.label}</div>
                                        <div className="text-sm text-muted-foreground">{option.description}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.riskTolerance && (
                            <p className="text-sm text-error-500 mt-2">{errors.riskTolerance.message}</p>
                        )}
                    </div>
                </div>

                <StepNavigation
                    onBack={onBack}
                    onNext={handleSubmit(onSubmit)}
                    disabled={!selectedGoal}
                />
            </form>
        </motion.div>
    );
}
