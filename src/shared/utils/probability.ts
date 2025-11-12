import { NumberStat } from '../types';
import { MostProbableDigitsByPosition } from '../types';

export function getTopProbabilityStats(data: NumberStat[], minCount: number): NumberStat[] {
  if (!data.length) {
    return [];
  }

  if (data.length <= minCount) {
    return data;
  }

  const sorted = [...data].sort((a, b) => b.frequency - a.frequency);
  const thresholdProb = sorted[minCount - 1].frequency;

  return sorted.filter((item) => item.frequency >= thresholdProb);
}

export function getMostProbableDigitsByPosition(data: NumberStat[]): MostProbableDigitsByPosition {
  if (!data.length) {
    return {};
  }

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
    const maxProb = Math.max(...stats.map((s) => s.frequency));
    result[+posStr] = stats.filter((s) => s.frequency === maxProb);
    return result;
  }, {});
}
