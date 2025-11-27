import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Card, CardContent, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import ResponsiveHeader from '../shared/components/ResponsiveHeader';

interface SubscriptionTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export const SubscriptionPage: React.FC = () => {
  const { t } = useTranslation();

  const subscriptionTiers: SubscriptionTier[] = [
    {
      name: t('subscription.free.name'),
      price: t('subscription.free.price'),
      period: '',
      features: [t('subscription.free.feature1'), t('subscription.free.feature2'), t('subscription.free.feature3')],
    },
    {
      name: t('subscription.pro.name'),
      price: '$2.49',
      period: t('subscription.perMonth'),
      features: [
        t('subscription.pro.feature1'),
        t('subscription.pro.feature2'),
        t('subscription.pro.feature3'),
        t('subscription.pro.feature4'),
      ],
      highlighted: true,
    },
    {
      name: t('subscription.premium.name'),
      price: '$3.99',
      period: t('subscription.perMonth'),
      features: [
        t('subscription.pro.feature1'),
        t('subscription.premium.feature3'),
        t('subscription.pro.feature3'),
        t('subscription.pro.feature4'),
        t('subscription.premium.feature1'),
        t('subscription.premium.feature2'),
      ],
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 2 }}>
        <Paper elevation={12}>
          <ResponsiveHeader />
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
              {t('subscription.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              {t('subscription.subtitle')}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {subscriptionTiers.map((tier, index) => (
                <Grid key={index} size={{ xs: 12, md: 4 }}>
                  <Card
                    raised={tier.highlighted}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: tier.highlighted ? 2 : 0,
                      borderColor: tier.highlighted ? 'primary.main' : 'transparent',
                      position: 'relative',
                    }}
                  >
                    {tier.highlighted && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -2,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'primary.main',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="caption" fontWeight="bold">
                          {t('subscription.popular')}
                        </Typography>
                      </Box>
                    )}
                    <CardContent
                      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: tier.highlighted ? 4 : 2 }}
                    >
                      <Typography variant="h5" component="div" gutterBottom align="center" fontWeight="bold">
                        {tier.name}
                      </Typography>
                      <Box sx={{ textAlign: 'center', my: 2 }}>
                        <Typography variant="h3" component="span" fontWeight="bold" color="primary">
                          {tier.price}
                        </Typography>
                        {tier.period && (
                          <Typography variant="subtitle1" component="span" color="text.secondary">
                            {' '}
                            {tier.period}
                          </Typography>
                        )}
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        {tier.features.map((feature, featureIndex) => (
                          <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <CheckIcon sx={{ color: 'success.main', mr: 1, mt: 0.5, fontSize: 20 }} />
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        variant={tier.highlighted ? 'contained' : 'outlined'}
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        disabled={tier.price === t('subscription.free.price')}
                      >
                        {tier.price === t('subscription.free.price')
                          ? t('subscription.currentPlan')
                          : t('subscription.choosePlan')}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
