import uuid
from django.db import models


class Audit(models.Model):
    share_id = models.CharField(max_length=12, unique=True, db_index=True)
    form_data = models.JSONField()          # full form input (may contain email after lead capture)
    result = models.JSONField()             # audit output from engine
    total_monthly_saving = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    ip_hash = models.CharField(max_length=64, blank=True)  # hashed for abuse tracking

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Audit {self.share_id} — ${self.total_monthly_saving}/mo"

    @staticmethod
    def generate_share_id():
        return uuid.uuid4().hex[:10]


class Lead(models.Model):
    audit = models.ForeignKey(Audit, on_delete=models.SET_NULL, null=True, blank=True)
    email = models.EmailField(db_index=True)
    company = models.CharField(max_length=200, blank=True)
    role = models.CharField(max_length=200, blank=True)
    monthly_saving = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    high_value = models.BooleanField(default=False)   # saving > $500/mo
    created_at = models.DateTimeField(auto_now_add=True)
    notified = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.email} — ${self.monthly_saving}/mo"
