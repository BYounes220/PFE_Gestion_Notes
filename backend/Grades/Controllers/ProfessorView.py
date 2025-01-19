
from rest_framework import generics
from Grades.Serializers.professeurSerializer import ProfesseurSerializer
from insc_reeinsc_admin.entities.Professeur import Professeur

class ProfesseurViewSet(generics.CreateAPIView):
    queryset = Professeur.objects.all()
    serializer_class = ProfesseurSerializer
