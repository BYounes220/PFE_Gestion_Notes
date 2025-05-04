from rest_framework import generics
from Grades.serializers.semesterSerializer import SemesterSerialiazer
from insc_reeinsc_admin.entities.Semestre import Semestre

class SemesterViewSet(generics.CreateAPIView):
    queryset = Semestre.objects.all()
    serializer_class = SemesterSerialiazer
