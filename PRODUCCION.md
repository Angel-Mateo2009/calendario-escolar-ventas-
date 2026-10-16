# Preparación para producción

## Despliegue aislado por institución

Esta versión está pensada para **un colegio por servicio web y base PostgreSQL de Render**. No reutilices la misma base de datos para colegios distintos: las cuentas, cursos y tareas pertenecen a una sola institución. Para una nueva institución, crea su propio servicio y su propia base, configura las variables de entorno y despliega el mismo código.

## Variables de entorno de Render

Antes del siguiente despliegue, en **Render → servicio web → Environment**, configura:

- `DATABASE_URL`: URL de la base PostgreSQL vinculada al servicio.
- `FLASK_SECRET_KEY`: secreto aleatorio largo (al menos 32 caracteres). Consérvalo; si cambia, las sesiones abiertas caducan.
- `ADMIN_EMAILS`: correos administradores separados por comas.
- `ADMIN_PASSWORD`: contraseña inicial compartida por esos administradores (al menos 16 caracteres). Guárdala en un gestor de contraseñas y no la pongas en GitHub.
- `SCHOOL_NAME`: nombre del colegio que aparecerá en la app.
- `PRIVACY_CONTACT_EMAIL`: canal que el colegio atenderá para solicitudes de datos.
- `VAPID_PUBLIC_KEY` y `VAPID_PRIVATE_KEY`: necesarias para las notificaciones push, si se van a usar.

Crea el secreto en tu equipo con un generador criptográfico; no reutilices la contraseña de GitHub ni publiques ninguna de estas variables.

## Configuración inicial dentro de la app

1. El administrador inicia sesión con su correo y `ADMIN_PASSWORD`.
2. En **Cursos y docentes**, crea cada paralelo, registra cada docente con una contraseña individual de 10 caracteres o más y asígnale solamente sus cursos.
3. Comparte el código de inscripción de cada paralelo por un canal privado con sus alumnos. No publiques esos códigos en redes, páginas abiertas ni repositorios.
4. En el primer ingreso, cada alumno crea contraseña y registra los datos de autorización del representante. En ingresos siguientes usa correo y contraseña.
5. Atiende las solicitudes de acceso, corrección, retiro de consentimiento o eliminación desde **Solicitudes de privacidad**.

## Antes de abrir inscripciones públicas

El aviso de privacidad que muestra la app es una base funcional, no un dictamen jurídico. El colegio debe completar y revisar sus finalidades, plazos de conservación, responsables, proveedores y procedimiento de atención. Como se procesan datos de estudiantes menores, la institución debe confirmar sus obligaciones y obtener la autorización adecuada con asesoría especializada en protección de datos de Ecuador. No uses datos reales de estudiantes hasta terminar esa revisión.

Esta versión no incluye todavía cobros, facturación, recuperación automática de contraseñas, supervisión de contenido publicado por alumnos, ni panel multiinstitución en una sola base. Para cobrar a varios colegios con una sola plataforma, hay que implementar y revisar aislamiento por institución antes de migrar desde el esquema de un servicio/base por colegio.
