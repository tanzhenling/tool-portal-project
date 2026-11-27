# CLAUDE.md

## Tech Stack
- Plain HTML, CSS, and JavaScript only.
- No frameworks, no libraries required, no build step. Files must work by opening them directly in a browser.

## Project Structure
The project is nearly empty for now. As it grows, keep things in these places:
- `index.html` — the main page, at the top level.
- `tools/` — one HTML page per tool.
- `css/` — stylesheets.
- `js/` — scripts.
- `assets/` — images, fonts, and other static files.

Update this section whenever the structure changes.

## Key Requirements
1. Every page must be responsive and work on desktop, tablet, and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast against its background, in both the light and the dark theme.

## Feature Plan
A portal where visitors try out small web tools, focused on Electrical Engineering.

### Portal structure
- **Homepage (`index.html`):** header with the theme toggle, a short intro, and one card per tool.
- **Opening a tool:** the visitor clicks a tool's card and lands on that tool's own page in `tools/`.
- **Getting back:** every tool page has a "Back to all tools" link to the homepage.
- **Adding a tool later:** add `tools/<tool-name>.html` and `js/<tool-name>.js`, then add one card to `index.html`. Nothing else changes.

### Phases
- **Phase 1 — portal plus first tool:** the homepage, the shared light/dark theme, and one tool: an Ohm's law calculator (enter any two of voltage, current, resistance; get the third).
- **Phase 2 — more tools:** add further Electrical Engineering tools, one at a time. To be defined after phase 1.

## Rules for Claude
- Explain technical terms in plain language.
- Ask before making big changes (new files or folders, restructuring, deleting things, adding dependencies).
- Ask rather than guess when something is unclear.
