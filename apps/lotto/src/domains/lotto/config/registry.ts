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
 * Spanish lottery win class constants
 * - MAIN_DRAW: 6 main numbers + complementario
 * - REINTEGRO: Single reintegro number (0-9)
 */
const SPANISH_WIN_CLASSES = {
  MAIN_DRAW: 1,
  REINTEGRO: 2,
} as const;

/**
 * Registry of all configured lottery types
 * To add a new lottery: simply add a new entry to this object
 */
export const LOTTERY_CONFIGS: LotteryConfigRegistry = {
  // ===== ESTONIA (EE) =====

  [LottoType.EUROJACKPOT]: {
    lottoType: LottoType.EUROJACKPOT,
    logo: '/img/lottery/shared/eurojackpot.svg',
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
    logo: '/img/lottery/shared/vikinglotto.svg',
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

  [LottoType.EST_KENO]: {
    lottoType: LottoType.EST_KENO,
    logo: '/img/lottery/ee/keno.svg',
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

  [LottoType.EST_BINGO]: {
    lottoType: LottoType.EST_BINGO,
    logo: '/img/lottery/ee/bingo.svg',
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

  [LottoType.EST_JOKKER]: {
    lottoType: LottoType.EST_JOKKER,
    logo: '/img/lottery/ee/jokker.svg',
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
    logo: '/img/lottery/uk/lotto.svg',
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

  [LottoType.EUROMILLIONS]: {
    lottoType: LottoType.EUROMILLIONS,
    logo: '/img/lottery/shared/euromillions.png',
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
    logo: '/img/lottery/uk/thunderball.webp',
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
    logo: '/img/lottery/uk/set_for_life.svg',
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
    logo: '/img/lottery/uk/hotpicks.svg',
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

  [LottoType.US_POWERBALL]: {
    lottoType: LottoType.US_POWERBALL,
    logo: '/img/lottery/us/powerball.png',
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

  [LottoType.US_MEGA_MILLIONS]: {
    lottoType: LottoType.US_MEGA_MILLIONS,
    logo: '/img/lottery/us/megamillions.svg',
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

  [LottoType.US_CASH4LIFE]: {
    lottoType: LottoType.US_CASH4LIFE,
    logo: '/img/lottery/us/cash4life.png',
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
    logo: '/img/lottery/es/la_primitiva.webp',
    links: {
      buyTickets: 'https://www.loteriasyapuestas.es/es/la-primitiva',
      gameRules: 'https://www.loteriasyapuestas.es/es/la-primitiva/como-se-juega',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        {
          titleKey: 'result.primaryNumbers',
          maxNumbers: 6,
          containerSize: { sm: 6 },
          winClass: SPANISH_WIN_CLASSES.MAIN_DRAW,
        },
        {
          titleKey: 'result.complementario',
          maxNumbers: 1,
          containerSize: { sm: 6 },
          isSecondary: true,
          winClass: SPANISH_WIN_CLASSES.MAIN_DRAW,
        },
        {
          titleKey: 'result.reintegro',
          maxNumbers: 1,
          winClass: SPANISH_WIN_CLASSES.REINTEGRO,
        },
      ],
    },
  },

  [LottoType.ES_BONOLOTO]: {
    lottoType: LottoType.ES_BONOLOTO,
    logo: '/img/lottery/es/bonoloto.webp',
    links: {
      buyTickets: 'https://www.loteriasyapuestas.es/es/bonoloto',
      gameRules: 'https://www.loteriasyapuestas.es/es/bonoloto/como-se-juega',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        {
          titleKey: 'result.primaryNumbers',
          maxNumbers: 6,
          containerSize: { sm: 6 },
          winClass: SPANISH_WIN_CLASSES.MAIN_DRAW,
        },
        {
          titleKey: 'result.complementario',
          maxNumbers: 1,
          containerSize: { sm: 6 },
          isSecondary: true,
          winClass: SPANISH_WIN_CLASSES.MAIN_DRAW,
        },
        {
          titleKey: 'result.reintegro',
          maxNumbers: 1,
          winClass: SPANISH_WIN_CLASSES.REINTEGRO,
        },
      ],
    },
  },

  [LottoType.ES_EL_GORDO]: {
    lottoType: LottoType.ES_EL_GORDO,
    logo: '/img/lottery/es/el_gordo.webp',
    links: {
      buyTickets: 'https://www.loteriasyapuestas.es/es/el-gordo-de-la-primitiva',
      gameRules: 'https://www.loteriasyapuestas.es/es/el-gordo-de-la-primitiva/como-se-juega',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.reintegro', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  // ===== IRELAND (IE) =====

  [LottoType.IE_LOTTO]: {
    lottoType: LottoType.IE_LOTTO,
    logo: '/img/lottery/ie/lotto.svg',
    links: {
      buyTickets: 'https://www.lottery.ie/play/lotto',
      gameRules: 'https://www.lottery.ie/useful-info/game-rules',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.IE_LOTTO_PLUS_1]: {
    lottoType: LottoType.IE_LOTTO_PLUS_1,
    logo: '/img/lottery/ie/lotto_plus1.svg',
    links: {
      buyTickets: 'https://www.lottery.ie/play/lotto',
      gameRules: 'https://www.lottery.ie/useful-info/game-rules',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.IE_LOTTO_PLUS_2]: {
    lottoType: LottoType.IE_LOTTO_PLUS_2,
    logo: '/img/lottery/ie/lotto_plus2.svg',
    links: {
      buyTickets: 'https://www.lottery.ie/play/lotto',
      gameRules: 'https://www.lottery.ie/useful-info/game-rules',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.IE_DAILY_MILLION]: {
    lottoType: LottoType.IE_DAILY_MILLION,
    logo: '/img/lottery/ie/daily_million.svg',
    links: {
      buyTickets: 'https://www.lottery.ie/play/daily-million',
      gameRules: 'https://www.lottery.ie/useful-info/game-rules',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.IE_DAILY_MILLION_PLUS]: {
    lottoType: LottoType.IE_DAILY_MILLION_PLUS,
    logo: '/img/lottery/ie/daily_million_plus.svg',
    links: {
      buyTickets: 'https://www.lottery.ie/play/daily-million',
      gameRules: 'https://www.lottery.ie/useful-info/game-rules',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  // ===== GERMANY (DE) =====

  [LottoType.DE_LOTTO_6AUS49]: {
    lottoType: LottoType.DE_LOTTO_6AUS49,
    logo: '/img/lottery/de/lotto_6aus49.svg',
    links: {
      buyTickets: 'https://www.lotto.de/lotto-6aus49',
      gameRules: 'https://www.lotto.de/lotto-6aus49/spielregeln',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.superzahl', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.DE_KENO]: {
    lottoType: LottoType.DE_KENO,
    logo: '/img/lottery/de/keno.webp',
    links: {
      buyTickets: 'https://www.lotto.de/keno',
      gameRules: 'https://www.lotto.de/keno/spielregeln',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 10 },
      ],
    },
  },

  [LottoType.DE_SPIEL77]: {
    lottoType: LottoType.DE_SPIEL77,
    logo: '/img/lottery/de/spiel77.svg',
    links: {
      buyTickets: 'https://www.lotto.de/spiel77',
      gameRules: 'https://www.lotto.de/spiel77/spielregeln',
    },
    dataTransform: {
      mode: 'positional',
      positional: {
        maxNumbersPerPosition: 3,
      },
    },
  },

  [LottoType.DE_SUPER6]: {
    lottoType: LottoType.DE_SUPER6,
    logo: '/img/lottery/de/super6.svg',
    links: {
      buyTickets: 'https://www.lotto.de/super6',
      gameRules: 'https://www.lotto.de/super6/spielregeln',
    },
    dataTransform: {
      mode: 'positional',
      positional: {
        maxNumbersPerPosition: 3,
      },
    },
  },

  // ===== SHARED (Multi-region) =====

  [LottoType.EURODREAMS]: {
    lottoType: LottoType.EURODREAMS,
    logo: '/img/lottery/shared/eurodreams.svg',
    links: {
      buyTickets: 'https://www.euro-dreams.com/',
      gameRules: 'https://www.euro-dreams.com/en/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.dreamNumber', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
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
