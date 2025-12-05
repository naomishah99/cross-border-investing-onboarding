'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            {/* Watercolor Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-32 left-1/2 -translate-x-1/2 w-64 h-64 watercolor-pink watercolor-blob"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-48 left-1/2 -translate-x-1/2 w-48 h-48 watercolor-green watercolor-blob"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.6, 0.4, 0.6],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-6 py-12 relative z-10">
                {/* App Icon */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                        🌏
                    </div>
                    <div className="text-sm font-medium text-foreground">CrossBorder</div>
                </motion.div>

                {/* Hero Illustration Area */}
                <motion.div
                    className="flex-1 flex items-center justify-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="text-center max-w-xs">
                        {/* Illustration placeholder - using emoji for now */}
                        <div className="text-7xl mb-6">💼</div>

                        <h1 className="text-3xl font-medium mb-3 leading-tight">
                            The Global Investment Plan
                        </h1>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Unlimited investing across US and India
                        </p>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <Link href="/onboarding" className="block">
                        <button className="btn-primary w-full">
                            Sign in
                        </button>
                    </Link>

                    <button className="w-full text-sm text-foreground font-medium py-3">
                        Request invite
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
