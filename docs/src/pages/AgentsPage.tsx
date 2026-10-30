import { Card } from "@ds/components";
import { Markdown } from "../Markdown";
import { agentRules, agents, type Agent } from "../agents";
import { cardBody } from "../skills";

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Card className="skill-card" id={`agent-${agent.name}`} title={agent.name} headingLevel={3}>
      <div className="card-content">
        <p>{agent.description}</p>
        <p>
          Allowed tools:{" "}
          {agent.tools.length === 0
            ? "every tool"
            : agent.tools.map((tool, index) => (
                <span key={tool}>
                  {index > 0 && ", "}
                  <code>{tool}</code>
                </span>
              ))}
        </p>
        {agent.report && (
          <details>
            <summary>What it reports</summary>
            <Markdown source={cardBody(`# ${agent.name}\n${agent.report}`)} />
          </details>
        )}
        <details>
          <summary>Show the full agent</summary>
          <Markdown source={cardBody(agent.body)} />
        </details>
      </div>
    </Card>
  );
}

// Agents page (B129): every agent of .claude/agents/, read from the files, and the rules shared by all agents.
export function AgentsPage() {
  return (
    <>
      <h1>Agents</h1>
      <p className="lead">The agents Claude runs for recurring checks, and their rules</p>
      <p>
        An agent is a sub-agent that Claude launches for one recurring task, with its own instructions and a limited set of
        tools. The agents live in <code>.claude/agents/</code> (one <code>&lt;name&gt;.md</code> per agent); this page reads
        them directly, so a new agent appears here automatically.
      </p>

      <h2>Rules for every agent</h2>
      {agentRules ? <Markdown source={agentRules} /> : <p className="empty">No rules found in CLAUDE.md.</p>}

      <h2>Agents</h2>
      {agents.length === 0 ? (
        <p className="empty">No agent yet.</p>
      ) : (
        agents.map((agent) => <AgentCard key={agent.name} agent={agent} />)
      )}
    </>
  );
}
