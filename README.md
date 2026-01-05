# NAME

**group-same-site-tabs** - adds toolbar button, context menu and shortcuts that allows to group selected or all sites into tabgroups (collapsed or uncollapsed)

> Forked from [igorlogius/webextensions](https://github.com/igorlogius/webextensions/tree/main/sources/group-same-site-tabs)

# SYNOPSIS

clicking the toolbar button groups all tabs by sites. right clicking on selected tabs allows to only group the sites which the currently selected tabs are part of.

You can also group by **Base Domain** (e.g., grouping `sub.example.com` and `example.com` together under `example`).
An **Ungroup All** option is available to quickly remove all groups.

The same actions can also be invoked via custom shortcuts.

# USER INPUTS

- selected tabs/sites

# OPTIONS / SHORTCUTS

- **Group Selected Sites**: Group currently selected tabs by their domain.
- **Group All Sites**: Group all tabs in the window by their domain.
- **Group Selected Sites (uncollapsed)**: Same as above but groups start uncollapsed.
- **Group All Sites (uncollapsed)**: Same as above but groups start uncollapsed.
- **Group Selected Sites (Base Domain)**: Group selected tabs by their base domain (e.g., `google.co.uk` -> `google`).
- **Group All Sites (Base Domain)**: Group all tabs by their base domain.
- **Ungroup All**: Ungroup all tabs.

# REQUIRED PERMISSIONS

- **tabs**: used to read the tab urls to determine which sites they belong to
- **menus**: used to add the context menu entries
- **tabGroups**: used to create the tabgroups for the sites

# OPTIONAL PERMISSIONS

none

# DEMO VIDEO

https://github.com/user-attachments/assets/fe09eb49-4632-424f-8cdc-2f778b50f324
