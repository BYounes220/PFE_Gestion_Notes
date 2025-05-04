from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from insc_reeinsc_admin.entities.Semestre import Semestre
from Grades.serializers.semesterSerializer import SemesterSerialiazer

class AdminListSemesters(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Check if the user has admin privileges.
        if not request.user.is_staff:
            return Response({"detail": "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        try:
            semesters = Semestre.objects.all()
            serializedSemesters = SemesterSerialiazer(semesters, many=True)
            return Response(serializedSemesters.data, status=status.HTTP_200_OK)
        except Exception as e:
            print("An error occurred in fetching all semesters:", e)
            return Response({"detail": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
