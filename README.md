# Hammad Qasim Portfolio

A lightweight personal portfolio built with plain HTML, CSS, and modular JavaScript.

## Why this version is easier to edit

- No React, Vite, npm install, or build step.
- Campaign content lives in `js/campaigns.js`.
- Page rendering and navigation live in `js/app.js`.
- All visual styling lives in `css/styles.css`.
- The website files live at the repository root, so no base or publish directory configuration is needed.

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

Each creative supports `image`, `width`, `height`, `label`, `type`, and `format`. Image paths are relative to the website folder. Set `coverImage` and `coverAlt` on a campaign for its homepage preview and hero artwork.

The galleries preserve the full artwork and open a dialog on click (Escape closes it). Images are lazy-loaded. The four requested campaigns have their titles, short descriptions, and YouTube links, and appear first on the homepage. Existing projects are retained under Archive.

### Upload your images

1. Open the repository in GitHub.
2. Upload files under `assets/campaigns/<project-slug>/`.
3. In `js/campaigns.js`, set the campaign’s `coverImage` and `coverAlt`, then add image objects to `creatives`:

```js
coverImage: "assets/campaigns/7-crore-ki-calling-family/hero.jpg",
coverAlt: "Fawad Khan and Ali Zafar — Call More Than Ever Before",
creatives: [
  {
    image: "assets/campaigns/7-crore-ki-calling-family/hero.jpg",
    width: 1080,
    height: 1350,
    label: "Call More Than Ever Before — campaign visual",
    type: "Key Visual",
    format: "Digital"
  }
]
```

Replace the example dimensions with the image’s actual size. JPG, PNG, and WebP are supported. The other video campaign folders are `pakistan-ki-pehchaan`, `super-5-legends-selection`, and `garam-masala-data-bohhaat-hai`. Uploading an image alone does not add it to a gallery; add its path to the campaign data as shown above.


## Run locally

Because the website uses JavaScript modules, serve the repository root through a local web server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy on Netlify

Use these settings:

- Build command: leave blank
- Base directory: (leave blank)
- Publish directory: `.`

Every push to the connected GitHub repository will publish automatically.
