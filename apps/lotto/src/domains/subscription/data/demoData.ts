import type { NumberDetailDto } from '@/domains/lotto/types';

/**
 * Demo data for showcasing PRO and PREMIUM features.
 * Uses number 7 (universally recognized as "lucky") with realistic statistics.
 * 156 total draws provides enough data for all statistical analyses to be meaningful.
 */
export const DEMO_NUMBER_DETAIL: NumberDetailDto = {
  summary: {
    number: 7,
    totalDraws: 156,
    appearanceCount: 26,
    frequencyPercent: 16.67,
    expectedFrequencyPercent: 14.29, // ~1/7 for typical 7-number lottery
    status: 'frequent',
    lastSeenDrawsAgo: 3,
    lastSeenDate: '2024-12-20',
    overdueScore: 0.21,
  },
  confidenceInterval: {
    lower: 11.2,
    upper: 22.1,
    confidenceLevel: 95,
  },
  deviation: {
    absolute: 2.38,
    relative: 16.66,
    isSignificant: false,
  },
  trends: {
    longestDroughtDays: 42,
    currentDroughtDays: 7,
    averageDaysBetweenAppearances: 18.2,
    currentStreak: 0,
    longestStreak: 3,
    timeSeries: [
      { month: '2024-07', appearances: 3, expectedAppearances: 2.2 },
      { month: '2024-08', appearances: 4, expectedAppearances: 2.2 },
      { month: '2024-09', appearances: 2, expectedAppearances: 2.2 },
      { month: '2024-10', appearances: 5, expectedAppearances: 2.2 },
      { month: '2024-11', appearances: 3, expectedAppearances: 2.2 },
      { month: '2024-12', appearances: 2, expectedAppearances: 2.2 },
    ],
  },
  autocorrelation: {
    lagCorrelations: [
      { lag: 1, correlation: 0.12, pValue: 0.18, isSignificant: false },
      { lag: 2, correlation: -0.05, pValue: 0.62, isSignificant: false },
      { lag: 3, correlation: 0.08, pValue: 0.35, isSignificant: false },
      { lag: 4, correlation: 0.18, pValue: 0.04, isSignificant: true },
      { lag: 5, correlation: -0.02, pValue: 0.81, isSignificant: false },
    ],
    interpretation: 'random',
  },
  markovChain: {
    transitionProbabilities: {
      appearedToAppeared: 0.19,
      appearedToNotAppeared: 0.81,
      notAppearedToAppeared: 0.15,
      notAppearedToNotAppeared: 0.85,
    },
    transitionCounts: {
      appearedToAppeared: 5,
      appearedToNotAppeared: 21,
      notAppearedToAppeared: 21,
      notAppearedToNotAppeared: 109,
    },
    steadyStateProbability: 0.156,
    interpretation: 'memoryless',
  },
  pairAnalysis: {
    topCompanions: [
      { number: 14, coOccurrences: 8, expectedCoOccurrences: 4.3, lift: 1.86, isSignificant: true },
      { number: 21, coOccurrences: 7, expectedCoOccurrences: 4.1, lift: 1.71, isSignificant: true },
      { number: 33, coOccurrences: 6, expectedCoOccurrences: 3.9, lift: 1.54, isSignificant: false },
      { number: 42, coOccurrences: 6, expectedCoOccurrences: 4.2, lift: 1.43, isSignificant: false },
      { number: 18, coOccurrences: 5, expectedCoOccurrences: 3.8, lift: 1.32, isSignificant: false },
    ],
    avoidedNumbers: [
      { number: 35, coOccurrences: 1, expectedCoOccurrences: 4.1, lift: 0.24, isSignificant: true },
      { number: 29, coOccurrences: 2, expectedCoOccurrences: 4.5, lift: 0.44, isSignificant: false },
      { number: 11, coOccurrences: 2, expectedCoOccurrences: 4.0, lift: 0.5, isSignificant: false },
    ],
    interpretation: 'has_companions',
  },
  monteCarlo: {
    simulationCount: 10000,
    simulatedProbability: 16.42,
    theoreticalProbability: 14.29,
    percentile5: 10.2,
    percentile95: 18.8,
    actualAppearances: 26,
    interpretation: 'above_expected',
  },
  seasonalPatterns: {
    byDayOfWeek: [
      { dayOfWeek: 0, appearances: 0, totalDraws: 0, frequency: 0 }, // Sunday - no draws
      { dayOfWeek: 1, appearances: 0, totalDraws: 0, frequency: 0 }, // Monday - no draws
      { dayOfWeek: 2, appearances: 10, totalDraws: 52, frequency: 0.1923 }, // Tuesday
      { dayOfWeek: 3, appearances: 0, totalDraws: 0, frequency: 0 }, // Wednesday - no draws
      { dayOfWeek: 4, appearances: 9, totalDraws: 52, frequency: 0.1731 }, // Thursday
      { dayOfWeek: 5, appearances: 0, totalDraws: 0, frequency: 0 }, // Friday - no draws
      { dayOfWeek: 6, appearances: 7, totalDraws: 52, frequency: 0.1346 }, // Saturday
    ],
    byMonth: [
      { month: 1, appearances: 2, totalDraws: 13, frequency: 0.1538 },
      { month: 2, appearances: 3, totalDraws: 13, frequency: 0.2308 },
      { month: 3, appearances: 2, totalDraws: 13, frequency: 0.1538 },
      { month: 4, appearances: 1, totalDraws: 13, frequency: 0.0769 },
      { month: 5, appearances: 3, totalDraws: 13, frequency: 0.2308 },
      { month: 6, appearances: 2, totalDraws: 13, frequency: 0.1538 },
      { month: 7, appearances: 3, totalDraws: 13, frequency: 0.2308 },
      { month: 8, appearances: 4, totalDraws: 13, frequency: 0.3077 },
      { month: 9, appearances: 2, totalDraws: 13, frequency: 0.1538 },
      { month: 10, appearances: 2, totalDraws: 13, frequency: 0.1538 },
      { month: 11, appearances: 1, totalDraws: 13, frequency: 0.0769 },
      { month: 12, appearances: 1, totalDraws: 13, frequency: 0.0769 },
    ],
    interpretation: 'no_pattern',
  },
  occurrences: [
    {
      drawId: 'demo-1',
      drawDate: '2024-12-20',
      drawLabel: 'Draw #156',
      allNumbers: [7, 14, 21, 28, 35, 42, 49],
      secondaryNumbers: [3],
    },
    {
      drawId: 'demo-2',
      drawDate: '2024-12-13',
      drawLabel: 'Draw #154',
      allNumbers: [2, 7, 18, 25, 33, 41, 47],
      secondaryNumbers: [8],
    },
    {
      drawId: 'demo-3',
      drawDate: '2024-12-06',
      drawLabel: 'Draw #152',
      allNumbers: [7, 11, 19, 27, 34, 42, 48],
      secondaryNumbers: [5],
    },
  ],
  timeline: [
    { drawDate: '2024-12-23', drawLabel: 'Draw #157', appeared: false },
    { drawDate: '2024-12-20', drawLabel: 'Draw #156', appeared: true },
    { drawDate: '2024-12-16', drawLabel: 'Draw #155', appeared: false },
    { drawDate: '2024-12-13', drawLabel: 'Draw #154', appeared: true },
    { drawDate: '2024-12-09', drawLabel: 'Draw #153', appeared: false },
    { drawDate: '2024-12-06', drawLabel: 'Draw #152', appeared: true },
    { drawDate: '2024-12-02', drawLabel: 'Draw #151', appeared: false },
    { drawDate: '2024-11-29', drawLabel: 'Draw #150', appeared: false },
    { drawDate: '2024-11-25', drawLabel: 'Draw #149', appeared: true },
    { drawDate: '2024-11-22', drawLabel: 'Draw #148', appeared: false },
  ],
  periodStart: '2023-06-01',
  periodEnd: '2024-12-23',
};
