self.addEventListener("push", (event) => {
  let message = {};
  try { message = event.data ? event.data.json() : {}; } catch (_) { message = { body: event.data?.text() || "Tienes un recordatorio escolar." }; }
  const title = message.title || "Academia La Dolorosa";
  const options = {
    body: message.body || "Tienes una tarea próxima a vencer.",
    image: message.image || "/static/notification-tasks.svg",
    tag: message.tag || "academia-recordatorio",
    renotify: false,
    data: { url: message.url || "/" }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "/", self.location.origin).href;
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clients) {
      if (client.url.startsWith(self.location.origin) && "focus" in client) {
        await client.focus();
        if ("navigate" in client) await client.navigate(target);
        return;
      }
    }
    await self.clients.openWindow(target);
  })());
});
