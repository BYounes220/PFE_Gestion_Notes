from rest_framework import serializers
from Grades.models import Professeur

class ProfesseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professeur
        fields = [
            'id',
            'user',
            'cin',
            'nom_professeur',
            'prenom_professeur',
            'email_professeur',
            'num_telephone',
            'fonction'
        ]

    def create(self, validated_data):
        professeur = Professeur.objects.create(**validated_data)
        return professeur
