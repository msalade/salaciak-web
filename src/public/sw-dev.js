self.addEventListener("install", () => {
  void self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim().then(() => self.registration.unregister()),
  );
});
