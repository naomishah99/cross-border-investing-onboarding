'use client';

import { motion } from 'framer-motion';
import { OnboardingData } from '@/types/onboarding';

interface CompletionStepProps {
    data: OnboardingData;
}

export default function CompletionStep({ data }: CompletionStepProps) {
    return (
        <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Success Animation */}
            <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-success-600 to-success-500 rounded-full flex items-center justify-center text-6xl mb-6 shadow-2xl">
                    ✓
                </div>
            </motion.div>

            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                You're All Set!
            </motion.h1>

            <motion.p
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                Your cross-border investment account is ready to go
            </motion.p>

            {/* Summary Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="card-glass text-left">
                    <div className="text-sm text-muted-foreground mb-1">Identity</div>
                    <div className="font-semibold">{data.identity?.fullName}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                        Verified in US & India
                    </div>
                </div>

                <div className="card-glass text-left">
                    <div className="text-sm text-muted-foreground mb-1">Tax Status</div>
                    <div className="font-semibold capitalize">
                        {data.tax?.taxResidency} Tax Resident
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                        {data.tax?.accountType?.toUpperCase()} Account
                    </div>
                </div>

                <div className="card-glass text-left">
                    <div className="text-sm text-muted-foreground mb-1">Banking</div>
                    <div className="font-semibold">
                        {data.banking?.usBank.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                        {data.banking?.indiaBank.name}
                    </div>
                </div>

                <div className="card-glass text-left">
                    <div className="text-sm text-muted-foreground mb-1">Allocation</div>
                    <div className="font-semibold">
                        {data.allocation?.usMarketPercentage}% US / {data.allocation?.indiaMarketPercentage}% India
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                        ${data.allocation?.initialInvestmentAmount?.toLocaleString()} initial
                    </div>
                </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
                className="card-glass text-left mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <span className="text-primary-600 mt-1">1.</span>
                        <span>
                            <strong>Review your portfolio:</strong> Explore recommended investments based on your goals
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-primary-600 mt-1">2.</span>
                        <span>
                            <strong>Make your first deposit:</strong> Transfer funds from your linked accounts
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-primary-600 mt-1">3.</span>
                        <span>
                            <strong>Start investing:</strong> Build your cross-border portfolio
                        </span>
                    </li>
                </ul>
            </motion.div>

            {/* CTA */}
            <motion.button
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => alert('Dashboard coming soon!')}
            >
                Go to Dashboard →
            </motion.button>
        </motion.div>
    );
}
