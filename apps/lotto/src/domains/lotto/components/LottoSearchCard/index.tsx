import type React from 'react';
import { useCallback, useState } from 'react';
import { subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Button, Card, CardContent, DatePicker, Field, FieldLabel, Separator } from '@lotto/ui';

import { useLottoStore } from '@/domains/lotto';

import type { LottoSearchProps } from './types';

export const LottoSearchCard = ({ lottoType }: LottoSearchProps): React.JSX.Element => {
  const [dateFromValue, setDateFromValue] = useState<Date | undefined>(subMonths(new Date(), 1));
  const [dateToValue, setDateToValue] = useState<Date | undefined>(new Date());
  const { t } = useTranslation();
  const setSearchParams = useLottoStore((state) => state.setSearchParams);

  const handleSearch = useCallback(() => {
    setSearchParams({
      lottoType,
      dateFrom: dateFromValue?.toISOString() ?? subMonths(new Date(), 1).toISOString(),
      dateTo: dateToValue?.toISOString() ?? new Date().toISOString(),
    });
  }, [dateFromValue, dateToValue, lottoType, setSearchParams]);

  return (
    <Card className="shadow-md">
      <CardContent>
        <div className="col-span-12">
          {/* Divider with centered text */}
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-body-small text-muted-foreground">{t('search.search')}</span>
            <Separator className="flex-1" />
          </div>
          <div className="grid grid-cols-12 gap-2 pt-4">
            <div className="col-span-6 p-2 sm:col-span-4">
              <Field>
                <FieldLabel>{t('search.dateFrom')}</FieldLabel>
                <DatePicker value={dateFromValue} maxDate={dateToValue} onChange={setDateFromValue} />
              </Field>
            </div>
            <div className="col-span-6 p-2 sm:col-span-4">
              <Field>
                <FieldLabel>{t('search.dateTo')}</FieldLabel>
                <DatePicker
                  value={dateToValue}
                  minDate={dateFromValue}
                  maxDate={new Date()}
                  onChange={setDateToValue}
                />
              </Field>
            </div>
            <div className="col-span-12 flex items-end justify-end p-2 sm:col-span-4">
              <Button className="w-full" variant="primary" onClick={handleSearch}>
                {t('search.calculate')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
