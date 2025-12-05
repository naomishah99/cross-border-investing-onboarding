// Onboarding step identifiers
export type OnboardingStep =
    | 'welcome'
    | 'identity'
    | 'tax'
    | 'banking'
    | 'allocation'
    | 'goals'
    | 'completion';

// Identity verification data
export interface IdentityData {
    ssn: string;
    aadhaar: string;
    fullName: string;
    dateOfBirth: string;
}

// Tax declaration data
export interface TaxData {
    taxResidency: 'us' | 'india' | 'both';
    accountType: 'nre' | 'nro';
    investmentGoal: string;
}

// Banking setup data
export interface BankingData {
    usBank: {
        name: string;
        accountNumber: string;
        routingNumber: string;
    };
    indiaBank: {
        name: string;
        accountType: 'nre' | 'nro';
        accountNumber: string;
        ifscCode: string;
    };
}

// Capital allocation data
export interface AllocationData {
    usMarketPercentage: number;
    indiaMarketPercentage: number;
    initialInvestmentAmount: number;
}

// Goal setting data
export interface GoalData {
    primaryGoal: 'us-retirement' | 'india-retirement' | 'wealth-building';
    timeHorizon: string;
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    visaStatus: 'h1b' | 'green-card' | 'citizen' | 'other';
}

// Complete onboarding data
export interface OnboardingData {
    identity?: IdentityData;
    tax?: TaxData;
    banking?: BankingData;
    allocation?: AllocationData;
    goals?: GoalData;
    currentStep: OnboardingStep;
    completedSteps: OnboardingStep[];
}

// Step configuration
export interface StepConfig {
    id: OnboardingStep;
    title: string;
    description: string;
    order: number;
}
