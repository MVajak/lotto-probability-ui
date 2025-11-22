import { NumberStat } from '../types';

/**
 * Groups numbers by their frequency value
 * @param stats Array of number statistics
 * @returns Array of groups, each containing numbers with the same frequency, sorted by frequency (descending)
 */
export const groupNumbersByFrequency = (stats: NumberStat[]): NumberStat[][] => {
  const grouped: { [key: number]: NumberStat[] } = {};

  stats.forEach(stat => {
    if (!grouped[stat.frequency]) {
      grouped[stat.frequency] = [];
    }
    grouped[stat.frequency].push(stat);
  });

  // Sort groups by frequency (descending) and return as array of arrays
  return Object.values(grouped).sort((a, b) => b[0].frequency - a[0].frequency);
};

export interface GroupDisplayAnalysis {
  groupsToShow: NumberStat[][];
  cutoffGroupIndex: number | null;
  maxVisibleInCutoffGroup: number | null;
}

/**
 * Analyzes frequency groups to determine which should be displayed and which group should be limited
 * @param groups Array of number groups sorted by frequency
 * @param maxCount Maximum number of individual numbers to display
 * @returns Analysis indicating which groups to show and which is the cutoff group
 */
export const analyzeGroupsForDisplay = (groups: NumberStat[][], maxCount: number): GroupDisplayAnalysis => {
  if (groups.length === 0) {
    return { groupsToShow: [], cutoffGroupIndex: null, maxVisibleInCutoffGroup: null };
  }

  let totalCount = 0;
  let cutoffGroupIndex: number | null = null;
  let maxVisibleInCutoffGroup: number | null = null;
  let lastGroupIndex = -1;

  // Find which group causes us to exceed the limit
  for (let i = 0; i < groups.length; i++) {
    const groupSize = groups[i].length;

    if (totalCount + groupSize <= maxCount) {
      // This entire group fits within the limit
      totalCount += groupSize;
      lastGroupIndex = i;

      // If we've reached exactly the limit, stop here
      if (totalCount === maxCount) {
        break;
      }
    } else {
      // This group would exceed the limit - it becomes the cutoff group
      cutoffGroupIndex = i;
      maxVisibleInCutoffGroup = maxCount - totalCount;
      lastGroupIndex = i;
      break;
    }
  }

  // Show groups up to and including the last one we processed
  const groupsToShow = lastGroupIndex >= 0
    ? groups.slice(0, lastGroupIndex + 1)
    : [];

  return { groupsToShow, cutoffGroupIndex, maxVisibleInCutoffGroup };
};
