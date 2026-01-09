import { LottoType } from '../types';
import type { LotteryConfig, LotteryConfigRegistry } from './types';

/**
 * Bingo win class constants for filtering different game modes
 */
const BINGO_WIN_CLASSES = {
  FULL_GAME: 6,
  CENTER_SQUARE: 5,
  CORNER_SQUARE: 4,
  DIAGONAL_SQUARE: 3,
} as const;

/**
 * Registry of all configured lottery types
 * To add a new lottery: simply add a new entry to this object
 */
export const LOTTERY_CONFIGS: LotteryConfigRegistry = {
  // ===== ESTONIA (EE) =====

  [LottoType.EURO]: {
    lottoType: LottoType.EURO,
    logo: '/img/lottery/eurojackpot_logo.svg',
    links: {
      buyTickets: 'https://www.eestiloto.ee/et/eurojackpot/#plain',
      gameRules: 'https://eestiloto.zendesk.com/hc/et-ee/articles/15852803719069-Eurojackpoti-m%C3%A4ngujuhend',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        {
          titleKey: 'result.primaryNumbers',
          maxNumbers: 5,
          containerSize: { sm: 6 },
        },
        {
          titleKey: 'result.secondaryNumbers',
          maxNumbers: 2,
          containerSize: { sm: 6 },
          isSecondary: true,
        },
      ],
    },
  },

  [LottoType.VIKINGLOTTO]: {
    lottoType: LottoType.VIKINGLOTTO,
    logo: '/img/lottery/vikinglotto_logo.svg',
    links: {
      buyTickets: 'https://www.eestiloto.ee/et/vikinglotto/#plain',
      gameRules: 'https://eestiloto.zendesk.com/hc/et-ee/articles/15852799648413-Vikinglotto-m%C3%A4ngujuhend',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        {
          titleKey: 'result.primaryNumbers',
          maxNumbers: 6,
          containerSize: { sm: 6 },
        },
        {
          titleKey: 'result.secondaryNumbers',
          maxNumbers: 1,
          containerSize: { sm: 6 },
          isSecondary: true,
        },
      ],
    },
  },

  [LottoType.KENO]: {
    lottoType: LottoType.KENO,
    logo: '/img/lottery/Keno_logo.svg',
    links: {
      buyTickets: 'https://www.eestiloto.ee/et/keno/#plain',
      gameRules: 'https://eestiloto.zendesk.com/hc/et-ee/articles/15852841307165-Keno-m%C3%A4ngujuhend',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        {
          titleKey: 'result.primaryNumbers',
          maxNumbers: 10,
        },
      ],
    },
  },

  [LottoType.BINGO]: {
    lottoType: LottoType.BINGO,
    logo: '/img/lottery/bingo_logo.svg',
    links: {
      buyTickets: 'https://www.eestiloto.ee/et/bingoloto/#plain',
      gameRules: 'https://eestiloto.zendesk.com/hc/et-ee/articles/15852861053469-Bingo-loto-m%C3%A4ngujuhend',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        {
          titleKey: 'result.bingo.centerGame',
          maxNumbers: 1,
          containerSize: { sm: 4 },
          winClass: BINGO_WIN_CLASSES.CENTER_SQUARE,
        },
        {
          titleKey: 'result.bingo.cornerGame',
          maxNumbers: 4,
          containerSize: { sm: 8 },
          winClass: BINGO_WIN_CLASSES.CORNER_SQUARE,
        },
        {
          titleKey: 'result.bingo.diagonalGame',
          maxNumbers: 5,
          containerSize: { sm: 4 },
          winClass: BINGO_WIN_CLASSES.DIAGONAL_SQUARE,
        },
        {
          titleKey: 'result.bingo.fullGame',
          maxNumbers: 10,
          containerSize: { sm: 8 },
          winClass: BINGO_WIN_CLASSES.FULL_GAME,
        },
      ],
    },
  },

  [LottoType.JOKKER]: {
    lottoType: LottoType.JOKKER,
    logo: '/img/lottery/jokker_logo.svg',
    links: {
      buyTickets: 'https://www.eestiloto.ee/et/jokker/#plain',
      gameRules: 'https://eestiloto.zendesk.com/hc/et-ee/articles/15852902153757-Jokkeri-m%C3%A4ngujuhend',
    },
    dataTransform: {
      mode: 'positional',
      positional: {
        maxNumbersPerPosition: 3,
      },
    },
  },

  // ===== UNITED KINGDOM (UK) =====

  [LottoType.UK_LOTTO]: {
    lottoType: LottoType.UK_LOTTO,
    logo: '/img/lottery/uk_lotto_logo.svg',
    links: {
      buyTickets: 'https://www.national-lottery.co.uk/games/lotto',
      gameRules: 'https://www.national-lottery.co.uk/games/lotto/game-procedures',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.UK_EUROMILLIONS]: {
    lottoType: LottoType.UK_EUROMILLIONS,
    logo: '/img/lottery/euromillions_logo.png',
    links: {
      buyTickets: 'https://www.national-lottery.co.uk/games/euromillions',
      gameRules: 'https://www.national-lottery.co.uk/games/euromillions/game-procedures',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.luckyStars', maxNumbers: 2, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.UK_THUNDERBALL]: {
    lottoType: LottoType.UK_THUNDERBALL,
    logo: '/img/lottery/Thunderball_logo.webp',
    links: {
      buyTickets: 'https://www.national-lottery.co.uk/games/thunderball',
      gameRules: 'https://www.national-lottery.co.uk/games/thunderball/game-procedures',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.thunderball', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.UK_SET_FOR_LIFE]: {
    lottoType: LottoType.UK_SET_FOR_LIFE,
    logo: '/img/lottery/Set_for_Life_logo.svg',
    links: {
      buyTickets: 'https://www.national-lottery.co.uk/games/set-for-life',
      gameRules: 'https://www.national-lottery.co.uk/games/set-for-life/game-procedures',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.lifeBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.UK_HOT_PICKS]: {
    lottoType: LottoType.UK_HOT_PICKS,
    logo: '/img/lottery/hotPicks_logo.svg',
    links: {
      buyTickets: 'https://www.national-lottery.co.uk/games/lotto-hotpicks',
      gameRules: 'https://www.national-lottery.co.uk/games/lotto-hotpicks/game-procedures',
    },
    dataTransform: {
      mode: 'standard',
      categories: [{ titleKey: 'result.primaryNumbers', maxNumbers: 6 }],
    },
  },

  // ===== UNITED STATES (US) =====

  [LottoType.POWERBALL]: {
    lottoType: LottoType.POWERBALL,
    logo: '/img/lottery/Powerball_logo.png',
    links: {
      buyTickets: 'https://www.powerball.com/',
      gameRules: 'https://www.powerball.com/games/powerball',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.powerball', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.MEGA_MILLIONS]: {
    lottoType: LottoType.MEGA_MILLIONS,
    logo: '/img/lottery/megamillions_logo.svg',
    links: {
      buyTickets: 'https://www.megamillions.com/',
      gameRules: 'https://www.megamillions.com/how-to-play.aspx',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.megaBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.CASH4LIFE]: {
    lottoType: LottoType.CASH4LIFE,
    logo: '/img/lottery/Cash4Life_logo.png',
    links: {
      buyTickets: 'https://www.cash4life.org/',
      gameRules: 'https://www.cash4life.org/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.cashBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  // ===== SPAIN (ES) =====

  [LottoType.ES_LA_PRIMITIVA]: {
    lottoType: LottoType.ES_LA_PRIMITIVA,
    logo: '/img/lottery/la_primitiva_logo.webp',
    links: {
      buyTickets: 'https://www.loteriasyapuestas.es/es/la-primitiva',
      gameRules: 'https://www.loteriasyapuestas.es/es/la-primitiva/como-se-juega',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.reintegro', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.ES_BONOLOTO]: {
    lottoType: LottoType.ES_BONOLOTO,
    logo: '/img/lottery/bonoloto_logo.webp',
    links: {
      buyTickets: 'https://www.loteriasyapuestas.es/es/bonoloto',
      gameRules: 'https://www.loteriasyapuestas.es/es/bonoloto/como-se-juega',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.reintegro', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.ES_EL_GORDO]: {
    lottoType: LottoType.ES_EL_GORDO,
    logo: '/img/lottery/el_gordo_logo.webp',
    links: {
      buyTickets: 'https://www.loteriasyapuestas.es/es/el-gordo-de-la-primitiva',
      gameRules: 'https://www.loteriasyapuestas.es/es/el-gordo-de-la-primitiva/como-se-juega',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.clave', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },
};

/**
 * Get lottery configuration by type
 * @throws Error if lottery type is not configured
 */
export function getLotteryConfig(lottoType: LottoType): LotteryConfig {
  const config = LOTTERY_CONFIGS[lottoType];
  if (!config) {
    throw new Error(`No configuration found for lottery type: ${lottoType}`);
  }
  return config;
}

/**
 * Check if a lottery type is configured
 */
export function isLotteryConfigured(lottoType: LottoType): boolean {
  return lottoType in LOTTERY_CONFIGS;
}
