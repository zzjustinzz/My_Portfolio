// No-op service worker — satisfies browser/extension probes for /service-worker.js
// This portfolio does not use a service worker. This file just prevents 404 log noise.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
