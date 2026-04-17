# Release Runbook

## Prerequisites

- [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) installed (`npm install -g web-ext`)
- `gh` CLI authenticated with repo access
- AMO Developer Hub account: https://addons.mozilla.org/developers/

## Release Steps

### 1. Validate

```bash
web-ext lint
```

Ensure 0 errors. Warnings about Android compatibility are expected and can be ignored.

### 2. Bump version

Update the `"version"` field in `manifest.json`. AMO rejects duplicate version numbers.

### 3. Build

```bash
make clean && make build
```

This produces `group-same-site-tabs.xpi`.

### 4. Create GitHub Release

```bash
git add manifest.json
git commit -m "Bump version to X.Y.Z"
git tag vX.Y.Z
git push origin master --tags
```

The GitHub Actions workflow (`.github/workflows/release.yml`) will automatically:
- Build the XPI
- Upload it to the GitHub release for the tag

### 5. Submit to AMO

1. Go to [AMO Developer Hub - Submit](https://addons.mozilla.org/developers/addon/submit/distribution)
2. Upload `group-same-site-tabs.xpi`
3. Fill in release notes describing what changed
4. Submit for review

### 6. Verify

- [ ] GitHub release has the XPI attached
- [ ] AMO submission accepted (no validation errors)
- [ ] Install from AMO and test core functionality

---

## Automating AMO Submission (Future)

To fully automate releases including AMO upload, add the `web-ext sign` step to the GitHub Actions workflow:

```yaml
- name: Sign and submit to AMO
  run: npx web-ext sign --api-key=${{ secrets.AMO_API_KEY }} --api-secret=${{ secrets.AMO_API_SECRET }}
```

This requires creating API credentials at https://addons.mozilla.org/developers/addon/api/key/ and adding them as GitHub repository secrets (`AMO_API_KEY`, `AMO_API_SECRET`).

---

## Required Assets (for AMO listing)

- [ ] **Icons**: 48px and 96px (`icons/icon-48.png`, `icons/icon-96.png`)
- [ ] **Screenshots**: 1280x800 or 1920x1080 showing main functionality
- [ ] **Privacy Policy** (optional but recommended)
