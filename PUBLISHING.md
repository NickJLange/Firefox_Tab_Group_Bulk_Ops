# Publishing Checklist

## Required Assets

- [ ] **Icons**:
    - [ ] 48px icon (`icons/icon-48.png`)
    - [ ] 96px icon (`icons/icon-96.png`)
    - *Note: Add `"icons": { "48": "icons/icon-48.png", "96": "icons/icon-96.png" }` to `manifest.json` once created.*

- [ ] **Screenshots**:
    - [ ] Screenshot 1 (showing main functionality)
    - [ ] Screenshot 2 (showing context menu or options)
    - *Format: 1280x800 or 1920x1080 recommended.*

## Metadata (AMO Listing)

- [ ] **Description**:
    - [ ] Short description (summary).
    - [ ] Long description (full details of features).

- [ ] **Privacy Policy**:
    - [ ] Create a privacy policy (required if handling user data, but good practice anyway).

## Release Steps

1.  **Package**: Zip the extension files (exclude `.git`, `task.md`, etc.).
    - `zip -r group-same-site-tabs.zip . -x "*.git*" "task.md" "PUBLISHING.md" "AGENTS.md" "implementation_plan.md" "walkthrough.md"`
2.  **Submit**:
    - Go to [AMO Developer Hub](https://addons.mozilla.org/developers/addon/submit/distribution).
    - Upload the zip file.
    - Submit source code (if requested/required).
3.  **Review**: Wait for Mozilla review.

## Verification

- [ ] Validate `manifest.json` with `web-ext lint` (if available) or via AMO validator.
