from django.urls import path
from .views import AuditCreateView, AuditPublicView, LeadCreateView

urlpatterns = [
    path("audits/", AuditCreateView.as_view(), name="audit-create"),
    path("audits/<str:share_id>/public/", AuditPublicView.as_view(), name="audit-public"),
    path("leads/", LeadCreateView.as_view(), name="lead-create"),
]
