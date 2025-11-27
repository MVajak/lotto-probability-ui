import { Box, Container, styled } from '@mui/material';
import Paper from '@mui/material/Paper';

import { AdSpace } from '../shared/components/AdSpace';
import ResponsiveHeader from '../shared/components/ResponsiveHeader';
import type { LottoPageProps } from './types';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: '60px',
}));

export const LottoPage = ({ children }: LottoPageProps) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 2 }}>
        {/* Mobile Top Banner Ad - Only visible on small/medium screens */}
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <AdSpace position="top-mobile" />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {/* Left Ad Space - Hidden on small/medium screens */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              minWidth: '200px',
              maxWidth: '250px',
            }}
          >
            <AdSpace position="left" />
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            <Item elevation={0}>
              <ResponsiveHeader />
              {children}
            </Item>
          </Box>

          {/* Right Ad Space - Hidden on small/medium screens */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              minWidth: '200px',
              maxWidth: '250px',
            }}
          >
            <AdSpace position="right" />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
