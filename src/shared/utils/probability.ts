import { NumberStat } from '../types';
import { MostProbableDigitsByPosition } from '../types';

export function getTopProbabilityStats(data: NumberStat[], minCount: number): NumberStat[] {
  if (!data.length) {
    return [];
  }

  if (data.length <= minCount) {
    return data;
  }

  const sorted = [...data].sort((a, b) => b.probability - a.probability);
  const thresholdProb = sorted[minCount - 1].probability;

  return sorted.filter((item) => item.probability >= thresholdProb);
}

export function getMostProbableDigitsByPosition(data: NumberStat[]): MostProbableDigitsByPosition {
  const grouped = data.reduce<Record<number, NumberStat[]>>((acc, item) => {
    if (item.position === null || item.position === undefined) {
      return acc;
    }
    if (!acc[item.position]) {
      acc[item.position] = [];
    }
    acc[item.position].push(item);

    return acc;
  }, {});

  return Object.entries(grouped).reduce<MostProbableDigitsByPosition>((result, [posStr, stats]) => {
    const maxProb = Math.max(...stats.map((s) => s.probability));
    result[+posStr] = stats.filter((s) => s.probability === maxProb);
    return result;
  }, {});
}
