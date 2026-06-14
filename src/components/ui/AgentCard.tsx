import type { Agent } from '../../data/property';
import { useI18n } from '../../i18n/useI18n';

export function AgentCard({ agent }: { agent: Agent }) {
  const { t } = useI18n();
  const tel = agent.phone.replace(/\s/g, '');

  return (
    <div className="rounded-sm border border-bone/15 p-6">
      <p className="font-display text-xl text-bone">{agent.name}</p>
      <p className="mt-1 font-sans text-sm text-bone/60">{agent.title}</p>
      <p className="font-sans text-sm text-bone/40">{agent.brokerage}</p>
      <a
        href={`tel:${tel}`}
        className="mt-4 inline-flex items-center gap-2 rounded-sm border border-bone/25 px-4 py-2 font-sans text-sm text-bone transition-colors hover:border-cognac hover:text-cognac"
      >
        {t('agents.call')} · {agent.phone}
      </a>
    </div>
  );
}
