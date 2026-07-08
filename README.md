# thomasrquintero-site

Personal portfolio site for Thomas Quintero — GIS Analyst, Houston TX.
Static HTML/CSS/JS, no build step, no dependencies.

## Editing content

**All words, projects, jobs, and contact info live in one file: `js/data.js`.**
Layout and behavior never need to change for a content edit.

- **Add/edit a project** — copy a block in `SITE_DATA.projects`. Media is
  either `{ type: "image", src, alt }` or
  `{ type: "video", src, srcWebm, poster, alt }`. Set `link: null` for
  internal work (the card shows "Ask me about this" pointing at the contact
  section) or `link: { url, label }` for public apps (opens in a new tab).
- **Add a job** — copy a block in `SITE_DATA.timeline` (keep oldest → newest
  order); `bullets` is an array of strings.
- **Skills, about text, contact channels** — same file, self-explanatory.

## Adding video

Videos autoplay muted, loop, and lazy-load (nothing downloads until the card
nears the viewport). Keep them short and small:

```bash
ffmpeg -i input.mp4 -vf scale=960:-2 -c:v libx264 -crf 30 -preset slow \
  -an -pix_fmt yuv420p -movflags +faststart assets/videos/name.mp4
ffmpeg -i assets/videos/name.mp4 -c:v libvpx-vp9 -crf 38 -b:v 0 -an \
  assets/videos/name.webm
ffmpeg -ss 2 -i assets/videos/name.mp4 -frames:v 1 -q:v 3 \
  assets/img/name-poster.jpg
```

## Structure

```
index.html        page skeleton (sections + anchors)
css/styles.css    all styling; design tokens at the top
js/data.js        ALL site content — edit this one
js/main.js        rendering + interaction (nav, cards, timeline, contours)
assets/fonts/     self-hosted Fraunces + Karla (variable woff2)
assets/img/       thumbnails, posters, portrait, favicon
assets/videos/    mp4 + webm pairs for the project cards
```

## Deploying

GitHub Pages: Settings → Pages → deploy from `main`, folder `/ (root)`.
Everything is relative-pathed, so it works at a subpath or a custom domain.
