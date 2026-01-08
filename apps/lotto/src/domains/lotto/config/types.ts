import type { GridColSpan } from '@/domains/lotto';
import type { LottoType } from '../types';

/**
 * Result display mode determines which result component to use:
 * - 'standard': LottoProbabilityResults (most lottery types)
 * - 'positional': LottoPositionalProbabilityResults (Jokker-style position-based)
 */
export type ResultDisplayMode = 'standard' | 'positional';

/**
 * Configuration for a single number category within a lottery
 * (e.g., "Primary Numbers", "Secondary Numbers", or Bingo game categories)
 */
export interface NumberCategoryConfig {
  /** Translation key for category title (e.g., 'result.primaryNumbers') */
  titleKey: string;
  /** Maximum numbers to display prominently */
  maxNumbers: number;
  /** Responsive grid column span */
  containerSize?: { sm?: GridColSpan };
  /** For multi-win-class games (Bingo): which winClass to filter by */
  winClass?: number;
  /** Whether this category uses secondary numbers from the API */
  isSecondary?: boolean;
}

/**
 * Data transformation configuration
 */
export interface DataTransformConfig {
  /** Display mode: 'standard' for frequency-based, 'positional' for position-based */
  mode: ResultDisplayMode;
  /** For standard mode: category configurations */
  categories?: NumberCategoryConfig[];
  /** For positional mode: configuration */
  positional?: {
    /** Max numbers to show per position (not currently used but available for future) */
    maxNumbersPerPosition?: number;
  };
}

/**
 * Complete lottery configuration
 */
export interface LotteryConfig {
  /** Unique lottery type identifier */
  lottoType: LottoType;
  /** Path to the lottery logo image */
  logo: string;
  /** External links for game info */
  links: {
    buyTickets: string;
    gameRules: string;
  };
  /** Data transformation and display configuration */
  dataTransform: DataTransformConfig;
}

/**
 * Registry type for all lottery configurations
 */
export type LotteryConfigRegistry = Partial<Record<LottoType, LotteryConfig>>;
