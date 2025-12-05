'use client';

import { useState, useEffect } from 'react';
import { OnboardingData, OnboardingStep } from '@/types/onboarding';

const STORAGE_KEY = 'crossborder-onboarding-data';

export function useOnboardingState() {
    const [data, setData] = useState<OnboardingData>({
        currentStep: 'welcome',
        completedSteps: [],
    });

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse stored onboarding data', e);
            }
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const updateData = (updates: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const setCurrentStep = (step: OnboardingStep) => {
        setData((prev) => ({ ...prev, currentStep: step }));
    };

    const completeStep = (step: OnboardingStep) => {
        setData((prev) => ({
            ...prev,
            completedSteps: prev.completedSteps.includes(step)
                ? prev.completedSteps
                : [...prev.completedSteps, step],
        }));
    };

    const resetOnboarding = () => {
        setData({
            currentStep: 'welcome',
            completedSteps: [],
        });
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        data,
        updateData,
        setCurrentStep,
        completeStep,
        resetOnboarding,
    };
}
