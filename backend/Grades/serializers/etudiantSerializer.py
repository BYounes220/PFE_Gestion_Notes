from rest_framework import serializers
from Grades.models import Etudiant

class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = ['id', 'nom_etudiant', 'prenom_etudiant','cne']  