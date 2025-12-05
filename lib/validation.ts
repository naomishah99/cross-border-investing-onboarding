import { z } from 'zod';

// SSN validation (XXX-XX-XXXX format)
export const ssnSchema = z.string()
    .regex(/^\d{3}-\d{2}-\d{4}$/, 'SSN must be in format XXX-XX-XXXX')
    .refine((val) => val !== '000-00-0000', 'Invalid SSN');

// Aadhaar validation (XXXX XXXX XXXX format)
export const aadhaarSchema = z.string()
    .regex(/^\d{4}\s\d{4}\s\d{4}$/, 'Aadhaar must be in format XXXX XXXX XXXX');

// Identity step validation
export const identitySchema = z.object({
    ssn: ssnSchema,
    aadhaar: aadhaarSchema,
    fullName: z.string().min(2, 'Full name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

// Tax declaration validation
export const taxSchema = z.object({
    taxResidency: z.enum(['us', 'india', 'both']),
    accountType: z.enum(['nre', 'nro']),
    investmentGoal: z.string().min(1, 'Investment goal is required'),
});

// Banking validation
export const bankingSchema = z.object({
    usBank: z.object({
        name: z.string().min(1, 'Bank name is required'),
        accountNumber: z.string().min(8, 'Account number must be at least 8 digits'),
        routingNumber: z.string().regex(/^\d{9}$/, 'Routing number must be 9 digits'),
    }),
    indiaBank: z.object({
        name: z.string().min(1, 'Bank name is required'),
        accountType: z.enum(['nre', 'nro']),
        accountNumber: z.string().min(8, 'Account number is required'),
        ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format'),
    }),
});

// Allocation validation
export const allocationSchema = z.object({
    usMarketPercentage: z.number().min(0).max(100),
    indiaMarketPercentage: z.number().min(0).max(100),
    initialInvestmentAmount: z.number().min(100, 'Minimum investment is $100'),
}).refine(
    (data) => data.usMarketPercentage + data.indiaMarketPercentage === 100,
    'Allocation must total 100%'
);

// Goals validation
export const goalsSchema = z.object({
    primaryGoal: z.enum(['us-retirement', 'india-retirement', 'wealth-building']),
    timeHorizon: z.string().min(1, 'Time horizon is required'),
    riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
    visaStatus: z.enum(['h1b', 'green-card', 'citizen', 'other']),
});
