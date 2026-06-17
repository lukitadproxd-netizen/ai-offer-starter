# Publishing Checklist

Use this checklist to publish `ai-offer-starter` as a serious open source project on GitHub.

## Before Publishing

- [ ] Confirm repository URLs point to `lukitadproxd-netizen/ai-offer-starter`.
- [ ] Confirm `MAINTAINERS.md` names the current maintainer.
- [ ] Confirm the project name is `ai-offer-starter`.
- [ ] Confirm license is MIT.
- [ ] Confirm no private data is included.
- [ ] Confirm no examples promise income or guaranteed outcomes.
- [ ] Confirm no examples add spam automation or scraping workflows.
- [ ] Run validation commands:

  ```bash
  npm install
  npm test
  npm run build
  npm audit
  ```

## Initialize Git Locally

If the folder is not already a git repository:

```bash
git init
git branch -M main
git add README.md LICENSE package.json package-lock.json tsconfig.json CONTRIBUTING.md CODE_OF_CONDUCT.md SECURITY.md CHANGELOG.md MAINTAINERS.md PUBLISHING_CHECKLIST.md IMPLEMENTATION_REPORT.md docs templates examples schemas packages tests .github .gitignore
git commit -m "Initial open source ai-offer-starter toolkit"
```

If the folder is already inside a repository, stage only the `ai-offer-starter/` files you want to publish.

## Create the GitHub Repository

1. Create a new GitHub repository named `ai-offer-starter`.
2. Keep it public if the goal is open source distribution.
3. Do not initialize with another README if this local README will be pushed.

## Push to GitHub

```bash
git remote add origin https://github.com/lukitadproxd-netizen/ai-offer-starter.git
git push -u origin main
```

If `origin` already exists:

```bash
git remote set-url origin https://github.com/lukitadproxd-netizen/ai-offer-starter.git
git push -u origin main
```

## After Publishing

- [ ] Confirm README badges resolve correctly.
- [ ] Confirm GitHub Actions runs CI.
- [ ] Confirm issue templates appear in the GitHub UI.
- [ ] Add repository topics: `ai`, `offer-design`, `ethical-sales`, `templates`, `typescript`.
- [ ] Create labels for `bug`, `docs`, `idea`, `ethics-review`, and `good first issue`.
- [ ] Create the first release from `CHANGELOG.md`.
- [ ] Review `SECURITY.md` and add a private reporting path if available.

## Recommended Next Steps

- Add a `CONTRIBUTING.md` example for safe offer submissions.
- Add more reviewed examples from different markets.
- Add schema validation examples.
- Add release notes for `0.1.0`.
- Add a simple docs index if documentation grows.

## Safety Gate

Before every release, ask:

- Does this still avoid income promises?
- Does this still avoid spam automation?
- Does this still avoid private data misuse?
- Does this still help people design and deliver useful offers?

If any answer is unclear, mark the release as needs review.
