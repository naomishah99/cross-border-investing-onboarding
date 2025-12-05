'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { taxSchema } from '@/lib/validation';
import { TaxData } from '@/types/onboarding';
import StepNavigation from '@/components/ui/StepNavigation';
import InfoTooltip from '@/components/ui/InfoTooltip';
import { TAX_INFO, ACCOUNT_TYPE_INFO } from '@/lib/constants';

interface TaxDeclarationStepProps {
    initialData?: TaxData;
    onNext: (data: TaxData) => void;
    onBack: () => void;
}

export default function TaxDeclarationStep({
    initialData,
    onNext,
    onBack,
}: TaxDeclarationStepProps) {
    const [selectedResidency, setSelectedResidency] = useState<'us' | 'india' | 'both' | null>(
        initialData?.taxResidency || null
    );
    const [selectedAccountType, setSelectedAccountType] = useState<'nre' | 'nro' | null>(
        initialData?.accountType || null
    );

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TaxData>({
        resolver: zodResolver(taxSchema),
        defaultValues: initialData,
    });

    const handleResidencySelect = (type: 'us' | 'india' | 'both') => {
        setSelectedResidency(type);
        setValue('taxResidency', type);
    };

    const handleAccountTypeSelect = (type: 'nre' | 'nro') => {
        setSelectedAccountType(type);
        setValue('accountType', type);
        setValue('investmentGoal', `Invest via ${type.toUpperCase()} account`);
    };

    const onSubmit = (data: TaxData) => {
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
                <h2 className="text-2xl font-bold mb-2">Tax Declaration</h2>
                <p className="text-muted-foreground">
                    Help us understand your tax situation to ensure compliance and optimize your investments.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Tax Residency */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-semibold">Tax Residency Status</h3>
                        <InfoTooltip content="Your tax residency determines which country's tax laws apply to your investments. This affects reporting requirements and potential tax benefits." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(Object.keys(TAX_INFO) as Array<'us' | 'india' | 'both'>).map((key) => (
                            <motion.button
                                key={key}
                                type="button"
                                onClick={() => handleResidencySelect(key)}
                                className={`card p-4 text-left transition-all ${selectedResidency === key
                                        ? 'border-primary-600 bg-primary-600/10'
                                        : 'hover:border-primary-600/50'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold">{TAX_INFO[key].title}</h4>
                                    {selectedResidency === key && (
                                        <span className="text-primary-600">✓</span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {TAX_INFO[key].description}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                    {errors.taxResidency && (
                        <p className="text-sm text-error-500 mt-2">{errors.taxResidency.message}</p>
                    )}
                </div>

                {/* Account Type Selection */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-semibold">Indian Account Type</h3>
                        <InfoTooltip content="Choose the account type that best fits your needs. NRE accounts are for foreign earnings, while NRO accounts are for Indian income." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(Object.keys(ACCOUNT_TYPE_INFO) as Array<'nre' | 'nro'>).map((key) => (
                            <motion.button
                                key={key}
                                type="button"
                                onClick={() => handleAccountTypeSelect(key)}
                                className={`card p-5 text-left transition-all ${selectedAccountType === key
                                        ? 'border-accent-600 bg-accent-600/10'
                                        : 'hover:border-accent-600/50'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-lg">
                                        {ACCOUNT_TYPE_INFO[key].title}
                                    </h4>
                                    {selectedAccountType === key && (
                                        <span className="text-accent-600 text-xl">✓</span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    {ACCOUNT_TYPE_INFO[key].description}
                                </p>
                                <ul className="space-y-1">
                                    {ACCOUNT_TYPE_INFO[key].benefits.map((benefit, idx) => (
                                        <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                                            <span className="text-success-500 mt-0.5">✓</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </motion.button>
                        ))}
                    </div>
                    {errors.accountType && (
                        <p className="text-sm text-error-500 mt-2">{errors.accountType.message}</p>
                    )}
                </div>

                <div className="bg-accent-600/10 border border-accent-600/20 rounded-lg p-4">
                    <div className="flex gap-3">
                        <svg
                            className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div className="text-sm">
                            <p className="font-medium text-foreground mb-1">Not sure which to choose?</p>
                            <p className="text-muted-foreground">
                                Most people living in the US choose NRE accounts for their foreign earnings. You can always change this later.
                            </p>
                        </div>
                    </div>
                </div>

                <StepNavigation
                    onBack={onBack}
                    onNext={handleSubmit(onSubmit)}
                    disabled={!selectedResidency || !selectedAccountType}
                />
            </form>
        </motion.div>
    );
}
