# charles.ciampa.me

Personal website of Charles Ciampa, built with [al-folio](https://github.com/alshedivat/al-folio) v1.2 (Jekyll) and hosted on GitHub Pages.

## Run locally

Requires Docker (the macOS system Ruby is too old).

```bash
docker compose up
```

Then open http://localhost:8080. Saving a file rebuilds the site and refreshes the page. Stop with `Ctrl+C`, then `docker compose down`.

al-folio's demo blog posts are kept in `_drafts/` as examples of what posts can do (math, code, charts, galleries, and more). Jekyll doesn't publish drafts; to preview them locally:

```bash
docker compose run --rm --service-ports jekyll bundle exec jekyll serve --drafts --host 0.0.0.0 --port 8080
```

To publish a post, put it in `_posts/` named `YYYY-MM-DD-title.md`.

Before committing, format everything (CI fails otherwise):

```bash
npx prettier --write .
```

## Where things live

| What                   | File                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| Site settings          | `_config.yml`                                                        |
| About page             | `_pages/about.md`                                                    |
| Projects               | `_projects/*.md` (images in `assets/img/`, PDFs in `assets/pdf/`)    |
| Resume page            | `_data/cv.yml` (RenderCV format); page settings in `_pages/cv.md`    |
| Resume PDF (download)  | `assets/pdf/CharlesCiampaResume.pdf`, exported from the LaTeX resume |
| Social links           | `_data/socials.yml`                                                  |
| GitHub repo cards      | `_data/repositories.yml`                                             |
| Education entry layout | `_includes/cv/education.liquid` (local override, see below)          |

## Deploying

Merging or pushing to `main` runs the **Deploy site** workflow, which builds the site and publishes it to the `gh-pages` branch. Pull requests build the site without deploying.

## Updating al-folio

In v1 the theme lives in versioned gems (`al_folio_core`, `al_folio_cv`, …) pinned in the `Gemfile`, so updates don't require merging template files.

1. Compare the pins with upstream's `Gemfile` (the `upstream` git remote points at al-folio: `git fetch upstream && git diff main upstream/main -- Gemfile`), and read `docs/releases/`.
2. Bump the versions in `Gemfile`, then open a shell in the container and update the lockfile:

   ```bash
   docker compose run --rm jekyll bash
   bundle update
   ```

3. In that shell, check for breaking changes and stale overrides:

   ```bash
   bundle exec al-folio upgrade audit
   bundle exec al-folio upgrade overrides audit
   ```

4. If `_includes/cv/education.liquid` is flagged, compare it with the new gem version (`bundle exec al-folio upgrade overrides diff _includes/cv/education.liquid`), carry over any upstream fixes, then run `bundle exec al-folio upgrade overrides accept _includes/cv/education.liquid`.
5. Build, check the pages, and open a PR.

The local override adds the GPA badge and "Relevant coursework" line to education entries. Its acknowledged checksum is stored in `.al-folio-overrides.yml`. After editing the override, re-run `overrides accept` so the file stays in sync. The **Upgrade contract checks** workflow runs `al-folio upgrade audit` on every push and PR.

The al-folio docs are in `docs/` (start with `docs/CUSTOMIZE.md`).
