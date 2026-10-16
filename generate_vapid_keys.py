"""Generate one VAPID key pair for browser push notifications.

Run locally once, then copy the two printed values to Render's environment
settings. Keep the private key secret and do not commit it to GitHub.
"""
import base64

from cryptography.hazmat.primitives import serialization
from py_vapid import Vapid


def urlsafe(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).decode("ascii").rstrip("=")


vapid = Vapid()
vapid.generate_keys()
private_der = vapid.private_key.private_bytes(
    encoding=serialization.Encoding.DER,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption(),
)
public_point = vapid.public_key.public_bytes(
    encoding=serialization.Encoding.X962,
    format=serialization.PublicFormat.UncompressedPoint,
)

print("VAPID_PUBLIC_KEY=" + urlsafe(public_point))
print("VAPID_PRIVATE_KEY=" + urlsafe(private_der))
