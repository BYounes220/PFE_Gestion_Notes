from rest_framework.views import APIView
from rest_framework.response import Response
from Grades.entities.evaluation import Evaluation

class AcademicYearsAPIView(APIView):
    def get(self, request):
        years = Evaluation.objects.values_list('annee_academique', flat=True).distinct()
        return Response(list(years))
