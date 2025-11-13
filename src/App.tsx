import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './features/auth/AuthProvider';
import { LoginPage } from './LoginPage';
import { LottoPage } from './LottoPage';
import { BingoLottoCard } from './LottoPage/BingoLottoCard';
import { EuroJackpotLottoCard } from './LottoPage/EuroJackpotLottoCard';
import { JokkerLottoCard } from './LottoPage/JokkerLottoCard';
import { KenoLottoCard } from './LottoPage/KenoLottoCard';
import { VikingLottoCard } from './LottoPage/VikingLottoCard';
import { MagicLinkVerifyPage } from './MagicLinkVerifyPage';
import { pageRoutes } from './shared/types';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to={pageRoutes.Eurojackpot} replace />} />
        <Route path={pageRoutes.Login} element={<LoginPage />} />
        <Route path={pageRoutes.Verify} element={<MagicLinkVerifyPage />} />
        <Route
          path={pageRoutes.Eurojackpot}
          element={
            <LottoPage>
              <EuroJackpotLottoCard />
            </LottoPage>
          }
        />
        <Route
          path={pageRoutes.VikingLotto}
          element={
            <LottoPage>
              <VikingLottoCard />
            </LottoPage>
          }
        />
        <Route
          path={pageRoutes.Bingo}
          element={
            <LottoPage>
              <BingoLottoCard />
            </LottoPage>
          }
        />
        <Route
          path={pageRoutes.Keno}
          element={
            <LottoPage>
              <KenoLottoCard />
            </LottoPage>
          }
        />
        <Route
          path={pageRoutes.Jokker}
          element={
            <LottoPage>
              <JokkerLottoCard />
            </LottoPage>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
