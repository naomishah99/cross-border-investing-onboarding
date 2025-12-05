'use client';

import { motion } from 'framer-motion';

interface WelcomeStepProps {
    onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
    return (
        <motion.div
            className="min-h-screen flex flex-col px-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex-1 flex flex-col justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-lg">
                    🌏
                </div>

                <h1 className="text-3xl font-bold mb-3 text-center">
                    Welcome to <span className="gradient-text">CrossBorder</span>
                </h1>

                <p className="text-base text-muted-foreground mb-8 text-center leading-relaxed">
                    Your gateway to seamless investing between the US and India
                </p>

                <div className="card mb-6">
                    <h2 className="text-base font-semibold mb-4">What to expect:</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 mt-0.5 text-lg">✓</span>
                            <span className="text-sm">
                                <strong className="font-semibold">Identity Verification</strong>
                                <br />
                                <span className="text-muted-foreground">Verify your identity across both countries</span>
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 mt-0.5 text-lg">✓</span>
                            <span className="text-sm">
                                <strong className="font-semibold">Tax Setup</strong>
                                <br />
                                <span className="text-muted-foreground">Declare your tax residency</span>
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 mt-0.5 text-lg">✓</span>
                            <span className="text-sm">
                                <strong className="font-semibold">Banking</strong>
                                <br />
                                <span className="text-muted-foreground">Link your US and Indian accounts</span>
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 mt-0.5 text-lg">✓</span>
                            <span className="text-sm">
                                <strong className="font-semibold">Investment Goals</strong>
                                <br />
                                <span className="text-muted-foreground">Set your long-term objectives</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Takes about 3-5 minutes</span>
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <div className="pb-safe">
                <motion.button
                    onClick={onNext}
                    className="btn-primary w-full text-base py-4"
                    whileTap={{ scale: 0.98 }}
                >
                    Get Started
                </motion.button>
            </div>
        </motion.div>
    );
}
