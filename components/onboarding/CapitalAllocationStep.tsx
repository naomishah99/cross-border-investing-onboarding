'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { allocationSchema } from '@/lib/validation';
import { AllocationData } from '@/types/onboarding';
import Input from '@/components/ui/Input';
import StepNavigation from '@/components/ui/StepNavigation';

interface CapitalAllocationStepProps {
    initialData?: AllocationData;
    onNext: (data: AllocationData) => void;
    onBack: () => void;
}

export default function CapitalAllocationStep({
    initialData,
    onNext,
    onBack,
}: CapitalAllocationStepProps) {
    const [usPercentage, setUsPercentage] = useState(initialData?.usMarketPercentage || 50);
    const indiaPercentage = 100 - usPercentage;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AllocationData>({
        resolver: zodResolver(allocationSchema),
        defaultValues: initialData || {
            usMarketPercentage: 50,
            indiaMarketPercentage: 50,
            initialInvestmentAmount: 1000,
        },
    });

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setUsPercentage(value);
        setValue('usMarketPercentage', value);
        setValue('indiaMarketPercentage', 100 - value);
    };

    const onSubmit = (data: AllocationData) => {
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
                <h2 className="text-2xl font-bold mb-2">Capital Allocation</h2>
                <p className="text-muted-foreground">
                    Decide how to split your investment between US and Indian markets.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Initial Investment Amount */}
                <div className="card-glass">
                    <h3 className="text-lg font-semibold mb-4">Initial Investment</h3>
                    <Input
                        label="How much would you like to invest?"
                        type="number"
                        placeholder="1000"
                        {...register('initialInvestmentAmount', { valueAsNumber: true })}
                        error={errors.initialInvestmentAmount?.message}
                        helperText="Minimum $100"
                        required
                    />
                </div>

                {/* Allocation Slider */}
                <div className="card-glass">
                    <h3 className="text-lg font-semibold mb-6">Market Allocation</h3>

                    {/* Visual representation */}
                    <div className="mb-6">
                        <div className="flex h-16 rounded-lg overflow-hidden">
                            <motion.div
                                className="bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white font-semibold"
                                initial={{ width: '50%' }}
                                animate={{ width: `${usPercentage}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {usPercentage > 15 && `🇺🇸 ${usPercentage}%`}
                            </motion.div>
                            <motion.div
                                className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold"
                                initial={{ width: '50%' }}
                                animate={{ width: `${indiaPercentage}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {indiaPercentage > 15 && `🇮🇳 ${indiaPercentage}%`}
                            </motion.div>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="mb-6">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={usPercentage}
                            onChange={handleSliderChange}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                            style={{
                                background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${usPercentage}%, rgb(249, 115, 22) ${usPercentage}%, rgb(249, 115, 22) 100%)`,
                            }}
                        />
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">US Market</div>
                            <div className="text-2xl font-bold text-blue-600">{usPercentage}%</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                S&P 500, NASDAQ, etc.
                            </div>
                        </div>
                        <div className="p-4 bg-orange-600/10 border border-orange-600/20 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">India Market</div>
                            <div className="text-2xl font-bold text-orange-600">{indiaPercentage}%</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                NIFTY 50, SENSEX, etc.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggested Portfolios */}
                <div className="card-glass">
                    <h3 className="text-lg font-semibold mb-4">Suggested Allocations</h3>
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={() => {
                                setUsPercentage(70);
                                setValue('usMarketPercentage', 70);
                                setValue('indiaMarketPercentage', 30);
                            }}
                            className="w-full p-3 text-left border border-border rounded-lg hover:border-primary-600 transition-colors"
                        >
                            <div className="font-medium">US-Focused (70/30)</div>
                            <div className="text-sm text-muted-foreground">
                                Ideal for long-term US residents
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setUsPercentage(50);
                                setValue('usMarketPercentage', 50);
                                setValue('indiaMarketPercentage', 50);
                            }}
                            className="w-full p-3 text-left border border-border rounded-lg hover:border-primary-600 transition-colors"
                        >
                            <div className="font-medium">Balanced (50/50)</div>
                            <div className="text-sm text-muted-foreground">
                                Equal exposure to both markets
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setUsPercentage(30);
                                setValue('usMarketPercentage', 30);
                                setValue('indiaMarketPercentage', 70);
                            }}
                            className="w-full p-3 text-left border border-border rounded-lg hover:border-primary-600 transition-colors"
                        >
                            <div className="font-medium">India-Focused (30/70)</div>
                            <div className="text-sm text-muted-foreground">
                                Planning to return to India
                            </div>
                        </button>
                    </div>
                </div>

                <StepNavigation onBack={onBack} onNext={handleSubmit(onSubmit)} />
            </form>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #0ea5e9;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #0ea5e9;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
        </motion.div>
    );
}
