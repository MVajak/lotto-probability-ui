import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import ResponsiveHeader from '../shared/components/ResponsiveHeader';
import { PricingCard } from './components/PricingCard';
import type { SubscriptionFeature, SubscriptionTierCode } from '@/features/subscription';
import { fetchSubscriptionTiers } from '@/features/subscription';

export const SubscriptionPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { tiers, isLoading, error } = useAppSelector((state) => state.subscription);
  const currentSubscription = useAppSelector((state) => state.auth.subscription);

  useEffect(() => {
    dispatch(fetchSubscriptionTiers());
  }, [dispatch]);

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `$${numPrice.toFixed(2).replace('.00', '')}`;
  };

  const translateFeature = (feature: SubscriptionFeature): string => {
    return t(`subscription.features.${feature}`);
  };

  const handleSelectPlan = (tierCode: SubscriptionTierCode) => {
    // TODO: Implement payment flow
    console.log(`Selected plan: ${tierCode}`);
  };

  const sortedTiers = [...tiers].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 2 }}>
        <ResponsiveHeader />

        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                color: 'text.primary',
              }}
            >
              {t('subscription.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              {t('subscription.subtitle')}
            </Typography>
          </Box>

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}

          {!isLoading && !error && sortedTiers.length > 0 && (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="stretch"
              sx={{ maxWidth: 1000, mx: 'auto' }}
            >
              {sortedTiers.map((tier) => (
                <Grid key={tier.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <PricingCard
                    tierCode={tier.code}
                    price={formatPrice(tier.price)}
                    features={tier.features.map(translateFeature)}
                    isHighlighted={tier.code === 'PRO'}
                    isCurrentPlan={currentSubscription?.tier === tier.code}
                    onSelect={() => handleSelectPlan(tier.code)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};
