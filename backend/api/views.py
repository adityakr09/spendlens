from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle

from .models import Audit, Lead
from .serializers import AuditCreateSerializer, AuditPublicSerializer, LeadSerializer


class AuditCreateView(APIView):
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        serializer = AuditCreateSerializer(data=request.data)
        if serializer.is_valid():
            audit = serializer.save()
            return Response(
                {"share_id": audit.share_id, "message": "Audit saved."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuditPublicView(APIView):
    """Returns audit result without PII. Used for shared links."""

    def get(self, request, share_id):
        try:
            audit = Audit.objects.get(share_id=share_id)
        except Audit.DoesNotExist:
            return Response({"detail": "Audit not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AuditPublicSerializer(audit)
        return Response(serializer.data)


class LeadCreateView(APIView):
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        # Honeypot check — bots fill hidden "website" field
        if request.data.get("website"):
            return Response({"message": "OK"}, status=status.HTTP_200_OK)

        # Deduplicate by email + share_id
        email = request.data.get("email", "").strip().lower()
        share_id = request.data.get("share_id", "")
        if email and Lead.objects.filter(email=email, audit__share_id=share_id).exists():
            return Response({"message": "Already captured."}, status=status.HTTP_200_OK)

        serializer = LeadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Lead captured."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
