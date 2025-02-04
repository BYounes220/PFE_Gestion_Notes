from rest_framework import serializers
from insc_reeinsc_admin.entities.Element import Element


class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = [
            'nom_element', 
            'module_elm', 
            'heure_tp', 
            'heure_td', 
            'heure_cours', 
            'penderation_element'
        ]
