from rest_framework import serializers
from insc_reeinsc_admin.entities.Professeur import Professeur

class ProfesseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professeur
        fields = [
            #'user',
            'cin_prof',
            'nom_prof',
            'prenom_prof',
            'email_prof',
            'num_tele_prof',
            'fonction_prof'
        ]

    def create(self, validated_data):
        professeur = Professeur.objects.create(**validated_data)
        return professeur
