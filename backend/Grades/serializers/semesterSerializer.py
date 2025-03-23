from rest_framework.serializers import ModelSerializer
from insc_reeinsc_admin.entities.Semestre import Semestre
class SemesterSerialiazer(ModelSerializer):
    class Meta:
        model = Semestre
        fields = ['id_semestre','nom_semestre','nombre_modules']