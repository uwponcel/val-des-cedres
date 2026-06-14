import { useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { property, type RoomLevel } from '../../data/property';
import { photos, type Photo } from '../../data/photos';
import { Lightbox } from '../ui/Lightbox';

const LEVELS: { key: RoomLevel; labelKey: string }[] = [
  { key: 'rdc', labelKey: 'pieces.levels.rdc' },
  { key: 'jardin', labelKey: 'pieces.levels.jardin' },
  { key: 'soussol', labelKey: 'pieces.levels.soussol' },
];

const PLANS = [
  { file: '/photos/m21723694-div76-01.jpg', code: 'plan', labelKey: 'pieces.plan.main' },
  { file: '/photos/m21723694-div77-01.jpg', code: 'plan', labelKey: 'pieces.plan.garden' },
  { file: '/photos/m21723694-div78-01.jpg', code: 'plan', labelKey: 'pieces.plan.full' },
  { file: '/photos/m21723694-gar79-01.jpg', code: 'plan', labelKey: 'pieces.plan.garage' },
] satisfies (Photo & { labelKey: string })[];

const cad = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

interface LbState {
  list: Photo[];
  index: number;
}

export function Pieces() {
  const { t } = useI18n();
  const [level, setLevel] = useState<RoomLevel>('rdc');
  const [lb, setLb] = useState<LbState | null>(null);

  const rooms = property.rooms.filter((r) => r.level === level);
  const f = property.finances;

  return (
    <section id="pieces" className="bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-8 py-24 md:px-16">
        <span className="font-display text-sm text-cognac">06</span>
        <h2 className="mt-2 font-display text-4xl text-ink md:text-6xl">{t('act.pieces.title')}</h2>
        <p className="mt-4 max-w-xl font-sans text-lg text-ink/60">{t('act.pieces.tagline')}</p>

        {/* Room index */}
        <div className="mt-14">
          <div className="flex flex-wrap gap-2 border-b border-ink/15 pb-4">
            {LEVELS.map((l) => (
              <button
                key={l.key}
                type="button"
                onClick={() => setLevel(l.key)}
                className={`rounded-full px-4 py-2 font-sans text-sm transition-colors ${
                  level === l.key
                    ? 'bg-walnut text-bone'
                    : 'bg-ink/5 text-ink/70 hover:bg-ink/10'
                }`}
              >
                {t(l.labelKey)}
              </button>
            ))}
          </div>

          <ul className="mt-2 divide-y divide-ink/10">
            {rooms.map((r) => (
              <li
                key={`${r.name}-${r.dims}`}
                className="grid grid-cols-2 gap-4 py-4 md:grid-cols-4 md:items-baseline"
              >
                <span className="font-display text-lg text-ink md:col-span-2">{r.name}</span>
                <span className="font-sans text-sm text-ink/70">{r.dims}</span>
                <span className="font-sans text-sm text-ink/50">
                  {r.floor}
                  {r.detail ? ` · ${r.detail}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Floor plans */}
        <h3 className="mt-20 font-sans text-xs uppercase tracking-[0.3em] text-cognac">
          {t('pieces.plans')}
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <figure key={p.file}>
              <button
                type="button"
                onClick={() => setLb({ list: PLANS, index: i })}
                className="block w-full overflow-hidden rounded-sm border border-ink/10 bg-white"
              >
                <img
                  src={p.file}
                  alt={t(p.labelKey)}
                  className="h-56 w-full object-contain p-2"
                  loading="lazy"
                />
              </button>
              <figcaption className="mt-2 font-sans text-xs uppercase tracking-widest text-ink/50">
                {t(p.labelKey)}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Financial dossier */}
        <h3 className="mt-20 font-sans text-xs uppercase tracking-[0.3em] text-cognac">
          {t('pieces.finances')}
        </h3>
        <div className="mt-5 grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-sans text-sm font-medium text-ink">{t('pieces.eval')}</p>
            <dl className="mt-3 space-y-2 font-sans text-sm">
              <Row label={t('pieces.land')} value={cad.format(f.evaluation.land)} />
              <Row label={t('pieces.building')} value={cad.format(f.evaluation.building)} />
              <Row label={t('pieces.total')} value={cad.format(f.evaluation.total)} strong />
            </dl>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-ink">{t('pieces.taxes')}</p>
            <dl className="mt-3 space-y-2 font-sans text-sm">
              <Row label={t('pieces.municipal')} value={cad.format(f.taxes.municipal)} />
              <Row label={t('pieces.school')} value={cad.format(f.taxes.school)} />
              <Row label={t('pieces.total')} value={cad.format(f.taxes.total)} strong />
            </dl>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-ink">{t('pieces.energy')}</p>
            <dl className="mt-3 space-y-2 font-sans text-sm">
              <Row label={t('pieces.total')} value={cad.format(f.energy.total)} strong />
            </dl>
          </div>
        </div>

        {/* Inclusions / exclusions */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-cognac">
              {t('pieces.inclusions')}
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-ink/75">
              {property.inclusions.map((x) => (
                <li key={x} className="border-b border-ink/10 pb-2">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-cognac">
              {t('pieces.exclusions')}
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-ink/75">
              {property.exclusions.map((x) => (
                <li key={x} className="border-b border-ink/10 pb-2">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical specs */}
        <h3 className="mt-16 font-sans text-xs uppercase tracking-[0.3em] text-cognac">
          {t('pieces.specs')}
        </h3>
        <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {property.technical.map((s) => (
            <div key={s.label} className="flex justify-between gap-4 border-b border-ink/10 pb-2">
              <dt className="font-sans text-sm text-ink/50">{s.label}</dt>
              <dd className="text-right font-sans text-sm text-ink/80">{s.value}</dd>
            </div>
          ))}
        </dl>

        {/* Gallery */}
        <h3 className="mt-20 font-sans text-xs uppercase tracking-[0.3em] text-cognac">
          {t('pieces.gallery')}
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <button
              key={p.file}
              type="button"
              onClick={() => setLb({ list: photos, index: i })}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-ink/5"
            >
              <img
                src={p.file}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {lb && (
        <Lightbox
          photos={lb.list}
          index={lb.index}
          onClose={() => setLb(null)}
          onIndex={(i) => setLb((s) => (s ? { ...s, index: i } : null))}
        />
      )}
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? 'border-t border-ink/15 pt-2 font-medium text-ink' : 'text-ink/70'}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
