import { useSuspenseQuery } from '@tanstack/react-query';

import { featureFlagsQuery } from '../queries';
import { FeatureFlagKeys } from '../types';

export function useFeatureFlags() {
  const { data: flags } = useSuspenseQuery(featureFlagsQuery);

  return {
    flags,
    isEnabled: (key: string) => flags[key] ?? false,
    adsEnabled: flags[FeatureFlagKeys.ENABLE_ADS] ?? false,
  };
}
