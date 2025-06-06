import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LottoPage } from './LottoPage';
import { BingoLottoCard } from './LottoPage/BingoLottoCard';
import { EuroJackpotLottoCard } from './LottoPage/EuroJackpotLottoCard';
import { JokkerLottoCard } from './LottoPage/JokkerLottoCard';
import { KenoLottoCard } from './LottoPage/KenoLottoCard';
import { VikingLottoCard } from './LottoPage/VikingLottoCard';
import { pageRoutes } from './shared/types';

function App() {
  return (
    <Routes>
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
  );
}

export default App;
