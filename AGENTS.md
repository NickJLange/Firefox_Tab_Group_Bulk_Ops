# AGENTS.md

## Engineering Preferences

These preferences shape all work on this project. Apply them before any other consideration.

- **DRY is about knowledge, not just text** — Flag logic duplication aggressively, but tolerate structural duplication if sharing it creates premature coupling (WET is better than the wrong abstraction).
- **Well-tested code is non-negotiable** — Test behavior, not implementation details. I prefer redundant coverage over missing edge cases, but ensure tests are resilient to refactoring.
- **Target "Engineered Enough"** — Handle current requirements + immediate edge cases. **Apply YAGNI**: do not build for hypothetical future use cases. Abstract only when you see the pattern for the third time (Rule of Three).
- **Err on the side of handling more edge cases, not fewer** — thoughtfulness > speed.
- **Bias toward explicit over clever.**

---

## Review Process (Plan Mode)

Before starting a review, you **MUST** ask:

> **BIG CHANGE or SMALL CHANGE?**
> 1. **BIG CHANGE**: Work through this interactively, one section at a time (Architecture → Code Quality → Tests → Performance) with at most 4 top issues in each section.
> 2. **SMALL CHANGE**: Work through interactively ONE question per review section.

### Review Sections

Walk through these four sections **in order**, presenting one section at a time. Wait for user feedback before proceeding to the next.

1. **Architecture review** — overall system design, component boundaries, dependency graph, coupling, data flow, scaling, security.
2. **Code quality review** — organization, module structure, DRY violations, error handling patterns, missing edge cases, tech debt hotspots, and over/under-engineering relative to preferences.
3. **Test review** — coverage gaps (unit, integration, e2e), test quality, assertion strength, missing edge cases, untested failure modes, and error paths.
4. **Performance review** — N+1 queries, database access patterns, memory-usage concerns, caching opportunities, slow or high-complexity code paths.

### Issue Format

For every specific issue (bug, smell, design concern, or risk):

- Describe the problem concretely, with file and line references.
- Present 2-3 options, including "do nothing" where reasonable.
- For each option, specify: implementation effort, risk, impact on other code, and **maintenance burden**.
- Give an opinionated recommendation and why, mapped to the engineering preferences.
- Explicitly ask whether the user agrees or wants a different direction before proceeding.

**Formatting Rules**:
- **NUMBER issues** (1, 2, 3...) and then give **LETTERS for options** (A, B, C...).
- The recommended option must always be the 1st option (Option A).
- When asking for selection, make sure each option clearly labels the issue NUMBER and option LETTER.

---

## Project Overview
This project is a Firefox extension named **Group Same Site Tabs**. It provides functionality to automatically group tabs based on their domain or base domain.

## Key Files
- **`manifest.json`**: Defines the extension functionality, permissions, and commands. 
    - **Permissions**: Requires `tabs`, `menus`, and `tabGroups` (Firefox specific).
    - **Commands**: Lists all available keyboard shortcuts/commands (e.g., `group-all`, `ungroup-all`).
- **`background.js`**: Contains the core logic.
    - **`grpTabsBySite(all_tabs, sites, useBaseDomain)`**: The main function that groups tabs.
    - **`getBaseDomain(hostname)`**: Logic to extract the base domain (handling TLDs like `.co.uk`).
    - **`ungroupAll()`**: Function to ungroup all tabs.
    - **Context Menus**: Sets up the right-click menu items.

## Functionality
- **Grouping**: Tabs are grouped by their hostname.
- **Base Domain Grouping**: Special handling to group subdomains and complex TLDs together (e.g., `images.google.com` and `www.google.com` -> `google.com`).
- **Collapsing**: Groups are created collapsed by default, unless the "uncollapsed" variant is used.
- **Ungrouping**: Can ungroup all tabs at once.

## Development & Testing
- This is a standard WebExtension.
- To test: Load the directory as a temporary add-on in Firefox (`about:debugging` -> This Firefox -> Load Temporary Add-on...).
- **Note**: The `tabGroups` API is specific to Firefox and might require recent versions or specific flags if testing in other environments (though this is targeted for Firefox).
