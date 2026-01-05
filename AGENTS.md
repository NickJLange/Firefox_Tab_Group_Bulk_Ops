# AGENTS.md

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
- **Base Domain Grouping**: Special handling to group subdomains and complex TLDs together (e.g., `images.google.com` and `google.co.uk` -> `google`).
- **Collapsing**: Groups are created collapsed by default, unless the "uncollapsed" variant is used.
- **Ungrouping**: Can ungroup all tabs at once.

## Development & Testing
- This is a standard WebExtension.
- To test: Load the directory as a temporary add-on in Firefox (`about:debugging` -> This Firefox -> Load Temporary Add-on...).
- **Note**: The `tabGroups` API is specific to Firefox and might require recent versions or specific flags if testing in other environments (though this is targeted for Firefox).
