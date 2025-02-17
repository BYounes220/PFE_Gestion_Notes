from rest_framework import serializers
from Grades.entities.evaluation import Evaluation

class EvaluationCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = [
            'id',
            'note_ordinaire',
            'note_rattrapage',
            'annee_academique',
            'etudiant',
            'element',
        ]
        id = serializers.IntegerField(read_only=True)