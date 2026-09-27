# Agent guide for charles.ciampa.me

This is Charles Ciampa's personal website, built on the **al-folio v1.2** starter. It is a content repo: layouts, includes, styles and JS come from versioned gems (`al_folio_core`, `al_folio_cv`, `al_*`) pinned in the `Gemfile`. See `README.md` for where content lives and how to update al-folio.

## Rules

- **Edit content, not theme internals.** Change `_pages/`, `_projects/`, `_data/`, `_news/`, `assets/`, and `_config.yml`. Don't copy gem files into `_layouts/`, `_includes/` or `_sass/` unless the user asks for an override.
- **The one local override** is `_includes/cv/education.liquid` (GPA badge and coursework line). After editing it, run `bundle exec al-folio upgrade overrides accept _includes/cv/education.liquid` so `.al-folio-overrides.yml` stays in sync.
- **Format before committing:** `npx prettier --write .` (the Prettier CI check fails otherwise).
- **Use normal branches in this folder, not git worktrees.** The Docker entry point runs git, and a worktree's `.git` pointer isn't mounted into the container, so `docker compose up` fails there. Don't add a `docker-compose.override.yml` to work around it.

## Running and checking

- The macOS system Ruby (2.6) is too old; use Docker. `docker compose up` serves http://localhost:8080 with live reload.
- For one-off commands: `docker compose run --rm jekyll bash`, then `bundle exec jekyll build` or `bundle exec al-folio upgrade audit`.
- The live site sits behind Cloudflare, and scripted requests (`curl`) get a 403 challenge. To verify a deploy, inspect the `gh-pages` branch instead.

## Resume

- `assets/pdf/CharlesCiampaResume.pdf` is exported from the user's LaTeX resume and is the source of truth for resume content. The resume page (`_data/cv.yml`) should match it.
- `_data/cv.yml` is rendered only by `al_folio_cv` on the website, not by the RenderCV CLI. Web-only fields (`label`, `summary`, `score`, `courses`, `keywords`, `icon`) are intentional.
- The page shows years only. Entries within a single year use `date: <end month>` with the full range in a comment, so they show one year instead of "2024 - 2024".
- The capstone is in progress. When it finishes, drop "(In Progress)" and add an end date and results.

## Blog

- The blog is hidden from the nav. al-folio's demo posts live in `_drafts/` as examples and are not published; don't move them back to `_posts/`.
- The `/blog/...` pages on the live site come from the Letterboxd RSS feed in `external_sources` in `_config.yml`.

## CI and deploy

- Pushing or merging to `main` runs **Deploy site**, which publishes to `gh-pages`. The custom domain `charles.ciampa.me` is set in the repo's Pages settings. Pull requests build without deploying.
- Upstream workflows that only test the al-folio starter were removed on purpose: `unit-tests.yml`, `visual-regression.yml`, `update-citations.yml` (no Google Scholar ID) and `render-cv.yml` (the LaTeX PDF is the download). Don't restore them.
- `gh pr create` fails here with a GraphQL permissions error; open PRs with `gh api repos/CharlesC03/CharlesC03.github.io/pulls` instead.
