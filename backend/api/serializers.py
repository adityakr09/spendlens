from rest_framework import serializers
from .models import Audit, Lead


class AuditCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit
        fields = ["form_data", "result"]

    def create(self, validated_data):
        result = validated_data.get("result", {})
        saving = result.get("totalMonthlySaving", 0)
        share_id = Audit.generate_share_id()
        return Audit.objects.create(
            share_id=share_id,
            total_monthly_saving=saving,
            **validated_data,
        )


class AuditPublicSerializer(serializers.ModelSerializer):
    """Strips PII — safe for public share URLs."""
    class Meta:
        model = Audit
        fields = ["share_id", "result", "total_monthly_saving", "created_at"]


class LeadSerializer(serializers.ModelSerializer):
    share_id = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Lead
        fields = ["email", "company", "role", "monthly_saving", "share_id"]

    def create(self, validated_data):
        share_id = validated_data.pop("share_id", None)
        audit = None
        if share_id:
            try:
                audit = Audit.objects.get(share_id=share_id)
            except Audit.DoesNotExist:
                pass

        saving = validated_data.get("monthly_saving", 0)
        return Lead.objects.create(
            audit=audit,
            high_value=float(saving) > 500,
            **validated_data,
        )
