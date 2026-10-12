JILCWPhx Devotional App — Tapered Home Screen Logo Package

CONTENTS
- index.html: updated devotional app prototype
- manifest.webmanifest: PWA install metadata and icon references
- sw.js: service worker cache updated for the new icon filenames and cache version
- icons/home-icon-192.png: 192px app icon
- icons/home-icon-512.png: 512px app icon

GITHUB INSTALLATION
1. Open your JILCWPhx repository.
2. Replace the root index.html, manifest.webmanifest, and sw.js with the files in this package.
3. In the root, open the icons folder. Add or replace home-icon-192.png and home-icon-512.png there.
4. Keep the folder name exactly "icons" and filenames exactly as shown.
5. Commit the changes and wait for GitHub Pages to deploy.
6. On iPhone, remove the old Home Screen shortcut, open the updated website in Safari, then use Share > Add to Home Screen.
7. On Android, refresh the site and reinstall the app if the old icon remains.

IMPORTANT
The phone's operating system applies its own rounded icon mask. This package uses the current uploaded JILC logo image in the required icon sizes; the actual artwork is not redrawn here. The prototype does not update the live GitHub repository automatically.
