# Angel & Razzty Wedding Website

This repository contains the wedding invitation pages in `website/` and their shared media in `assets/`.

## Deploy with Netlify

1. In Netlify, choose **Add new site** → **Import an existing project** and connect `Kjthe3rd/angel-razzty-wedding`.
2. Select the `main` branch. Netlify reads the build command and publish directory from `netlify.toml`.
3. Authorize the repository and deploy. Future pushes to `main` will trigger a new deploy.

The build publishes only the invitation pages and required assets; local root-level files are not included. In VS Code, save your edits, commit them in **Source Control**, and the workspace setting pushes each commit automatically. Netlify then deploys the pushed commit. Saving by itself does not create a commit or publish changes.
