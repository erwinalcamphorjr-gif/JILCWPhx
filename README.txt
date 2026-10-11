DEVOTIONAL APP — UPDATED PACKAGE

Files:
- index.html — corrected latest v35-based app
- manifest.webmanifest — PWA manifest
- sw.js — v36 service worker with network-first page updates
- icons/icon-192.png
- icons/icon-512.png

GitHub Pages:
1. Replace your existing index.html with this index.html.
2. Replace sw.js with this sw.js.
3. Replace manifest.webmanifest with this manifest.webmanifest.
4. Upload the icons folder if you do not already have it.
5. Commit the changes.

Working fixes in this package:
- Home now uses the same v35 Bible cache as the Bible screen.
- Fixed the Home NIV parser call so it uses the current version variable.
- Home saves fetched NIV/NKJV/NLT chapters using the v35 cache key.
- Service worker bumped to v36 and uses network-first navigation so GitHub updates are less likely to remain stale.
- The stable v35 NIV parser and 66-book mapping are preserved.
