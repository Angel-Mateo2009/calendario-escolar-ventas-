(() => {
  const button = document.querySelector("#push-notification-control");
  if (!button) return;

  const supportsPush = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  let config = null;
  let registration = null;
  const setButton = (label, disabled = false) => {
    button.textContent = label;
    button.disabled = disabled;
    button.classList.toggle("opacity-60", disabled);
  };
  const toUint8 = (value) => {
    const padding = "=".repeat((4 - value.length % 4) % 4);
    const raw = atob((value + padding).replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(raw, (character) => character.charCodeAt(0));
  };

  if (!supportsPush) {
    setButton("🔕 Este navegador no admite avisos push", true);
    return;
  }

  fetch("/push/config", { credentials: "same-origin" })
    .then((response) => response.json())
    .then(async (data) => {
      config = data;
      if (!config.enabled) {
        setButton("🔔 Avisos pendientes de configurar", true);
        return;
      }
      registration = await navigator.serviceWorker.getRegistration("/");
      if (registration) registration.update().catch(() => {});
      const subscription = registration && await registration.pushManager.getSubscription();
      setButton(subscription ? "✅ Recordatorios activados · Desactivar" : "🔔 Activar recordatorios");
    })
    .catch(() => setButton("🔔 No se pudo comprobar el estado", true));

  button.addEventListener("click", async () => {
    if (!config?.enabled) return;
    setButton("⏳ Configurando avisos…", true);
    try {
      // Keep the permission request tied to the user's click/tap gesture.
      const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
      if (permission !== "granted") throw new Error("El permiso de notificaciones no fue concedido.");
      registration = registration || await navigator.serviceWorker.getRegistration("/");
      const existing = registration && await registration.pushManager.getSubscription();
      if (existing) {
        const response = await fetch("/push/unsubscribe", {
          method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "X-CSRF-Token": config.csrfToken },
          body: JSON.stringify({ endpoint: existing.endpoint })
        });
        if (!response.ok) throw new Error("No se pudo desactivar el aviso en la cuenta.");
        await existing.unsubscribe();
        setButton("🔔 Activar recordatorios");
        return;
      }

      registration = await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
      await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: toUint8(config.publicKey)
      });
      const response = await fetch("/push/subscribe", {
        method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "X-CSRF-Token": config.csrfToken },
        body: JSON.stringify(subscription.toJSON())
      });
      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        throw new Error(detail.error || "No se pudo guardar tu suscripción.");
      }
      setButton("✅ Recordatorios activados · Desactivar");
    } catch (error) {
      setButton("🔔 Activar recordatorios");
      window.alert(error.message || "No se pudieron activar las notificaciones.");
    }
  });
})();
