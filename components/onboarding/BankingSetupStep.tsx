'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { bankingSchema } from '@/lib/validation';
import { BankingData } from '@/types/onboarding';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import StepNavigation from '@/components/ui/StepNavigation';
import { US_BANKS, INDIAN_BANKS } from '@/lib/constants';

interface BankingSetupStepProps {
    initialData?: BankingData;
    onNext: (data: BankingData) => void;
    onBack: () => void;
}

export default function BankingSetupStep({
    initialData,
    onNext,
    onBack,
}: BankingSetupStepProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BankingData>({
        resolver: zodResolver(bankingSchema),
        defaultValues: initialData,
    });

    const onSubmit = (data: BankingData) => {
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
                <h2 className="text-2xl font-bold mb-2">Banking Setup</h2>
                <p className="text-muted-foreground">
                    Link your bank accounts to enable seamless cross-border transfers.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* US Bank */}
                <div className="card-glass">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        🇺🇸 US Bank Account
                    </h3>

                    <div className="space-y-4">
                        <Select
                            label="Bank Name"
                            options={US_BANKS.map((bank) => ({ value: bank, label: bank }))}
                            {...register('usBank.name')}
                            error={errors.usBank?.name?.message}
                            required
                        />

                        <Input
                            label="Account Number"
                            placeholder="Enter your account number"
                            {...register('usBank.accountNumber')}
                            error={errors.usBank?.accountNumber?.message}
                            required
                        />

                        <Input
                            label="Routing Number"
                            placeholder="9-digit routing number"
                            {...register('usBank.routingNumber')}
                            error={errors.usBank?.routingNumber?.message}
                            helperText="9-digit ABA routing number"
                            required
                        />
                    </div>
                </div>

                {/* Indian Bank */}
                <div className="card-glass">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        🇮🇳 Indian Bank Account
                    </h3>

                    <div className="space-y-4">
                        <Select
                            label="Bank Name"
                            options={INDIAN_BANKS.map((bank) => ({ value: bank, label: bank }))}
                            {...register('indiaBank.name')}
                            error={errors.indiaBank?.name?.message}
                            required
                        />

                        <Select
                            label="Account Type"
                            options={[
                                { value: 'nre', label: 'NRE Account' },
                                { value: 'nro', label: 'NRO Account' },
                            ]}
                            {...register('indiaBank.accountType')}
                            error={errors.indiaBank?.accountType?.message}
                            required
                        />

                        <Input
                            label="Account Number"
                            placeholder="Enter your account number"
                            {...register('indiaBank.accountNumber')}
                            error={errors.indiaBank?.accountNumber?.message}
                            required
                        />

                        <Input
                            label="IFSC Code"
                            placeholder="e.g., SBIN0001234"
                            {...register('indiaBank.ifscCode')}
                            error={errors.indiaBank?.ifscCode?.message}
                            helperText="11-character IFSC code"
                            required
                        />
                    </div>
                </div>

                <div className="bg-success-600/10 border border-success-600/20 rounded-lg p-4">
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
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                        <div className="text-sm">
                            <p className="font-medium text-foreground mb-1">Bank-level security</p>
                            <p className="text-muted-foreground">
                                We use Plaid and similar secure services to connect your accounts. We never store your login credentials.
                            </p>
                        </div>
                    </div>
                </div>

                <StepNavigation onBack={onBack} onNext={handleSubmit(onSubmit)} />
            </form>
        </motion.div>
    );
}
