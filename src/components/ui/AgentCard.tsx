import type { Agent } from '../../data/property';
import { useI18n } from '../../i18n/useI18n';

export function AgentCard({ agent }: { agent: Agent }) {
  const { t } = useI18n();
  const tel = agent.phone.replace(/\s/g, '');

  return (
    <div className="flex gap-5 rounded-sm border border-bone/15 p-5">
      <img
        src={agent.photo}
        alt={agent.name}
        className="h-32 w-24 flex-none rounded-sm object-cover object-top"
        loading="lazy"
      />
      <div className="flex flex-col">
        <p className="font-display text-xl text-bone">{agent.name}</p>
        <p className="mt-0.5 font-sans text-sm text-bone/60">{agent.title}</p>
        <p className="font-sans text-sm text-bone/40">{agent.brokerage}</p>
        <a
          href={`tel:${tel}`}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-3 font-sans text-sm text-cognac transition-colors hover:text-bone"
        >
          {t('agents.call')} · {agent.phone}
        </a>
      </div>
    </div>
  );
}
