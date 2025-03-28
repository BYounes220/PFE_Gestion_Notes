from rest_framework import serializers
from insc_reeinsc_admin.entities.Departement import Departement

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departement
        fields = ["nom_departement"]