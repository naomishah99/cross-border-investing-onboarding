'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { identitySchema } from '@/lib/validation';
import { IdentityData } from '@/types/onboarding';
import Input from '@/components/ui/Input';
import StepNavigation from '@/components/ui/StepNavigation';
import InfoTooltip from '@/components/ui/InfoTooltip';

interface IdentityVerificationStepProps {
    initialData?: IdentityData;
    onNext: (data: IdentityData) => void;
    onBack: () => void;
}

export default function IdentityVerificationStep({
    initialData,
    onNext,
    onBack,
}: IdentityVerificationStepProps) {
    const [isVerifying, setIsVerifying] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IdentityData>({
        resolver: zodResolver(identitySchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: IdentityData) => {
        setIsVerifying(true);
        // Simulate verification process
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsVerifying(false);
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
                <h2 className="text-2xl font-bold mb-2">Identity Verification</h2>
                <p className="text-muted-foreground">
                    We need to verify your identity in both the US and India to comply with regulations.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="card-glass">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

                    <div className="space-y-4">
                        <Input
                            label="Full Legal Name"
                            placeholder="As per government ID"
                            {...register('fullName')}
                            error={errors.fullName?.message}
                            required
                        />

                        <Input
                            label="Date of Birth"
                            type="date"
                            {...register('dateOfBirth')}
                            error={errors.dateOfBirth?.message}
                            required
                        />
                    </div>
                </div>

                {/* US Verification */}
                <div className="card-glass">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-semibold">🇺🇸 US Verification</h3>
                        <InfoTooltip content="We use bank-level encryption to protect your SSN. This information is required for IRS compliance." />
                    </div>

                    <Input
                        label="Social Security Number (SSN)"
                        placeholder="XXX-XX-XXXX"
                        {...register('ssn')}
                        error={errors.ssn?.message}
                        helperText="Format: XXX-XX-XXXX"
                        required
                    />
                </div>

                {/* India Verification */}
                <div className="card-glass">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-semibold">🇮🇳 India Verification</h3>
                        <InfoTooltip content="Aadhaar is required for KYC compliance in India. Your data is encrypted and secure." />
                    </div>

                    <Input
                        label="Aadhaar Number"
                        placeholder="XXXX XXXX XXXX"
                        {...register('aadhaar')}
                        error={errors.aadhaar?.message}
                        helperText="Format: XXXX XXXX XXXX"
                        required
                    />
                </div>

                <div className="bg-primary-600/10 border border-primary-600/20 rounded-lg p-4">
                    <div className="flex gap-3">
                        <svg
                            className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <div className="text-sm">
                            <p className="font-medium text-foreground mb-1">Your data is secure</p>
                            <p className="text-muted-foreground">
                                We use 256-bit encryption and never share your personal information with third parties.
                            </p>
                        </div>
                    </div>
                </div>

                <StepNavigation
                    onBack={onBack}
                    onNext={handleSubmit(onSubmit)}
                    isLoading={isVerifying}
                    nextLabel="Verify Identity"
                />
            </form>
        </motion.div>
    );
}
