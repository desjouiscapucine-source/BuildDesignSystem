import { useEffect } from "react";
import { Markdown } from "../Markdown";
import { cardBody, childSkills, dispatchTable, parentSkill, PARENT_SKILL, type Skill } from "../skills";

const anchor = (name: string) => `skill-${name}`;

function SkillCard({ skill, open }: { skill: Skill; open?: boolean }) {
  return (
    <section className="skill-card" id={anchor(skill.name)}>
      <h3>
        <code>{skill.name}</code>
      </h3>
      <p>{skill.description}</p>
      <details open={open}>
        <summary>Show the full skill</summary>
        <Markdown source={cardBody(skill.body)} />
      </details>
    </section>
  );
}

/** `open`: a skill opened and scrolled to on load (route #/skills/<name>, e.g. from the Git workflow page). */
export function SkillsPage({ open }: { open?: string } = {}) {
  useEffect(() => {
    if (!open) return;
    // After the scroll to the top done on every route change.
    const timer = setTimeout(() => document.getElementById(anchor(open))?.scrollIntoView(), 0);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      <h1>How to use skills</h1>
      <p className="lead">The orchestrator, its child skills and how to call them</p>
      <p>
        A skill is a set of rules Claude follows for one kind of task. The skills live in <code>.claude/skills/</code>{" "}
        (one folder per skill, with a <code>SKILL.md</code>); this page reads them directly, so it is always up to date.
      </p>

      <h2>How to use</h2>
      <ul>
        <li>
          <strong>Every task starts with the <code>{PARENT_SKILL}</code>.</strong> It reads the task and loads every child
          skill that matches it — often several together (for example, a component spec that names tokens loads{" "}
          <code>component</code>, <code>component-spec</code>, <code>token-naming</code> and <code>never-invent</code>).
        </li>
        <li>
          <strong>Describe the task in the chat</strong>: Claude dispatches it on its own. To call a skill directly, type{" "}
          <code>/</code> followed by its name in Claude Code (for example <code>/{PARENT_SKILL}</code> or{" "}
          <code>/component</code>).
        </li>
        <li>
          <strong>Add a skill</strong>: propose it in the Backlog (category Skills); once approved, create{" "}
          <code>.claude/skills/&lt;name&gt;/SKILL.md</code> with a <code>name</code> and a <code>description</code>, and add
          its row to the dispatch table of the <code>{PARENT_SKILL}</code>. It appears on this page automatically.
        </li>
        <li>
          <strong>Child skills never dispatch to each other</strong>: dispatching happens only in the{" "}
          <code>{PARENT_SKILL}</code>.
        </li>
      </ul>

      <h2>Hierarchy</h2>
      <div className="skill-tree">
        <a className="skill-tree-parent" href={`#${anchor(PARENT_SKILL)}`}>
          <code>{PARENT_SKILL}</code>
        </a>
        <ul>
          {childSkills.map((skill) => (
            <li key={skill.name}>
              <a href={`#${anchor(skill.name)}`}>
                <code>{skill.name}</code>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <h3>Dispatch table</h3>
      {dispatchTable ? <Markdown source={dispatchTable} /> : <p className="empty">No dispatch table found.</p>}

      <h2>Skills</h2>
      {parentSkill && <SkillCard skill={parentSkill} open={open === parentSkill.name} />}
      {childSkills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} open={open === skill.name} />
      ))}
    </>
  );
}
