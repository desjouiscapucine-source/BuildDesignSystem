# Accessibility check — Comment — 2026-11-22 (Step B146-4, code stage)

WCAG 2.2 AA, code part of the checklist of the `accessibility-check` skill. Run twice: the first run found 2 failures, fixed the same day; the second run passes.

## Summary (second run)
| Result | Count |
| ------ | ----- |
| Pass | 11 |
| Fail | 0 |
| Not applicable | 1 |

**Blocking: no.** First run: 16 pass, 2 fail (blocking).

## Failures of the first run, fixed
1. **Reflow on a narrow screen** (WCAG 1.4.10, 2.4.11): the bubble (16px right of the marker, up to 100vw wide) could extend past the viewport when the marker was not at the left edge and the left flip did not fit. The spec had no rule for it: decided with the Design System Lead — the bubble opens **under the marker**, shifted and narrowed to stay in the visible canvas, and above the marker near the bottom edge. Spec and guidelines updated, code and an example ("Narrow canvas") added.
2. **Status messages** (WCAG 4.1.3): the same text announced twice in a row ("Reply sent") did not change the status region, so the second one was not announced. Fixed: the region is emptied, then set 50ms later; the "reply waiting" state is also reset when a reply is refused.

## Passes (second run)
Marker is a native button named "Comment by <author>[, resolved]" with `aria-expanded` and `aria-controls`; bubble is a non-modal group with the same name; thread is a list of articles; reply field named by its placeholder; Send natively disabled while empty; Escape from any element closes and focuses the marker; focus to the reply field on opening (not on first render); focus stays on Resolve / Reopen; outside click closes without moving the focus; visible focus with `border.focus`; state layers and motion with tokens only; targets of at least 24px; status messages polite; no keyboard trap; zoom and reflow as far as the code shows.

## Not applicable
Tokens part of the checklist (no token created or changed at this stage).

## Verified by Claude in the browser (Interactive example)
Open / close with the marker, Escape, Close and an outside click; focus on opening and after Send; Send disabled while empty; Enter sends and empties the field; "Reply sent" / "Comment resolved" announced; Resolve becomes Reopen with the focus kept; draft kept on close; send failure keeps the text and shows the error; narrow canvas opens the bubble under the marker.

## Still to check by hand before the release
Screen reader (VoiceOver): two "Reply sent" in a row; 320px width and 200% zoom with the marker at the left, middle and right; the placement is computed when the bubble opens or the thread length changes (not on window resize while it is open: close and reopen after a resize).

## Accepted exceptions
`100vw` / `100vh` in `Comment.css` (token audit, accepted by the Design System Lead).
