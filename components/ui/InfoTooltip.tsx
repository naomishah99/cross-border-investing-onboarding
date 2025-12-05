'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoTooltipProps {
    content: string | React.ReactNode;
    children?: React.ReactNode;
}

export default function InfoTooltip({ content, children }: InfoTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                type="button"
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-600/20 text-primary-600 hover:bg-primary-600/30 transition-colors"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
            >
                {children || (
                    <svg
                        className="w-3 h-3"
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
                )}
            </button>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="absolute z-50 w-64 p-3 mt-2 text-sm bg-card border border-border rounded-lg shadow-xl left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="text-foreground">{content}</div>
                        <div className="absolute w-3 h-3 bg-card border-l border-t border-border transform rotate-45 -top-1.5 left-1/2 -translate-x-1/2" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
