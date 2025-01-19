from rest_framework import serializers
from Grades.models import Element


class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = [
            'id',
            'nom_element',
            'volums_horaire',
            'type_element',
            'coiefficient',
            'note_credit',
            'Professeur'
        ]
