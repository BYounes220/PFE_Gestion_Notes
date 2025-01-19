from rest_framework import serializers
<<<<<<< HEAD:backend/Grades/serializers/professeurSerializer.py
from Grades.models import Professeur
=======
from insc_reeinsc_admin.entities.Professeur import Professeur
>>>>>>> cfc9beb8985a2d892d55d8f4b5f7f2bad765d4c6:backend/Grades/Serializers/professeurSerializer.py

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
