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
        maxNumbersPerPosition: 1,
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
    logo: '/img/lottery/shared/euromillions.svg',
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

  [LottoType.UK_49S_LUNCHTIME]: {
    lottoType: LottoType.UK_49S_LUNCHTIME,
    logo: '/img/lottery/uk/49s.png',
    links: {
      buyTickets: 'https://www.49s.co.uk/',
      gameRules: 'https://www.49s.co.uk/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.booster', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.UK_49S_TEATIME]: {
    lottoType: LottoType.UK_49S_TEATIME,
    logo: '/img/lottery/uk/49s.png',
    links: {
      buyTickets: 'https://www.49s.co.uk/',
      gameRules: 'https://www.49s.co.uk/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.booster', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
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

  [LottoType.US_LOTTO_AMERICA]: {
    lottoType: LottoType.US_LOTTO_AMERICA,
    logo: '/img/lottery/us/lotto_america.png',
    links: {
      buyTickets: 'https://www.lottoamerica.com/',
      gameRules: 'https://www.lottoamerica.com/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.starBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.US_LUCKY_FOR_LIFE]: {
    lottoType: LottoType.US_LUCKY_FOR_LIFE,
    logo: '/img/lottery/us/lucky_for_life.png',
    links: {
      buyTickets: 'https://www.luckyforlife.us/',
      gameRules: 'https://www.luckyforlife.us/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.luckyBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.US_CA_SUPERLOTTO]: {
    lottoType: LottoType.US_CA_SUPERLOTTO,
    logo: '/img/lottery/us/superlotto_plus.webp',
    links: {
      buyTickets: 'https://www.calottery.com/draw-games/superlotto-plus',
      gameRules: 'https://www.calottery.com/draw-games/superlotto-plus#section-content-2-3',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.megaBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.US_NY_LOTTO]: {
    lottoType: LottoType.US_NY_LOTTO,
    logo: '/img/lottery/us/ny_lotto.png',
    links: {
      buyTickets: 'https://nylottery.ny.gov/draw-game?game=lotto',
      gameRules: 'https://nylottery.ny.gov/draw-game?game=lotto',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.US_TX_LOTTO]: {
    lottoType: LottoType.US_TX_LOTTO,
    logo: '/img/lottery/us/tx_lotto.png',
    links: {
      buyTickets: 'https://www.txlottery.org/export/sites/lottery/Games/Lotto_Texas/',
      gameRules: 'https://www.txlottery.org/export/sites/lottery/Games/Lotto_Texas/',
    },
    dataTransform: {
      mode: 'standard',
      categories: [{ titleKey: 'result.primaryNumbers', maxNumbers: 6 }],
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
      categories: [{ titleKey: 'result.primaryNumbers', maxNumbers: 10 }],
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
        maxNumbersPerPosition: 1,
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
        maxNumbersPerPosition: 1,
      },
    },
  },

  // ===== FRANCE (FR) =====

  [LottoType.FR_LOTO]: {
    lottoType: LottoType.FR_LOTO,
    logo: '/img/lottery/fr/loto.svg',
    links: {
      buyTickets: 'https://www.fdj.fr/jeux-de-tirage/loto',
      gameRules: 'https://www.fdj.fr/jeux-de-tirage/loto/reglement',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.numeroChance', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.FR_JOKER]: {
    lottoType: LottoType.FR_JOKER,
    logo: '/img/lottery/fr/joker.svg',
    links: {
      buyTickets: 'https://www.fdj.fr/jeux-de-tirage/jokerplus',
      gameRules: 'https://www.fdj.fr/jeux-de-tirage/jokerplus/reglement',
    },
    dataTransform: {
      mode: 'positional',
      positional: {
        maxNumbersPerPosition: 1,
      },
    },
  },

  [LottoType.FR_KENO]: {
    lottoType: LottoType.FR_KENO,
    logo: '/img/lottery/fr/keno.webp',
    links: {
      buyTickets: 'https://www.fdj.fr/jeux-de-tirage/keno-gagnant-a-vie',
      gameRules: 'https://www.fdj.fr/jeux-de-tirage/keno-gagnant-a-vie/reglement',
    },
    dataTransform: {
      mode: 'standard',
      categories: [{ titleKey: 'result.primaryNumbers', maxNumbers: 10 }],
    },
  },

  // ===== CANADA (CA) =====

  [LottoType.CA_LOTTO_MAX]: {
    lottoType: LottoType.CA_LOTTO_MAX,
    logo: '/img/lottery/ca/lotto_max.png',
    links: {
      buyTickets: 'https://www.olg.ca/en/lottery/play-lotto-max-702702702702.html',
      gameRules: 'https://www.olg.ca/en/lottery/play-lotto-max-702702702702.html',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 7, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.CA_LOTTO_649]: {
    lottoType: LottoType.CA_LOTTO_649,
    logo: '/img/lottery/ca/lotto_649.png',
    links: {
      buyTickets: 'https://www.olg.ca/en/lottery/play-lotto-649-702702702702.html',
      gameRules: 'https://www.olg.ca/en/lottery/play-lotto-649-702702702702.html',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.CA_DAILY_GRAND]: {
    lottoType: LottoType.CA_DAILY_GRAND,
    logo: '/img/lottery/ca/daily_grand.png',
    links: {
      buyTickets: 'https://www.olg.ca/en/lottery/play-daily-grand-702702702702.html',
      gameRules: 'https://www.olg.ca/en/lottery/play-daily-grand-702702702702.html',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 5, containerSize: { sm: 6 } },
        { titleKey: 'result.grandNumber', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.CA_LOTTARIO]: {
    lottoType: LottoType.CA_LOTTARIO,
    logo: '/img/lottery/ca/lottario.webp',
    links: {
      buyTickets: 'https://www.olg.ca/en/lottery/play-lottario-702702702702.html',
      gameRules: 'https://www.olg.ca/en/lottery/play-lottario-702702702702.html',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.CA_BC_49]: {
    lottoType: LottoType.CA_BC_49,
    logo: '/img/lottery/ca/bc_49.svg',
    links: {
      buyTickets: 'https://www.bclc.com/play-lottery/bc-49.html',
      gameRules: 'https://www.bclc.com/play-lottery/bc-49.html',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.CA_QUEBEC_49]: {
    lottoType: LottoType.CA_QUEBEC_49,
    logo: '/img/lottery/ca/quebec_49.webp',
    links: {
      buyTickets: 'https://loteries.lotoquebec.com/en/lotteries/quebec-49',
      gameRules: 'https://loteries.lotoquebec.com/en/lotteries/quebec-49',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.CA_ATLANTIC_49]: {
    lottoType: LottoType.CA_ATLANTIC_49,
    logo: '/img/lottery/ca/atlantic_49.svg',
    links: {
      buyTickets: 'https://www.alc.ca/content/alc/en/play-online/lottery/atlantic-49.html',
      gameRules: 'https://www.alc.ca/content/alc/en/play-online/lottery/atlantic-49.html',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.bonusBall', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  // ===== AUSTRALIA (AU) =====

  [LottoType.AU_POWERBALL]: {
    lottoType: LottoType.AU_POWERBALL,
    logo: '/img/lottery/au/powerball.svg',
    links: {
      buyTickets: 'https://www.thelott.com/powerball',
      gameRules: 'https://www.thelott.com/powerball/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 7, containerSize: { sm: 6 } },
        { titleKey: 'result.powerball', maxNumbers: 1, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.AU_SATURDAY_LOTTO]: {
    lottoType: LottoType.AU_SATURDAY_LOTTO,
    logo: '/img/lottery/au/saturday_lotto.svg',
    links: {
      buyTickets: 'https://www.thelott.com/saturday-lotto',
      gameRules: 'https://www.thelott.com/saturday-lotto/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.supplementary', maxNumbers: 2, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.AU_OZ_LOTTO]: {
    lottoType: LottoType.AU_OZ_LOTTO,
    logo: '/img/lottery/au/oz_lotto.png',
    links: {
      buyTickets: 'https://www.thelott.com/oz-lotto',
      gameRules: 'https://www.thelott.com/oz-lotto/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 7, containerSize: { sm: 6 } },
        { titleKey: 'result.supplementary', maxNumbers: 2, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.AU_SET_FOR_LIFE]: {
    lottoType: LottoType.AU_SET_FOR_LIFE,
    logo: '/img/lottery/au/set_for_life.png',
    links: {
      buyTickets: 'https://www.thelott.com/set-for-life',
      gameRules: 'https://www.thelott.com/set-for-life/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [{ titleKey: 'result.primaryNumbers', maxNumbers: 8 }],
    },
  },

  [LottoType.AU_WEEKDAY_WINDFALL]: {
    lottoType: LottoType.AU_WEEKDAY_WINDFALL,
    logo: '/img/lottery/au/weekday_windfall.webp',
    links: {
      buyTickets: 'https://www.thelott.com/mon-wed-lotto',
      gameRules: 'https://www.thelott.com/mon-wed-lotto/how-to-play',
    },
    dataTransform: {
      mode: 'standard',
      categories: [
        { titleKey: 'result.primaryNumbers', maxNumbers: 6, containerSize: { sm: 6 } },
        { titleKey: 'result.supplementary', maxNumbers: 2, containerSize: { sm: 6 }, isSecondary: true },
      ],
    },
  },

  [LottoType.AU_CASH_3]: {
    lottoType: LottoType.AU_CASH_3,
    logo: '/img/lottery/au/cash_3.png',
    links: {
      buyTickets: 'https://www.thelott.com/cash-3',
      gameRules: 'https://www.thelott.com/cash-3/how-to-play',
    },
    dataTransform: {
      mode: 'positional',
      positional: {
        maxNumbersPerPosition: 1,
      },
    },
  },

  [LottoType.AU_SUPER_66]: {
    lottoType: LottoType.AU_SUPER_66,
    logo: '/img/lottery/au/super_66.png',
    links: {
      buyTickets: 'https://www.thelott.com/super-66',
      gameRules: 'https://www.thelott.com/super-66/how-to-play',
    },
    dataTransform: {
      mode: 'positional',
      positional: {
        maxNumbersPerPosition: 1,
      },
    },
  },

  [LottoType.AU_LOTTO_STRIKE]: {
    lottoType: LottoType.AU_LOTTO_STRIKE,
    logo: '/img/lottery/au/lotto_strike.png',
    links: {
      buyTickets: 'https://www.thelott.com/lotto-strike',
      gameRules: 'https://www.thelott.com/lotto-strike/how-to-play',
    },
    dataTransform: {
      mode: 'positional',
      positional: {
        maxNumbersPerPosition: 1,
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
