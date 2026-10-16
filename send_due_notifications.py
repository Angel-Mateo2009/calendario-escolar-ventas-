"""Send one illustrated push summary per device and scheduled run."""
import json
import logging
import os
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from pywebpush import WebPushException, webpush

from app import get_db_connection

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
LOCAL_ZONE = ZoneInfo("America/Guayaquil")
DAYS_ES = ("lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo")
MONTHS_ES = (
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
)


def next_reminder_date(today):
    # Friday, Saturday and Sunday all target the following Monday.
    days_ahead = 7 - today.weekday() if today.weekday() >= 4 else 1
    return today + timedelta(days=days_ahead)


def spanish_date(value):
    return f"{DAYS_ES[value.weekday()]} {value.day} de {MONTHS_ES[value.month - 1]}"


def main():
    private_key = os.environ.get("VAPID_PRIVATE_KEY", "").strip()
    claims_email = os.environ.get("VAPID_CLAIMS_EMAIL", "").strip()
    if not private_key or not claims_email:
        raise RuntimeError("Configura VAPID_PRIVATE_KEY y VAPID_CLAIMS_EMAIL en los secretos de GitHub Actions.")

    now = datetime.now(LOCAL_ZONE)
    due_day = next_reminder_date(now.date())
    due_date = due_day.isoformat()
    due_label = spanish_date(due_day)
    vapid_subject = claims_email if claims_email.startswith(("mailto:", "https://")) else f"mailto:{claims_email}"
    run_key = os.environ.get("REMINDER_RUN_KEY", "").strip()
    if not run_key:
        run_key = f"manual-{now.strftime('%Y-%m-%d-%H%M')}"

    conn = get_db_connection()
    cur = conn.cursor()
    ph = "%s" if os.environ.get("DATABASE_URL") else "?"
    cur.execute("""
        CREATE TABLE IF NOT EXISTS scheduled_task_push_notifications (
            email TEXT NOT NULL,
            task_id INTEGER NOT NULL,
            due_date TEXT NOT NULL,
            endpoint TEXT NOT NULL,
            run_key TEXT NOT NULL,
            sent_at TEXT NOT NULL,
            PRIMARY KEY (email, task_id, due_date, endpoint, run_key)
        )
    """)
    conn.commit()

    cur.execute(f"SELECT id, subject, title FROM tasks WHERE due_date={ph}", (due_date,))
    tasks = cur.fetchall()
    cur.execute("SELECT email, endpoint, p256dh, auth FROM push_subscriptions")
    subscriptions = cur.fetchall()
    sent = 0

    for email, endpoint, p256dh, auth in subscriptions:
        # One notification per endpoint and scheduled time, containing every pending task.
        cur.execute(
            f"SELECT 1 FROM scheduled_task_push_notifications WHERE email={ph} AND task_id=0 AND due_date={ph} AND endpoint={ph} AND run_key={ph}",
            (email, due_date, endpoint, run_key)
        )
        if cur.fetchone():
            continue

        pending_tasks = []
        for task_id, subject, title in tasks:
            cur.execute(
                f"SELECT 1 FROM progress WHERE email={ph} AND task_id={ph} AND status='COMPLETADO' LIMIT 1",
                (email, task_id)
            )
            if not cur.fetchone():
                pending_tasks.append((str(subject), str(title)))

        if pending_tasks:
            title = f"Tienes tareas para el {due_label}"
            lines = ["Revisa ahora tus tareas pendientes."]
            lines.extend(f"• {subject}: {task_title}" for subject, task_title in pending_tasks[:6])
            if len(pending_tasks) > 6:
                lines.append(f"Y {len(pending_tasks) - 6} tareas más.")
            body = "\n".join(lines)[:900]
        else:
            title = f"No tienes tareas para el {due_label}"
            body = "Revisa ahora tus tareas pendientes y organiza tu semana."

        payload = {
            "title": title,
            "body": body,
            "image": "/static/notification-tasks.svg",
            "tag": f"academia-tareas-{due_date}-{run_key}",
            "url": "/"
        }
        try:
            webpush(
                subscription_info={"endpoint": endpoint, "keys": {"p256dh": p256dh, "auth": auth}},
                data=json.dumps(payload, ensure_ascii=False),
                vapid_private_key=private_key,
                vapid_claims={"sub": vapid_subject},
                ttl=60 * 60 * 24
            )
        except WebPushException as error:
            response = getattr(error, "response", None)
            status = getattr(response, "status_code", None)
            logging.warning("Push falló para %s (HTTP %s): %s", email, status, error)
            if status in (404, 410):
                cur.execute(f"DELETE FROM push_subscriptions WHERE endpoint={ph}", (endpoint,))
                conn.commit()
            continue

        cur.execute(
            f"INSERT INTO scheduled_task_push_notifications(email,task_id,due_date,endpoint,run_key,sent_at) VALUES({ph},0,{ph},{ph},{ph},{ph}) ON CONFLICT(email,task_id,due_date,endpoint,run_key) DO NOTHING",
            (email, due_date, endpoint, run_key, now.isoformat(timespec="seconds"))
        )
        conn.commit()
        sent += 1

    conn.close()
    logging.info("Avisos únicos enviados: %s; fecha consultada: %s; ejecución: %s", sent, due_date, run_key)


if __name__ == "__main__":
    main()
