import { useMemo, useState, type ReactNode } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { property } from '../../data/property';

const cad0 = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});
const cad2 = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 2,
});

/** Periodic payment with Canadian semi-annual compounding. */
function periodicPayment(loan: number, annualRatePct: number, years: number, perYear: number): number {
  if (loan <= 0 || years <= 0) return 0;
  const r = annualRatePct / 100;
  if (r === 0) return loan / (years * perYear);
  const ear = Math.pow(1 + r / 2, 2) - 1;
  const i = Math.pow(1 + ear, 1 / perYear) - 1;
  const n = years * perYear;
  return (loan * i) / (1 - Math.pow(1 + i, -n));
}

const inputCls =
  'w-full rounded-sm border border-bone/20 bg-transparent px-3 py-2 font-sans text-bone outline-none transition-colors focus:border-cognac';

export function MortgageCalc() {
  const { t } = useI18n();
  const m = property.mortgage;
  const [price, setPrice] = useState(m.price);
  const [down, setDown] = useState(m.downPayment);
  const [rate, setRate] = useState(m.ratePct);
  const [years, setYears] = useState(m.amortizationYears);
  const [perYear, setPerYear] = useState<26 | 12>(26);

  const loan = Math.max(0, price - down);
  const downPct = price > 0 ? Math.round((down / price) * 100) : 0;
  const payment = useMemo(
    () => periodicPayment(loan, rate, years, perYear),
    [loan, rate, years, perYear],
  );

  return (
    <div className="rounded-sm border border-bone/15 bg-bone/[0.03] p-6 md:p-8">
      <h3 className="font-display text-2xl text-bone">{t('calc.title')}</h3>

      <div className="mt-6 space-y-5">
        <Field label={t('calc.price')}>
          <input type="number" min={0} step={10000} value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className={inputCls} />
        </Field>
        <Field label={`${t('calc.down')} · ${downPct}%`}>
          <input type="number" min={0} step={5000} value={down} onChange={(e) => setDown(Number(e.target.value) || 0)} className={inputCls} />
        </Field>
        <Field label={t('calc.rate')}>
          <input type="number" min={0} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className={inputCls} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t('calc.amortization')}>
            <select value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls}>
              {[5, 10, 15, 20, 25, 30].map((y) => (
                <option key={y} value={y} className="bg-ink">
                  {y} {t('calc.years')}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('calc.frequency')}>
            <select value={perYear} onChange={(e) => setPerYear(Number(e.target.value) === 12 ? 12 : 26)} className={inputCls}>
              <option value={26} className="bg-ink">{t('calc.biweekly')}</option>
              <option value={12} className="bg-ink">{t('calc.monthly')}</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-7 border-t border-bone/15 pt-5">
        <p className="font-sans text-xs uppercase tracking-widest text-bone/50">{t('calc.payment')}</p>
        <p className="mt-1 font-display text-4xl text-bone">
          {cad2.format(payment)}
          <span className="ml-2 text-base text-bone/60">
            {perYear === 26 ? t('calc.perBiweekly') : t('calc.perMonthly')}
          </span>
        </p>
        <p className="mt-2 font-sans text-sm text-bone/50">
          {t('calc.loan')}: {cad0.format(loan)}
        </p>
      </div>

      <p className="mt-4 font-sans text-xs leading-relaxed text-bone/40">{t('calc.legal')}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-sans text-xs uppercase tracking-widest text-bone/50">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
