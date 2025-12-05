import { StepConfig } from '@/types/onboarding';

// Onboarding steps configuration
export const ONBOARDING_STEPS: StepConfig[] = [
    {
        id: 'welcome',
        title: 'Welcome',
        description: 'Get started with your cross-border investment journey',
        order: 0,
    },
    {
        id: 'identity',
        title: 'Identity Verification',
        description: 'Verify your identity across both countries',
        order: 1,
    },
    {
        id: 'tax',
        title: 'Tax Declaration',
        description: 'Declare your tax residency and investment preferences',
        order: 2,
    },
    {
        id: 'banking',
        title: 'Banking Setup',
        description: 'Link your US and India bank accounts',
        order: 3,
    },
    {
        id: 'allocation',
        title: 'Capital Allocation',
        description: 'Decide how to allocate your investments',
        order: 4,
    },
    {
        id: 'goals',
        title: 'Investment Goals',
        description: 'Set your long-term investment objectives',
        order: 5,
    },
    {
        id: 'completion',
        title: 'All Set!',
        description: 'Your account is ready',
        order: 6,
    },
];

// US Banks
export const US_BANKS = [
    'Chase',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'US Bank',
    'PNC Bank',
    'Capital One',
    'TD Bank',
    'Truist',
    'Charles Schwab',
];

// Indian Banks
export const INDIAN_BANKS = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'IDFC First Bank',
    'Yes Bank',
];

// Investment goals
export const INVESTMENT_GOALS = {
    'us-retirement': {
        title: 'US Retirement',
        description: 'Build wealth for retirement in the United States',
        icon: '🏡',
        reassurance: 'Your investments are protected and can be transferred to an NRO account if you return to India.',
    },
    'india-retirement': {
        title: 'India Retirement',
        description: 'Plan for retirement back in India',
        icon: '🌏',
        reassurance: 'Your US investments will be seamlessly converted when you move back to India.',
    },
    'wealth-building': {
        title: 'Wealth Building Across Borders',
        description: 'Maximize returns across both markets',
        icon: '💎',
        reassurance: 'Diversify across both economies regardless of where you eventually settle.',
    },
};

// Tax residency information
export const TAX_INFO = {
    us: {
        title: 'US Tax Resident',
        description: 'You file taxes primarily in the United States (IRS)',
    },
    india: {
        title: 'India Tax Resident',
        description: 'You file taxes primarily in India (Income Tax)',
    },
    both: {
        title: 'Dual Tax Resident',
        description: 'You file taxes in both countries',
    },
};

// Account type information
export const ACCOUNT_TYPE_INFO = {
    nre: {
        title: 'NRE Account',
        description: 'Non-Resident External - For foreign earnings, fully repatriable',
        benefits: ['Tax-free interest', 'Fully repatriable', 'Joint account with resident Indian'],
    },
    nro: {
        title: 'NRO Account',
        description: 'Non-Resident Ordinary - For Indian earnings, limited repatriation',
        benefits: ['Manage Indian income', 'Easy to open', 'Can receive rent, dividends'],
    },
};

// Visa status options
export const VISA_STATUS_OPTIONS = [
    { value: 'h1b', label: 'H1B Visa' },
    { value: 'green-card', label: 'Green Card' },
    { value: 'citizen', label: 'US Citizen' },
    { value: 'other', label: 'Other' },
];

// Risk tolerance options
export const RISK_TOLERANCE_OPTIONS = [
    { value: 'conservative', label: 'Conservative', description: 'Prefer stable, lower-risk investments' },
    { value: 'moderate', label: 'Moderate', description: 'Balance between growth and stability' },
    { value: 'aggressive', label: 'Aggressive', description: 'Maximize growth potential' },
];

// Time horizon options
export const TIME_HORIZON_OPTIONS = [
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' },
];
