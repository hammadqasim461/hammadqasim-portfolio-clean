# Hammad Qasim Portfolio

A lightweight personal portfolio built with plain HTML, CSS, and modular JavaScript.

## Why this version is easier to edit

- No React, Vite, npm install, or build step.
- Campaign content lives in `js/campaigns.js`.
- Page rendering and navigation live in `js/app.js`.
- All visual styling lives in `css/styles.css`.
- Netlify can publish the repository root directly.

## Edit portfolio text

Open `js/campaigns.js`.

The profile information is at the top:

```js
export const portfolio = {
  name: "Hammad Qasim",
  email: "hammadqasim461@gmail.com",
  statement: "Every Idea needs an insight, I'll help you find it.",
};
```

Each project has its own object with:

- `context`
- `insight`
- `idea`
- `expression`
- `creatives`
- `tvcUrl`

To activate a TVC button, paste a YouTube or Vimeo link into the project's `tvcUrl` field:

```js
tvcUrl: "https://www.youtube.com/watch?v=example",
```

## Add campaign images

Create folders inside:

```text
assets/campaigns/project-slug/
```

The current cards are visual placeholders. Image support can be added by giving each creative an `image` path and updating the card markup in `js/app.js`.

## Run locally

Because the website uses JavaScript modules, serve the folder through a local web server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy on Netlify

Use these settings:

- Build command: leave blank
- Publish directory: `.`

Every push to the connected GitHub repository will publish automatically.
