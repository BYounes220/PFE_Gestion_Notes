from rest_framework import serializers
from insc_reeinsc_admin.entities.Filiere import Filiere

class FiliereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filiere
        fields = ["nom_filiere"]