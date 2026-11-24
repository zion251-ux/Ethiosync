# EthioSync Git and GitHub Commands

Use these commands from the local project folder. The website deploys from the `main` branch on GitHub Pages. The `CNAME` file is required for the custom domain and must remain tracked.

## 1. Connect an existing local copy to GitHub

```bash
git status
git remote -v
```

If no remote is listed:

```bash
git remote add origin https://github.com/zion251-ux/Ethiosync.git
```

If the remote already exists but its URL is wrong:

```bash
git remote set-url origin https://github.com/zion251-ux/Ethiosync.git
```

## 2. Safely save and publish website updates

```bash
git pull origin main
git status
git diff
git diff -- CNAME
```

The last command should produce no output unless you intentionally changed the domain. Confirm the required domain file before staging:

```bash
test -f CNAME && test "$(cat CNAME)" = "ethiosync.cyou"
git ls-files --error-unmatch CNAME
```

Then review, stage, and save:

```bash
git add .
git status
git diff --cached --stat
git diff --cached --name-status
```

Do not continue if `CNAME` is shown as deleted. Review the staged changes, then commit and push:

```bash
git commit -m "Update EthioSync website"
git push origin main
```

For a new local branch whose upstream is not set yet:

```bash
git push -u origin main
```

## 3. Inspect recent saves

```bash
git log --oneline -5
git status
```

After pushing, confirm on GitHub that `CNAME` still exists and contains `ethiosync.cyou`, then check **Settings → Pages** for the custom domain.

## 4. Undo an unsaved local edit

Inspect first:

```bash
git diff
```

Discard unsaved working-tree edits only when you are certain they are not needed:

```bash
git restore .
```

## 5. Safely undo a pushed commit

Find the commit ID, then create a new commit that reverses it:

```bash
git log --oneline -5
git revert --no-edit <commit-id>
git push origin main
```

Do not use `git reset --hard`, force-push, or delete `CNAME` as a routine deployment step.

## Security notes

- Never commit `.env`, access tokens, private keys, passwords, or credential files.
- Do not paste a personal access token into website files, commits, issues, or chat.
- Prefer GitHub's connected authorization or a credential manager for Git pushes.
- Keep `CNAME`, `robots.txt`, and `sitemap.xml` tracked; `.gitignore` intentionally does not exclude them.
