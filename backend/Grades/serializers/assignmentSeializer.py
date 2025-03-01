from rest_framework import serializers
from Grades.entities.enseignement import Enseignement
class AssignmentSerializer(serializers.ModelSerializer):
    professor_name = serializers.SerializerMethodField()
    class Meta:
        model =  Enseignement
        fields= ["id_enseignement","professeur","element","professor_name"]
    def get_professor_name(self, obj):
        return obj.professeur.nom_prof