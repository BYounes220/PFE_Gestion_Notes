from rest_framework import serializers
from Grades.Models.element import Element


class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model= Element
        fields = ['nom_element']